import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/session";

export default async function LoginPage() {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (token && (await verifySessionToken(token))) {
    redirect("/contracts");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-2xl font-bold">stellarlens</h1>
        <LoginForm />
      </div>
    </main>
  );
}
