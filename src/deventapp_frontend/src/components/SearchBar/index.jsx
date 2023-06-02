import * as React from "react";

const SearchBar = () => (
  <div className="py-3 bg-white">
    <div className="flex px-4 h-12 items-center text-left space-x-3 rounded-full border border-slate-200 focus-within:border-indigo-500">
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-none text-slate-600"
        aria-hidden="true"
      >
        <path d="m19 19-3.5-3.5"></path>
        <circle cx="11" cy="11" r="6"></circle>
      </svg>
      <input
        type="text"
        className="flex-auto focus:outline-none"
        placeholder="Search event, stand up ..."
      />
    </div>
  </div>
);

export default SearchBar;
