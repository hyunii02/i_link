import React from "react";
import axios from "axios";
import { WEATHER_API_KEY, BUSAN_KEY } from "../../constants/constants";
import { useState, useEffect } from "react";

const Weather = () => {
  const [weatherIcon, setWeatherIcon] = useState();

  const getWeather = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?id=${BUSAN_KEY}&appid=${WEATHER_API_KEY}`
    );
    const icon = response.data.weather[0].icon;
    setWeatherIcon(`http://openweathermap.org/img/wn/${icon}@2x.png`);
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <img
      src={weatherIcon}
      style={{ objectFit: "fill", width: "50%" }}
      alt="weather"
    />
  );
};

export default Weather;
