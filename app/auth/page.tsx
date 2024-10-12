"use client"

import { useState } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function AuthPage() {
  const [activePage, setActivePage] = useState("login");
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-slate-900 ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-slate-900 rounded-lg shadow-lg relative z-10 border border-gray-200 dark:border-gray-700">
        {/* Logo */}
        <div className="text-center">
          <Image
            src="/images/nenologo.jpg"
            alt="Neno Sacco Logo"
            width={100}
            height={100}
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Neno Sacco Courier
          </h1>
        </div>

        {/* Conditional Rendering for Forms */}
        {activePage === "login" && <LoginForm />}
        {activePage === "register" && <RegisterForm />}
        {activePage === "forgot-password" && (
          <ForgotPasswordForm onBack={() => setActivePage("login")} />
        )}

        {/* Bottom Navigation */}
        <div className="flex justify-between text-sm mt-4 text-blue-600 dark:text-blue-400">
          {activePage === "login" && (
            <>
              <button
                onClick={() => setActivePage("register")}
                className="hover:underline"
              >
                Create Account
              </button>
              <button
                onClick={() => setActivePage("forgot-password")}
                className="hover:underline text-foreground dark:text-white"
              >
                Forgot Password?
              </button>
            </>
          )}

          {activePage === "register" && (
            <button
              onClick={() => setActivePage("login")}
              className="hover:underline"
            >
              Already have an account? Login
            </button>
          )}
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full "></div>
    </div>
  );
}
