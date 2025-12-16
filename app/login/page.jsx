"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());
    if (!email || !password) {
      return Response.json({ error: "Please login!" });
    }
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      router.push("/login");
    }
    router.push("/");
  }
  return (
    <div className="h-screen w-full flex bg-gray-200 flex-col justify-center items-center gap-4 p-5 rounded-xl">
      <div className="w-19/20 h-3/5 lg:w-1/4 lg:h-2/3 shadow-2xl rounded-2xl bg-white text-black p-5 lg:p-3 flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl font-bold">Login Page</h1>
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col justify-center"
        >
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter your email..."
            id="email"
            name="email"
            className="p-1 w-full border border-gray-900 rounded"
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            placeholder="Enter your password..."
            id="password"
            name="password"
            className="p-1 w-full border border-gray-900 rounded"
            required
          />
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white text-xl p-1 rounded"
          >
            Login
          </button>
          <div className="mt-2 w-full flex justify-center">
            <p>
              Create an new account?{" "}
              <Link className="text-blue-700" href="/register">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
