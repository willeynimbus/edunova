"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook to get the current path

const Sidebar = () => {
  const pathname = usePathname(); // Get the current path
  const [active, setActive] = useState(pathname);

  const handleClick = (path: React.SetStateAction<string>) => {
    setActive(path);
  };

  return (
    <aside className="w-60 h-screen bg-white shadow-lg fixed top-24 left-0 flex flex-col items-start py-8">
      <nav className="space-y-4">
        <Link
          href="/overview"
          className={`flex items-center space-x-3 px-6 py-2 ${
            active === "/overview"
              ? "bg-purple-100 text-purple-600"
              : "text-black hover:bg-gray-100"
          } rounded-md`}
          onClick={() => handleClick("/overview")}
        >
          <Button
            className={`${
              active === "/overview" ? "bg-purple-200" : "bg-transparent"
            }`}
          >
            <LayoutGrid />
          </Button>
          <span className="font-semibold">Overview</span>
        </Link>
        <Link
          href="/directory"
          className={`flex items-center space-x-3 px-6 py-2 ${
            active === "/directory"
              ? "bg-purple-100 text-purple-600"
              : "text-black hover:bg-gray-100"
          } rounded-md`}
          onClick={() => handleClick("/directory")}
        >
          <Button
            className={`${
              active === "/directory" ? "bg-purple-200" : "bg-transparent"
            }`}
          >
            <LayoutGrid />
          </Button>
          <span className="font-semibold text-nowrap">People Directory</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
