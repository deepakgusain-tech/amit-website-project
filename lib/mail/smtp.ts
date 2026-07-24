import net from "node:net";
import tls from "node:tls";

type MailAddress = {
  name?: string;
  address: string;
};

type SmtpAuth = {
  username: string;
  password: string;
};

type MailAttachment = {
  filename: string;
  contentType: string;
  content: Buffer;
};

type SendMailOptions = {
  host: string;
  port: number;
  secure?: boolean;
  auth: SmtpAuth;
  from: MailAddress;
  to: MailAddress[];
  bcc?: MailAddress[];
  replyTo?: MailAddress;
  subject: string;
  text: string;
  html: string;
  attachments?: MailAttachment[];
};

type SmtpResponse = {
  code: number;
  lines: string[];
};

function escapeHeaderValue(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function formatAddress(address: MailAddress) {
  const safeAddress = address.address.trim();
  const safeName = address.name?.trim();

  if (!safeName) {
    return `<${safeAddress}>`;
  }

  return `${quoteHeaderName(safeName)} <${safeAddress}>`;
}

function quoteHeaderName(value: string) {
  const needsQuotes = /[",<>]/.test(value) || value.includes(" ");
  const escaped = value.replace(/"/g, '\\"');
  return needsQuotes ? `"${escaped}"` : escaped;
}

function parseAddress(value: string, fallbackName?: string): MailAddress {
  const trimmed = value.trim();
  const match = trimmed.match(/^(.*)<([^<>]+)>$/);

  if (match) {
    const name = match[1].trim().replace(/^"|"$/g, "");
    const address = match[2].trim();
    return {
      name: name || fallbackName,
      address,
    };
  }

  return {
    name: fallbackName,
    address: trimmed,
  };
}

function dotStuff(text: string) {
  return text.replace(/(^|\r\n)\./g, "$1..");
}

function encodeBase64(content: Buffer) {
  return content.toString("base64").match(/.{1,76}/g)?.join("\r\n") ?? "";
}

function buildMessage({
  from,
  to,
  replyTo,
  subject,
  text,
  html,
  attachments = [],
}: Pick<
  SendMailOptions,
  "from" | "to" | "replyTo" | "subject" | "text" | "html" | "attachments"
>) {
  const alternativeBoundary = `alternative-${Date.now().toString(16)}-${Math.random()
    .toString(16)
    .slice(2)}`;
  const mixedBoundary = `mixed-${Date.now().toString(16)}-${Math.random()
    .toString(16)
    .slice(2)}`;
  const headers = [
    `From: ${formatAddress(from)}`,
    `To: ${to.map(formatAddress).join(", ")}`,
    replyTo ? `Reply-To: ${formatAddress(replyTo)}` : null,
    `Subject: ${escapeHeaderValue(subject)}`,
    "MIME-Version: 1.0",
    attachments.length > 0
      ? `Content-Type: multipart/mixed; boundary="${mixedBoundary}"`
      : `Content-Type: multipart/alternative; boundary="${alternativeBoundary}"`,
  ].filter(Boolean);

  const alternativeBody = [
    `--${alternativeBoundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    text,
    "",
    `--${alternativeBoundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    html,
    "",
    `--${alternativeBoundary}--`,
    "",
  ].join("\r\n");

  const body =
    attachments.length === 0
      ? alternativeBody
      : [
          `--${mixedBoundary}`,
          `Content-Type: multipart/alternative; boundary="${alternativeBoundary}"`,
          "",
          alternativeBody,
          ...attachments.flatMap((attachment) => [
            `--${mixedBoundary}`,
            `Content-Type: ${attachment.contentType}; name="${escapeHeaderValue(attachment.filename)}"`,
            "Content-Transfer-Encoding: base64",
            `Content-Disposition: attachment; filename="${escapeHeaderValue(attachment.filename)}"`,
            "",
            encodeBase64(attachment.content),
            "",
          ]),
          `--${mixedBoundary}--`,
          "",
        ].join("\r\n");

  return `${headers.join("\r\n")}\r\n\r\n${body}`;
}

class SmtpSession {
  private buffer = "";

  constructor(private socket: net.Socket | tls.TLSSocket) {
    this.socket.setEncoding("utf8");
    this.socket.setTimeout(15000);
  }

  async readResponse(): Promise<SmtpResponse> {
    const socket = this.socket;

    return new Promise<SmtpResponse>((resolve, reject) => {
      const lines: string[] = [];

      const cleanup = () => {
        socket.off("data", onData);
        socket.off("error", onError);
        socket.off("close", onClose);
      };

      const finish = (response: SmtpResponse) => {
        cleanup();
        resolve(response);
      };

      const fail = (error: Error) => {
        cleanup();
        reject(error);
      };

      const tryParse = () => {
        while (true) {
          const index = this.buffer.indexOf("\r\n");
          if (index === -1) {
            return;
          }

          const line = this.buffer.slice(0, index);
          this.buffer = this.buffer.slice(index + 2);
          lines.push(line);

          const match = line.match(/^(\d{3})([ -])/);
          if (match && match[2] === " ") {
            finish({
              code: Number(match[1]),
              lines,
            });
            return;
          }
        }
      };

      const onData = (chunk: string) => {
        this.buffer += chunk;
        tryParse();
      };

      const onError = (error: Error) => fail(error);

      const onClose = () => fail(new Error("SMTP connection closed unexpectedly"));

      socket.on("data", onData);
      socket.on("error", onError);
      socket.on("close", onClose);

      tryParse();
    });
  }

  write(command: string) {
    this.socket.write(`${command}\r\n`);
  }

  writeData(message: string) {
    this.socket.write(message);
  }

  destroy() {
    this.socket.destroy();
  }

  async upgradeToTls(host: string) {
    const upgradedSocket = tls.connect({
      socket: this.socket,
      servername: host,
    });

    await new Promise<void>((resolve, reject) => {
      upgradedSocket.once("secureConnect", () => {
        this.socket = upgradedSocket;
        this.socket.setEncoding("utf8");
        this.socket.setTimeout(15000);
        resolve();
      });
      upgradedSocket.once("error", reject);
    });
  }
}

function parseCapabilities(lines: string[]) {
  return lines
    .map((line) => line.slice(4).trim())
    .filter(Boolean)
    .map((line) => line.toUpperCase());
}

async function connectSocket(host: string, port: number, secure: boolean) {
  if (secure) {
    return await new Promise<tls.TLSSocket>((resolve, reject) => {
      const socket = tls.connect({
        host,
        port,
        servername: host,
      });

      socket.once("secureConnect", () => resolve(socket));
      socket.once("error", reject);
    });
  }

  return await new Promise<net.Socket>((resolve, reject) => {
    const socket = net.connect({ host, port }, () => resolve(socket));
    socket.once("error", reject);
  });
}

async function expectResponse(session: SmtpSession, expected: number[]) {
  const response = await session.readResponse();

  if (!expected.includes(response.code)) {
    throw new Error(`SMTP error ${response.code}: ${response.lines.join(" | ")}`);
  }

  return response;
}

export async function sendMail(options: SendMailOptions) {
  const port = Number(options.port) || 587;
  const secure = options.secure ?? port === 465;
  const socket = await connectSocket(options.host, port, secure);
  const session = new SmtpSession(socket);

  try {
    await expectResponse(session, [220]);

    session.write("EHLO localhost");
    let response = await expectResponse(session, [250]);
    const capabilities = parseCapabilities(response.lines);

    if (!secure && capabilities.includes("STARTTLS")) {
      session.write("STARTTLS");
      await expectResponse(session, [220]);
      await session.upgradeToTls(options.host);

      session.write("EHLO localhost");
      response = await expectResponse(session, [250]);
    }

    session.write("AUTH LOGIN");
    await expectResponse(session, [334]);
    session.write(Buffer.from(options.auth.username).toString("base64"));
    await expectResponse(session, [334]);
    session.write(Buffer.from(options.auth.password).toString("base64"));
    await expectResponse(session, [235]);

    session.write(`MAIL FROM:<${options.from.address}>`);
    await expectResponse(session, [250]);

    const recipients = [...options.to, ...(options.bcc ?? [])];
    for (const recipient of recipients) {
      session.write(`RCPT TO:<${recipient.address}>`);
      await expectResponse(session, [250, 251]);
    }

    session.write("DATA");
    await expectResponse(session, [354]);

    const message = buildMessage({
      from: options.from,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    });

    session.writeData(`${dotStuff(message)}\r\n.\r\n`);
    await expectResponse(session, [250]);

    session.write("QUIT");
    await expectResponse(session, [221]);
  } finally {
    session.destroy();
  }
}

export function createMailbox(value: string, fallbackName?: string) {
  return parseAddress(value, fallbackName);
}
