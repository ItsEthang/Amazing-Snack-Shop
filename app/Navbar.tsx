import Link from "next/link";
import { GiChipsBag } from "react-icons/gi";

const Navbar = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Snacks", href: "/snacks" },
  ];

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
              className="text-zinc-500 hover:text-zinc-900 transition-colors"
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
