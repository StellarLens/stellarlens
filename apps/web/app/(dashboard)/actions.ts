"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME } from "@/lib/session";

export async function logout(): Promise<void> {
  cookies().delete(SESSION_COOKIE_NAME);
  redirect("/login");
}
