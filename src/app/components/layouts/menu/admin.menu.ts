import { BadgeDollarSign,LayoutDashboard, PackagePlus, ScrollText } from "lucide-react";

export const adminMenu = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/product", icon: PackagePlus, label: "Product" },
  { to: "/admin/payment", icon: BadgeDollarSign, label: "Payment" },
  { to: "/admin/transaction", icon: ScrollText, label: "Transaction" },
]

export type IMenu = typeof adminMenu[0]