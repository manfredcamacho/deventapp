import React from "react";
import Header from "./components/Header/";
import NearbyEvents from "./components/NearbyEvents";
import PopularEvents from "./components/PopularEvents";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";

const App = () => {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <Header />
      <SearchBar />
      <Categories />
      <PopularEvents />
      <NearbyEvents />
      <Footer />
    </div>
  );
};

export default App;
