import * as React from "react";

const Header = () => (
  <header className="bg-white py-3">
    <nav className="flex items-center justify-between" aria-label="Global">
      <div className="flex lg:flex-1">
        <a href="/" className="-m-1.5 p-1.5 flex ">
          <span className="text-lg font-bold leading-8 text-gray-900">
            Deventapp
          </span>
        </a>
      </div>
      <div className="lg:flex lg:flex-1 lg:justify-end">
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
          Log in <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>
  </header>
);
export default Header;
