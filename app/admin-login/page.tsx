"use client";

import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          role: "admin",
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Login failed");
      }

      window.location.href = result.redirectTo || "/admin/orders";
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Login failed";
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="authPage">
      <section className="authCard">
        <p className="authEyebrow">Protected Access</p>
        <h1 className="authTitle">Admin Login</h1>
        <p className="authText">Admin orders page ဝင်ရန် password ထည့်ပါ</p>

        <form className="authForm" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="authInput"
            required
          />

          <button type="submit" className="authButton" disabled={loading}>
            {loading ? "Checking..." : "Login to Admin"}
          </button>

          {message ? <p className="authMessage">{message}</p> : null}
        </form>
      </section>
    </main>
  );
}