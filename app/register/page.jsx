"use client";
import React from "react";
import Link from "next/link";

function Page() {
  async function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(
      formData.entries()
    );
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      // console.log("Registration successful:", data);
    } catch (error) {
      console.log("Registration error:", error);
    }
  }
  return (
    <div className="h-screen w-full flex bg-gray-200 flex-col justify-center items-center gap-4 p-5 rounded-xl">
      <div className="w-19/20 h-3/5 lg:w-1/4 lg:h-2/3 shadow-2xl rounded-2xl bg-white text-black p-5 lg:p-3 flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl font-bold">Register Page</h1>
        <form
          onSubmit={handleRegister}
          className="w-full flex flex-col justify-center"
        >
          <label htmlFor="name">Username</label>
          <input
            type="text"
            placeholder="Enter your username..."
            id="name"
            name="username"
            className="p-1 w-full border border-gray-900 rounded"
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter your email..."
            id="email"
            name="email"
            className="p-1 w-full border border-gray-900 rounded"
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            placeholder="Enter your password..."
            id="password"
            name="password"
            className="p-1 w-full border border-gray-900 rounded"
          />
          <br />
          <button
            type="submit"
            className="bg-green-400 text-white text-xl p-1 rounded"
          >
            Register
          </button>
          <div className="mt-2 w-full flex justify-center">
            <p>
              Already have an account?{" "}
              <Link className="text-blue-700" href="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
