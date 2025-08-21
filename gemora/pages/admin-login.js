import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Head from "next/head";

export default function AdminLogin() {
  const { data: session } = useSession();
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_ADMIN_HINT || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (session?.user?.isAdmin) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <Head><title>Admin — Gemora</title></Head>
        <h2>You're logged in as Admin</h2>
        <a className="btn gold" href="/admin" style={{ marginRight: 12 }}>
          Go to Dashboard
        </a>
        <button className="btn danger" onClick={() => signOut({ callbackUrl: "/" })}>
          Logout
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/admin",
    });
    // NextAuth handles redirect; if it returns, we stop loading
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 420, margin: "6rem auto", padding: "2rem" }}>
      <Head><title>Admin Login — Gemora</title></Head>
      <h2 style={{ marginBottom: "1rem" }}>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "0.6rem", marginTop: 6 }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "0.6rem", marginTop: 6 }}
          />
        </div>
        <button className="btn gold" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
