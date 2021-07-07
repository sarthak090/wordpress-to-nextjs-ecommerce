import Link from "next/link";
export default function SideNav({ active }) {
  const navLinks = [
    {
      label: "Home",
      href: "/account",
    },
    {
      label: "Orders",
      href: "/account/orders",
    },
    {
      label: "Downloads",
      href: "/account/downloads",
    },
    {
      label: "Address",
      href: "/account/address",
    },
    {
      label: "Logout",
      href: "/account/logout",
    },
  ];
  return (
    <div
      className="flex flex-col "
      id="v-pills-tab"
      role="tablist"
      aria-orientation="vertical"
    >
      {navLinks.map((nav, i) => (
        <Link href={nav.href} key={i}>
          <a
            className={`border border-gray-400 py-4 my-2 px-4 rounded ${
              nav.label.toLowerCase() === active && "active"
            }`}
            href={nav.href}
          >
            {nav.label}
          </a>
        </Link>
      ))}
    </div>
  );
}
