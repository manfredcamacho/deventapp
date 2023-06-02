import * as React from "react";

const NearbyEvents = () => (
  <div className="py-3">
    <h2 className="text-lg font-semibold text-gray-900">Nearby Events</h2>
    <Wrapper title="April">
      <Event today />
      <Event />
      <Event />
    </Wrapper>
    <Wrapper title="May">
      <Event />
      <Event />
      <Event />
    </Wrapper>
  </div>
);

const Event = ({ today }) => {
  // TODO calculate if event is today, consider timezone
  let isToday = today;
  return (
    <div className="flex mb-3 border border-slate-200 rounded-lg divide-x">
      <div
        className={`flex flex-col w-2/12 md:w-1/12 p-3 items-center justify-center font-bold ${
          isToday ? "text-indigo-500" : ""
        }`}
      >
        <p className="capitalize text-xs lg:text-lg">Wed</p>
        <p className="text-2xl/7 lg:text-4xl">28</p>
      </div>
      <div className="flex flex-col w-9/12 md:w-10/12 p-3 justify-center ">
        <div>
          <p className="truncate">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center text-xs text-gray-500">
            <div className="flex py-1 items-center justify-start space-x-1 text-xs text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p> 12:00</p>
            </div>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <p className="truncate">London, UK</p>
          </div>
          <div className="hidden md:flex items-center text-xs text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <p> 10 participants</p>
          </div>
        </div>
      </div>
      <div className="flex w-1/12 items-center justify-center">
        <OptionsButton />
      </div>
    </div>
  );
};

const Wrapper = ({ title, children }) => (
  <div className="flex flex-col mt-2">
    <h3 className="capitalize text-md font-semibold text-gray-900">{title}</h3>
    {children}
  </div>
);

const OptionsButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className=""
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
        >
          <path d="m12 16.495c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25zm0-6.75c1.242 0 2.25 1.008 2.25 2.25s-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25z" />
        </svg>
      </button>
      <div
        className={`${
          isOpen ? "absolute" : "hidden"
        } z-10 -top-2 -right-2 w-fit bg-white rounded-lg shadow-lg py-6 px-8 text-base font-semibold text-slate-900 border border-slate-300`}
      >
        <button
          type="button"
          className="absolute top-1 right-1 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <svg
            viewBox="0 0 10 10"
            className="w-2.5 h-2.5 overflow-visible"
            aria-hidden="true"
          >
            <path
              d="M0 0L10 10M10 0L0 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
        <ul className="space-y-6">
          <li>
            <a className="hover:text-indigo-500" href="#">
              Edit
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-indigo-500 ">
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NearbyEvents;
