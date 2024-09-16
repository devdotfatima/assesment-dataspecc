"use client";
import { AccordionProps } from "@/utils/types";
import React, { useState } from "react";

const Accordion = ({
  heading,
  content,
  defaultOpen = true,
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className=" w-full">
      <h2>
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium  bg-grey/40  text-white border border-grey rounded-t-lg   gap-3 ${
            isOpen ? " border-b-0 " : "rounded-b-lg border-b"
          }`}
          aria-expanded={isOpen}
          aria-controls="accordion-collapse-body-1"
          onClick={toggleAccordion} // Toggles the accordion
        >
          <span className=" text-xl tracking-wider font-normal">{heading}</span>
          <svg
            className={`w-3 h-3 shrink-0 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>

      {/* Accordion Body */}
      <div
        id="accordion-collapse-body-1"
        className={`${isOpen ? "block" : "hidden"}`}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5 border  border-grey bg-black rounded-b-lg ">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
