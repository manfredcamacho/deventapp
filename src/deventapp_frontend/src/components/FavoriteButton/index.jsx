import * as React from "react";

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <div className="relative z-10">
      <button
        className="absolute top-2 right-2 p-1 bg-white rounded-full"
        onClick={toggleFavorite}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className={`w-5 h-5 ${
            isFavorite ? "fill-red-500" : "fill-white"
          } stroke-red-500`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>
    </div>
  );
};

export default FavoriteButton;
