
// components/Layout.js
import Head from "next/head";
import NavBar from "./NavBar";

export default function Layout({ children, title = "Gemora" }) {
  return (
    <>
      <Head>
        <title>{title} — Gemora</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Gemora — Luxury marketplace" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <NavBar />
      <main className="container">{children}</main>
      <footer
        className="container"
        style={{
          borderTop: "1px solid rgba(255,255,255,.08)",
          paddingTop: "1rem",
          marginTop: "2rem",
          color: "#ccc",
        }}
      >
        © {new Date().getFullYear()} Gemora — Where Luxury Finds Its Essence.
      </footer>
    </>
  );
}

