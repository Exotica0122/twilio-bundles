import { Book, Home, Package, User, Users } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: JSX.Element;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Bundles", href: "/bundles", icon: <Package className="h-5 w-5" /> },
  {
    label: "End Users",
    href: "/end-users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    label: "End User Types",
    href: "/end-user-types",
    icon: <User className="h-5 w-5" />,
  },
  {
    label: "Addresses",
    href: "/addresses",
    icon: <Home className="h-5 w-5" />,
  },
  {
    label: "Regulations",
    href: "/regulations",
    icon: <Book className="h-5 w-5" />,
  },
];
