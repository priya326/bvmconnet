// src/app/logout/page.tsx

"use client"; // Mark this component as a Client Component

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear user data from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("usere");

    // Redirect to the sign-in page
    router.push("/signin");
  }, [router]);

  return (
    <div>
      <h1>Logging out...</h1>
      <p>You are being logged out. Please wait...</p>
    </div>
  );
};

export default Logout;
