import type { Metadata } from "next";
import { BASE, register } from "../utils/constant";

export const metadata: Metadata = {
  title: `${BASE} ${register}`,
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}