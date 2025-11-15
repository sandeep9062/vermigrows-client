"use client";
import React from "react";
import Image from "next/image";

const LogoSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rich-green to-leaf-green   px-4">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Logo icon centered above */}
        <div className="relative w-32 h-32 sm:w-80 sm:h-80 mb-2">
          <Image
            src="/vermigrows.png"
            alt="vermigrows"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default LogoSpinner;
