"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavTabs = () => {
  const pathname = usePathname();

  return (
    <nav className="p-5">
      <Link href="/all" className={`mr-3 ${pathname === "/all" ? "font-bold" : ""}`}>
        전체
      </Link>
      <Link href="/studies" className={`mr-3 ${pathname === "/studies" ? "font-bold" : ""}`}>
        스터디
      </Link>
      <Link href="/projects" className={`mr-3 ${pathname === "/projects" ? "font-bold" : ""}`}>
        프로젝트
      </Link>
      <Link href="/events" className={`mr-3 ${pathname === "/events" ? "font-bold" : ""}`}>
        IT행사
      </Link>
    </nav>
  );
};

export default NavTabs;
