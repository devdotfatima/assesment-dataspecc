"use client";
import React from "react";
import Image from "next/image";
import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-10 h-16 bg-[#181818] border-b-2 border-grey">
      <div className="flex items-center space-x-20">
        <div className="flex items-end">
          <Image src={Logo} alt="Logo" width={30} height={30} />
          <span className="ml-1 text-sm font-bold">Let&rsquo;s do it</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
