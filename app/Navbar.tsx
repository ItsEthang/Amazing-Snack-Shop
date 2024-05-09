"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiChipsBag } from "react-icons/gi";
import classNames from "classnames";

const Navbar = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Snacks", href: "/snacks" },
  ];

  const activePath = usePathname();

  return (
    <nav className="flex space-x-6 border-b-2 mb-5 px-4 h-16 items-center">
      <Link href="/">
        <GiChipsBag className="h-auto w-8" />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              key={link.href}
              href={link.href}
              className={classNames({
                "text-zinc-900": link.href === activePath,
                "text-zinc-500": link.href !== activePath,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
