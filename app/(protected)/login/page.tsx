import { LoginForm } from '@/components/login-form'
import { getSettings } from '@/lib/actions/settings-action';
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const settings = await getSettings();

  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.08),_transparent_60%)] p-6 md:p-10">
      <div className="w-full max-w-md">
        <LoginForm settings={settings} />
      </div>
    </div>
  )
}

export default LoginPage