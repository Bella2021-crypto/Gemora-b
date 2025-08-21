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
      <div className="layout-wrapper">
        <NavBar />
        <main className="container layout-content">{children}</main>
        <footer className="layout-footer">
          © {new Date().getFullYear()} Gemora
        </footer>
      </div>
    </>
  );
}
