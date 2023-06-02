import * as React from "react";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("all");

  const categories = [
    { name: "all", value: "All", selected: true },
    { name: "technology", value: "🧑🏻‍💻 Technology" },
    { name: "food", value: "🍕 Food" },
    { name: "travel", value: " 🛩️ Travel" },
    { name: "party", value: " 🎉 Party" },
    { name: "sport", value: "⚽️ Sport" },
    { name: "music", value: "🎵 Music" },
  ];

  return (
    <div className="flex md:justify-center py-3 space-x-4 overflow-x-scroll pb-3 text-sm font-medium text-gray-500">
      {categories.map((category) => (
        <button
          type="button"
          key={category.name}
          className={`${
            selectedCategory == category.name
              ? "bg-indigo-500 text-white"
              : "border border-slate-300"
          }  min-w-[70px] flex justify-center rounded-full px-3 py-2 flex-shrink-0`}
          onClick={() => {
            setSelectedCategory(category.name);
          }}
        >
          {category.value}
        </button>
      ))}
    </div>
  );
};

export default Categories;
