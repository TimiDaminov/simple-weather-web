import React from "react";
import "./style/App.css";
import { useState, useEffect } from "react";
import { getData } from "./utils/fetchData";
import SearchBar from "./components/SearchBar";
import UseDebounce from "./hooks/UseDebounce";
import WeatherData from "./components/WeatherData";
import Footer from "./components/Footer";

const App = () => {
  const [cityName, setCityName] = useState("Riga");
  const [displayedCity, setDisplayedCity] = useState({ title: "", index: "" });
  const [weather, setWeather] = useState({ temperature: 0, description: "" });
  const debouncedSearch = UseDebounce(cityName, 2000);
  useEffect(() => {
    !!debouncedSearch &&
      getData(debouncedSearch).then((data) => {
        setWeather({
          temperature: Math.round(data.main.temp - 273.15),
          description: data.weather[0].description,
        });
        setDisplayedCity({ title: data.name, index: data.sys.country });
      });
  }, [debouncedSearch]);

  return (
    <div className="container">
      <SearchBar cityName={cityName} setCityName={setCityName} />
      <WeatherData
        debouncedSearch={debouncedSearch}
        weather={weather}
        countryIndex={displayedCity.index}
      />
      <Footer />
    </div>
  );
};

export default App;
