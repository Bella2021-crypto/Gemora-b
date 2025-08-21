import Link from "next/link";
import CurrencySwitcher from "./CurrencySwitcher";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link href="/" className="logo">
          <span className="logo-text">GEMORA</span>
        </Link>
      </div>
      <div className="nav-right">
        <Link href="/listing" className="nav-link">Products</Link>
        <Link href="/about" className="nav-link">About</Link>
        <Link href="/contact" className="nav-link">Contact</Link>
        <CurrencySwitcher />
      </div>
    </nav>
  );
}
