import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoutButton from "./logoutButton";

const Header = () => {
  const session = true;
  if (session) {
    return (
      <header className="sticky flex top-0 z-50 bg-gray-100 shadow-md justify-between items-center lg:p-10 md:p-7 sm:p-7 ">
        <div className="flex space-x-2">
          <Image
            className="rounded-full object-contain mx-2"
            src="https://www.pngmart.com/files/22/Celebrity-PNG-Clipart.png"
            alt="User"
            height={10}
            width={50}
          />
          <div>
            <p className="text-red-400">Logged in as:</p>
            <p className="font-bold text-lg">Ibtisam Anwar</p>
          </div>
        </div>
        <LogoutButton />
      </header>
    );
  }
  return (
    <header className="sticky top-0 z-50 bg-gray-100 shadow-md justify-center items-center lg:p-10 md:p-7 sm:p-7 ">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image
            width={50}
            height={10}
            src="https://static.wixstatic.com/media/940aab_35ae0a50ad4148ed93917abf1239df11~mv2.png"
            alt="Logo"
          />
          <p className="text-red-400">Welcome to challenge Showcase</p>
        </div>
        <Link
          className="bg-red-400 md:px-3 sm:px-2 transition-all hover:bg-gray-100 hover:text-black text-white font-bold py-2 lg:px-4 rounded"
          href="/auth/signin"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;
