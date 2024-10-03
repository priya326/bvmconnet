"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { decrypt } from "../../utils/security";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    var user = decrypt(localStorage.getItem("user"));
    if (!user) {
      router.push("/sign-in");
    }
  }, [router]);

  return <>{children}</>;
}
