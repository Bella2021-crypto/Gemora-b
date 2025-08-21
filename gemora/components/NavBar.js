// components/NavBar.js
import Link from "next/link";
import CurrencySwitcher from "./CurrencySwitcher";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link href="/" className="logo">GEMORA</Link>
      </div>
      <div className="nav-right">
        <Link href="/listing">Products</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <CurrencySwitcher />
        {session?.user?.isAdmin ? (
          <>
            <Link href="/admin">Admin</Link>
            <button className="btn small danger" onClick={() => signOut({ callbackUrl: "/" })}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/admin-login">Admin</Link>
        )}
      </div>
    </nav>
  );
}
