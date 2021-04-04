import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <React.Fragment>
      <header className="w-full container mx-auto">
        <div className="flex flex-col items-center pt-6">
          <Link href="/">
            <p className="font-bold text-gray-800 hover:text-gray-700 text-2xl cursor-pointer">
              アイムケーのブログ
            </p>
          </Link>
        </div>
      </header>

      <nav className="w-full py-2 border-b">
        <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
          <Link href="/">
            <p className="hover:bg-gray-200 rounded py-2 px-4 mx-2 cursor-pointer">Top</p>
          </Link>
          <Link href="/categories">
            <p className="hover:bg-gray-200 rounded py-2 px-4 mx-2 cursor-pointer">Categories</p>
          </Link>
          <a href="https://twitter.com/IamK_prog" target="_blank" className="hover:bg-gray-200 rounded py-2 px-4 mx-2">About Me</a>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
