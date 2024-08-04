"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavTabs = () => {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-4 mt-5">
      <Link
        href="/all"
        className={`px-4 py-2 rounded-full ${
          pathname === "/all" ? "bg-fillAlternative text-primary" : "text-labelNeutral"
        }`}
      >
        전체
      </Link>
      <Link
        href="/studies"
        className={`px-4 py-2 rounded-full ${
          pathname === "/studies" ? "bg-fillAlternative  text-primary" : "text-labelNeutral"
        }`}
      >
        스터디
      </Link>
      <Link
        href="/projects"
        className={`px-4 py-2 rounded-full ${
          pathname === "/projects" ? "bg-fillAlternative  text-primary" : "text-labelNeutral"
        }`}
      >
        프로젝트
      </Link>
      <Link
        href="/events"
        className={`px-4 py-2 rounded-full ${
          pathname === "/events" ? "bg-fillAlternative  text-primary" : "text-labelNeutral"
        }`}
      >
        IT행사
      </Link>
    </nav>
  );
};

export default NavTabs;
