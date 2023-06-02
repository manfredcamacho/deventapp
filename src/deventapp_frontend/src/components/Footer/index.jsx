import * as React from "react";

const Header = () => (
  <div className="flex flex-col py-3 items-center">
    <div className="md:w-1/3 py-3">
      <img src="IC-logo.svg" alt="Internet Computer Logo" className="w-full" />
    </div>
    <div>
      <ul className="flex py-3 space-x-3">
        <li>
          <a href="https://github.com/manfredcamacho" target="_blank">
            <img className="fill-blue-500" src="github.svg" alt="Github Logo" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/MannyDeveloper" target="_blank">
            <img src="twitter.svg" alt="Twitter Logo" />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/manfred-camacho/"
            target="_blank"
          >
            <img src="linkedin.svg" alt="Linkedin Logo" />
          </a>
        </li>
      </ul>
    </div>
    <div>
      <p className="text-xs">
        &copy; {new Date().getFullYear()} Manfred Camacho | All Rights Reserved
      </p>
    </div>
  </div>
);

export default Header;
