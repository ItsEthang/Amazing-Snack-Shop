"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiChipsBag } from "react-icons/gi";
import { FaShoppingBag } from "react-icons/fa";
import Skeleton from "@/app/components/Skeleton";
import classNames from "classnames";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CartItem } from "./snacks/orders/OrderList";

const Navbar = () => {
  return (
    <nav className="border-b-2 mb-5 py-4 px-3">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="5">
            <Link href="/">
              <GiChipsBag className="h-auto w-8" />
            </Link>
            <NavLinks />
          </Flex>

          <Flex gap="5" align="center">
            <AuthDropDown />
            <MyOrder />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Snacks", href: "/snacks" },
  ];

  const activePath = usePathname();
  return (
    <>
      <ul className="hidden space-x-6 sm:flex">
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
      <div className="sm:hidden">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="ghost">
              <RxHamburgerMenu className="h-auto w-6" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {links.map((link) => (
              <DropdownMenu.Item>
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
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </>
  );
};

const AuthDropDown = () => {
  const { status, data: session } = useSession();
  if (status === "loading") {
    return <Skeleton width="3rem" height="1.5rem" />;
  }
  if (status === "unauthenticated") {
    return <Link href="/api/auth/signin">Log In</Link>;
  }
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            radius="full"
            size="2"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Hi! {session!.user?.name}</DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const MyOrder = () => {
  const cartString = sessionStorage.getItem("cart");
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    return cartString ? JSON.parse(cartString) : [];
  });

  // Effect to listen for changes in sessionStorage
  useEffect(() => {
    const handleStorageChange: (e: StorageEvent) => void = (e) => {
      console.log(e);
      if (e.key === "cart" && e.newValue !== null) {
        console.log("Set new cart Item");
        setCartItems(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Calculate the total item count
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <Box>
      <Text>{itemCount}</Text>
      <Link
        href="/snacks/orders"
        className="hover:underline underline-offset-8"
      >
        <FaShoppingBag className="h-auto w-5 inline mr-2" />
        <Text className="hidden sm:inline">My Order</Text>
      </Link>
    </Box>
  );
};

export default Navbar;
