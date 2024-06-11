"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiChipsBag } from "react-icons/gi";
import { FaShoppingBag } from "react-icons/fa";
import classNames from "classnames";
import { Box, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Snacks", href: "/snacks" },
  ];

  const activePath = usePathname();

  const { status, data: session } = useSession();

  return (
    <nav className="flex border-b-2 mb-5 px-6 h-16 items-center justify-between">
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
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log Out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Log In</Link>
        )}
      </Box>
      <Box>
        <Link
          href="/snacks/orders"
          className="hover:underline underline-offset-8"
        >
          <FaShoppingBag className="h-auto w-5 inline mr-2" />
          <Text>My Order</Text>
        </Link>
      </Box>
    </nav>
  );
};

export default Navbar;
