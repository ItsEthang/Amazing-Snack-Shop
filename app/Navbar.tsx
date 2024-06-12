"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiChipsBag } from "react-icons/gi";
import { FaShoppingBag } from "react-icons/fa";
import classNames from "classnames";
import { Box, Container, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Snacks", href: "/snacks" },
  ];

  const activePath = usePathname();

  const { status, data: session } = useSession();

  return (
    <nav className="border-b-2 mb-5 py-4 px-3">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="5">
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
          </Flex>

          <Flex gap="5">
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
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
