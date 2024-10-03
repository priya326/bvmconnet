// pages/admin/profile.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { decrypt } from "../../../../utils/security";
import router from "next/router";

const AdminProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-3xl mt-10 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Admin Profile
        </h2>

        <>
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <Image
              src={"/avatar.png"}
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full"
            />
            <h3 className="text-xl mt-4">Admin</h3>
            <p className="text-gray-600">admin@gmail.com</p>
          </div>

          {/* Admin Info */}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Role:</span>
              <span>Role</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Joined on:</span>
              <span>6-7-8</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-between">
            <button className="bg-third text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Edit Profile
            </button>

            <button
              className="bg-secondary text-white py-2 px-4 rounded-lg hover:bg-sky-200"
              onClick={() => router.push("/admin/change-password")}
            >
              Change Password
            </button>

            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              onClick={() => {
                localStorage.removeItem("user");
                router.push("/sign-in");
              }}
            >
              Logout
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default AdminProfile;
