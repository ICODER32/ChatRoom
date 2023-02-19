"use client";
import React from "react";
const LogoutButton = () => {
  return (
    <button
      onClick={() => console.log("first")}
      className="bg-red-400 md:px-3 sm:px-2 sm:text-sm transition-all hover:bg-gray-100 hover:text-black text-white lg:font-bold py-2 lg:px-4 rounded"
    >
      Sign out
    </button>
  );
};

export default LogoutButton;
