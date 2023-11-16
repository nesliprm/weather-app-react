import React, { useState } from "react";
import "./App.css";
import axios from "axios";

export default function App(props) {
  let [city, setCity] = useState("");
  let [title, setTitle] = useState("");
  let [text, setText] = useState("");

  function showWeather(response) {
    console.log(response);
    let iconURL = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

    setTitle(
      <div>
        {city}, {response.data.sys.country}
      </div>
    );
    setText(
      <div>
        <div>
          <img src={iconURL} alt={response.data.weather[0].description} />
        </div>
        <div>Temperature: {Math.round(response.data.main.temp)}°C.</div>
        <div className="Desc">
          Description: {response.data.weather[0].description}
        </div>
        <div>Humidity: {response.data.main.humidity}%</div>
        <div>Wind: {Math.round(response.data.wind.speed)} km/h</div>
      </div>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dff5c692192605ee5ed7f95b423ae857&units=metric`;
    axios.get(url).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  return (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        <input
          className="SearchBar"
          type="search"
          placeholder="Please type a city..."
          onChange={updateCity}
        />
        <input className="SearchButton" type="submit" value="Search" />
      </form>

      <h2 className="CityName">{title}</h2>

      <div>{text}</div>
    </div>
  );
}
