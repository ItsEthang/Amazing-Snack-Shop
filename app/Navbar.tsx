"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiChipsBag } from "react-icons/gi";
import { FaShoppingBag } from "react-icons/fa";
import classNames from "classnames";
import { Flex, Text } from "@radix-ui/themes";

const Navbar = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Snacks", href: "/snacks" },
  ];

  const activePath = usePathname();

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
      <Link
        href="/snacks/orders"
        className="hover:underline underline-offset-8"
      >
        <FaShoppingBag className="h-auto w-5 inline mr-2" />
        <Text>My Order</Text>
      </Link>
    </nav>
  );
};

export default Navbar;
