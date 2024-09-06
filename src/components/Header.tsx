"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.png";
import { routes } from "@/utils/consts";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-10 h-16 bg-[#181818] border-b-2 border-grey">
      <div className="flex items-center space-x-20">
        <div className="flex items-end">
          <Image src={Logo} alt="Logo" width={30} height={30} />
          <span className="ml-1 text-sm font-bold">Let&rsquo;s do it</span>
        </div>

        {/* Navigation Section */}
        <nav className="flex space-x-8">
          {routes.map(({ routeName, route }) => (
            <Link
              key={route}
              href={route}
              className={`text-sm h-16 flex items-center ${
                pathname === route
                  ? "text-thm border-b-2 border-thm" // Active route styling
                  : "text-grey-100"
              }`}
            >
              {routeName}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
