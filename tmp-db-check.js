const fs = require('fs');
const { Client } = require('pg');
function parseEnv(text) {
  return text.split(/\r?\n/).filter(Boolean).reduce((acc, line) => {
    const m = line.match(/^\s*([^=]+)=\s*(.*)$/);
    if (m) acc[m[1]] = m[2].replace(/^"|"$/g, '');
    return acc;
  }, {});
}
const envText = fs.readFileSync('.env', 'utf8');
const prismaEnvText = fs.readFileSync('prisma/.env', 'utf8');
const env = parseEnv(envText);
const prismaEnv = parseEnv(prismaEnvText);
console.log('APP DATABASE_URL:', env.DATABASE_URL);
console.log('PRISMA DATABASE_URL:', prismaEnv.DATABASE_URL);
async function check(url) {
  const client = new Client({ connectionString: url });
  await client.connect();
  const res = await client.query("SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name");
  console.log('TABLES for URL:', url);
  console.log(res.rows);
  await client.end();
}
(async () => {
  try {
    await check(env.DATABASE_URL);
    await check(prismaEnv.DATABASE_URL);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
