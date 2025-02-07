"use client";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("materials");

  return (
    <nav
      className={`fixed left-0 top-0 h-full ${
        isExpanded ? "w-56" : "w-16"
      } bg-gray-100 border-r border-gray-300 flex flex-col items-start py-4 gap-8 transition-all duration-200`}
    >
      {/* Materials/Tally Icon */}
      <div
        className={`flex items-center gap-3 px-2 cursor-pointer ${
          isExpanded ? "w-full" : ""
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="text-indigo-500 min-w-[40px]">
          <Image
            src="/images/lavalab_tally.png"
            alt="Materials icon"
            width={40}
            height={40}
          />
        </div>
        {isExpanded && (
          <span className="text-indigo-500 font-medium">Tally</span>
        )}
      </div>

      {/* Categories/Materials Icon */}
      <div
        className={`flex items-center gap-3 px-4 cursor-pointer ${
          isExpanded ? "w-full" : ""
        } ${
          activeItem === "materials"
            ? "bg-indigo-100 rounded-xl py-2"
            : "hover:bg-gray-50"
        }`}
        onClick={() => setActiveItem("materials")}
      >
        <div className="text-gray-500 min-w-[24px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Triangle - moved up */}
            <path d="M12 3L18 12H6L12 3" />
            {/* Square - moved down */}
            <rect x="6" y="16" width="6" height="6" />
            {/* Circle - moved down */}
            <circle cx="17" cy="19" r="3" />
          </svg>
        </div>
        {isExpanded && <span className="text-gray-500">Materials</span>}
      </div>

      {/* Tags/Products Icon */}
      <div
        className={`flex items-center gap-3 px-4 cursor-pointer ${
          isExpanded ? "w-full" : ""
        } ${
          activeItem === "products"
            ? "bg-indigo-100 rounded-xl py-2"
            : "hover:bg-gray-50"
        }`}
        onClick={() => setActiveItem("products")}
      >
        <div className="text-gray-500 min-w-[24px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Main tag shape */}
            <path d="M4 4h8l8 8-8 8-8-8V4z" />
            {/* Small circle (hole) */}
            <circle cx="8" cy="8" r="1.5" />
          </svg>
        </div>
        {isExpanded && <span className="text-gray-500">Products</span>}
      </div>

      {/* Orders/Fulfillment Icon */}
      <div
        className={`flex items-center gap-3 px-4 cursor-pointer ${
          isExpanded ? "w-full" : ""
        } ${
          activeItem === "fulfillment"
            ? "bg-indigo-100 rounded-xl py-2"
            : "hover:bg-gray-50"
        }`}
        onClick={() => setActiveItem("fulfillment")}
      >
        <div className="text-gray-500 min-w-[24px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Main rectangle with jagged bottom */}
            <path d="M6 4h12v12l-2 2l-2-2l-2 2l-2-2l-2 2l-2-2V4" />
            {/* Horizontal lines */}
            <path d="M9 8h6 M9 12h6 M9 16h6" />
          </svg>
        </div>
        {isExpanded && <span className="text-gray-500">Fulfillment</span>}
      </div>

      {/* Divider */}
      <div
        className={`w-full px-4 ${isExpanded ? "opacity-100" : "opacity-0"}`}
      >
        <div className="h-[1px] bg-gray-200"></div>
      </div>

      {/* Grid/Integrations Icon */}
      <div
        className={`flex items-center gap-3 px-4 cursor-pointer ${
          isExpanded ? "w-full" : ""
        } ${
          activeItem === "integrations"
            ? "bg-indigo-100 rounded-xl py-2"
            : "hover:bg-gray-50"
        }`}
        onClick={() => setActiveItem("integrations")}
      >
        <div className="text-gray-500 min-w-[24px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {/* Three squares */}
            <rect x="4" y="4" width="6" height="6" />
            <rect x="4" y="14" width="6" height="6" />
            <rect x="14" y="14" width="6" height="6" />
            {/* Circle - moved to top right */}
            <circle cx="17" cy="7" r="3" />
          </svg>
        </div>
        {isExpanded && <span className="text-gray-500">Integrations</span>}
      </div>

      {/* Bottom Section with Exit and Profile */}
      <div
        className={`mt-auto flex flex-col gap-4 mb-4 ${
          isExpanded ? "w-full px-4" : "items-center"
        }`}
      >
        {/* Logout button */}
        <div
          className={`flex items-center gap-3 ${
            isExpanded ? "w-full" : "justify-center"
          }`}
        >
          <div className="text-red-700 min-w-[24px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </div>
          {isExpanded && <span className="text-red-700">Logout</span>}
        </div>

        {/* Profile Section */}
        <div
          className={`flex items-center gap-3 ${
            isExpanded ? "w-full" : "justify-center pl-1"
          }`}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
            <Image
              src="/images/linkedin_pic.jpg"
              alt="Profile"
              width={150}
              height={150}
              className="object-cover min-w-full min-h-full"
            />
          </div>
          {isExpanded && (
            <div className="flex flex-col">
              <span className="font-medium">Anisha Chitta</span>
              <span className="text-gray-500 text-sm">Engineer</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
