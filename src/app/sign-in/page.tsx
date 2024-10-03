"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { login } from "../../lib/api_urls";
import "react-toastify/dist/ReactToastify.css";
import { encrypt } from "../../../utils/security";
import CustomToast, { showToast } from "@/components/Toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Ensure component is mounted
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    setIsMounted(true); // Set to true when the component is mounted
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, isAdminLogin: true }),
      });

      if (response.ok) {
        const data = await response.json();

        if (!data["errorStatus"]) {
          if (rememberMe) {
            localStorage.setItem("usere", encrypt(JSON.stringify(data)));
          } else {
            localStorage.setItem("user", encrypt(JSON.stringify(data)));
          }

          // Redirect only if the component is mounted
          if (isMounted) {
            router.push("/admin");
          }
        } else {
          showToast("error", data["msg"]);
        }
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomToast />
      <div className="flex relative z-0 h-screen items-center justify-center bg-cover bg-top bg-[url('/bg.png')]">
        <div className="absolute z-10 inset-0 bg-black bg-opacity-70">
          <div className="relative z-20 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md relative">
              <div className="absolute top-0 left-0 w-full h-20 bg-[url('/gridlines.jpg')] opacity-20 bg-repeat bg-center mb-70">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0)_0%,_rgba(255,255,255,1)_80%)] opacity-80"></div>
              </div>

              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <h2 className="text-2xl font-bold text-center  text-gray-900">
                Login to Your Account
              </h2>
              <form
                className="space-y-6"
                method="POST"
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit;
                  }
                }}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 mt-1 text-sm text-gray-900 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 mt-1 text-sm text-gray-900 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="remember_me"
                      className="block ml-2 text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-third hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      loading ? "bg-primary" : "bg-secondary hover:bg-third"
                    }`}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
