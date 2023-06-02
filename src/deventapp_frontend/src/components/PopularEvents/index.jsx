import * as React from "react";
import EventCard from "../EventCard";

const PopularEvents = () => (
  <div className="py-3">
    <h2 className="text-lg font-semibold text-gray-900">Popular Events</h2>
    <div className="flex space-x-4 overflow-x-scroll">
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
    </div>
  </div>
);

export default PopularEvents;
