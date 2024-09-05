"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

type Props = {
  secondaryBtnText?: string;
  secondaryBtnFunctionality?: () => void;
};

const Footer = ({ secondaryBtnFunctionality }: Props) => {
  const pathname = usePathname();
  return (
    <footer className="w-full absolute bottom-0 h-20 border-t-2 border-grey bg-[#181818] font-light text-sm flex items-center">
      <div className="flex gap-4 justify-end mr-48 w-full">
        <button className="bg-grey flex items-center gap-2 hover:bg-grey/90 text-white border-grey rounded-md px-4 py-2 transition-all hover:scale-95 duration-100 ease-in">
          <FaArrowLeftLong /> Previous
        </button>
        {pathname === "/composepost" ? (
          <button
            onClick={secondaryBtnFunctionality}
            className="flex items-center gap-2 bg-gradient-to-r from-purple to-pink hover:bg-gradient-to-tr transition-all hover:scale-95 duration-100 ease-in text-white rounded-md px-4 py-2"
          >
            Post <FaArrowRightLong />
          </button>
        ) : (
          <button className="flex items-center gap-2 bg-gradient-to-r from-purple to-pink hover:bg-gradient-to-tr transition-all hover:scale-95 duration-100 ease-in text-white rounded-md px-4 py-2">
            Continue <FaArrowRightLong />
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
