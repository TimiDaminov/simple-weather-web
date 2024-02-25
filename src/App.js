import React from "react";
import "./style/App.css";
import { useState, useEffect } from "react";
import { getData } from "./utils/fetchData";
import SearchBar from "./components/SearchBar";
import UseDebounce from "./hooks/UseDebounce";
import WeatherData from "./components/WeatherData";
import Footer from "./components/Footer";
import { useGeolocated } from "react-geolocated";
const App = () => {
  const [cityName, setCityName] = useState("New York");
  const [displayedCity, setDisplayedCity] = useState({
    title: null,
    index: null,
  });
  const [weather, setWeather] = useState({ temperature: 0, description: "" });

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

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
      {/* <div className="user_location">
        {!isGeolocationAvailable ? (
          <h1>Your browser does not support Geolocation</h1>
        ) : !isGeolocationEnabled ? (
          <h1>Please enable geolocation</h1>
        ) : coords ? (
          <div>
            <h1>Latitude:</h1>
            <h3>{coords.latitude}</h3>
            <h1>Longitude:</h1>
            <h3>{coords.longitude}</h3>
          </div>
        ) : (
          ""
        )}
      </div> */}

      <SearchBar cityName={cityName} setCityName={setCityName} />
      <>
        <WeatherData
          debouncedSearch={debouncedSearch}
          weather={weather}
          countryIndex={displayedCity.index}
        />
      </>
      <Footer />
    </div>
  );
};

export default App;
