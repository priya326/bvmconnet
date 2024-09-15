// pages/login.js
import Image from "next/image";
import React from "react";

export default function Register() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {/* Semicircle Gradient Background */}
        <div className="absolute inset-x-0 top-0 h-32 rounded-b-full bg-gradient-to-r from-white-400 to-white-600"></div>

        {/* Content */}
        <div className="relative z-10 w-full flex justify-center items-center mt-16">
          <Image src="/bvm-logo-1.png" height={80} width={80} alt="BVM Logo" />
        </div>
        <h2 className="relative z-10 text-2xl font-bold text-center text-gray-900">
          Register as Admin
        </h2>
        <form className="relative z-10 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
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
              className="w-full px-3 py-2 mt-1 text-sm text-gray-900 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
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
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="relative z-10 text-sm text-center">
          <a
            href="/sign-up"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Don't have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
