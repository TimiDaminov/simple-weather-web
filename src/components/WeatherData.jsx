import React from "react";
import Cloudy from "./Cloudy";

const WeatherData = ({ debouncedSearch, weather, countryIndex }) => {
  return (
    <div className="temperature__data">
      <h1 className="city__name">
        {debouncedSearch} ({countryIndex})
      </h1>
      <h1>{weather.temperature} °C</h1>
      <br />
      <Cloudy />
      <div className="weather__description">{weather.description}</div>
    </div>
  );
};

export default WeatherData;
