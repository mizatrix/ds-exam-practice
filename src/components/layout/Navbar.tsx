"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/topics/complexity", label: "Complexity", icon: "📈" },
    { href: "/topics/linked-lists", label: "Linked Lists", icon: "🔗" },
    { href: "/topics/stacks", label: "Stacks", icon: "🗄️" },
    { href: "/topics/queues", label: "Queues", icon: "📥" },
    { href: "/topics/sorting", label: "Sorting", icon: "📊" },
    { href: "/topics/trees", label: "Trees & BST", icon: "🌳" },
    { href: "/visualizer", label: "Visualizer", icon: "🎬" },
    { href: "/practice", label: "Practice Exam", icon: "📝" },
  ];

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">
        <span className="logo-icon">⚡</span>
        DS Practice Lab
      </Link>
      <button className="mobile-menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? "✕" : "☰"}
      </button>
      <ul className={`navbar-links ${open ? "open" : ""}`}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={pathname === link.href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
