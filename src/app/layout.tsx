import { useRouter } from "next/navigation"; // Use next/navigation in the app directory
import { useEffect } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { decrypt } from "../../utils/security";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BVM",
  description: "Dashboard to manage BVM Club's events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    var user = decrypt(localStorage.getItem("user"));
    if (!user) {
      router.push("/sign-in"); // Now using next/navigation's router
    }
  }, [router]);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
