import type { Metadata } from "next";
import { BASE, home } from "../utils/constant";

export const metadata: Metadata = {
  title: `${BASE} ${home}`,
};

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}