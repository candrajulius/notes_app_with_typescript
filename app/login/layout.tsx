import type { Metadata } from "next";
import { BASE, login } from "../utils/constant";

export const metadata: Metadata = {
  title: `${BASE} ${login}`,
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}