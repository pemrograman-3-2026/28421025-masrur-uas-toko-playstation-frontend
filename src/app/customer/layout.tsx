'use client'

import React, { useState } from "react";
import Sidebar from "../components/layouts/Sidebar";
import { userMenu } from "../components/layouts/menu/customer.menu";
import NavbarCustomer from "../components/layouts/NavbarCustomer";

export default function CustomerLayout ({
    children
  }: Readonly<{
    children: React.ReactNode
  }>
) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="d-flex">
      <div
        className={`sidebar-backdrop ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
      
      <Sidebar
        isOpen={sidebarOpen}
        listMenu={userMenu}
        collapsed={collapsed}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-grow-1 d-flex flex-column main-content">
        <NavbarCustomer
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onToggleCollapse={() => setCollapsed((prev) => !prev)}
        />

        <main className="p-4 flex-grow-1 bg-light">
          {children}
        </main>
      </div>
    </div>
  )
}