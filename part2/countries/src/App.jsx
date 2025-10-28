import { useState, useEffect } from "react";
import "./app.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [cityWeather, setCityWeather] = useState(null);
  const [text, setText] = useState("");

  const handleChange = (e) => {
    console.log(text);
    setText(e.target.value);
  };

  const handleClick = async (countryName) => {
    try {
      const response = await fetch(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`
      );
      if (!response.ok) {
        throw new Error(`Error thrown with response code ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setCountries([data]);
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch(
          `https://studies.cs.helsinki.fi/restcountries/api/all`
        );
        if (!response.ok) {
          throw new Error(`Error thrown with response code ${response.status}`);
        }
        const data = await response.json();
        const filteredCountries = data.filter((country) =>
          country.name.common.toLowerCase().includes(text.toLowerCase())
        );
        setCountries(filteredCountries);
      } catch (e) {
        console.error(e.message);
      }
    };
    getCountries();
  }, [text]);

  useEffect(() => {
    const grabCityWeather = async (country) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${
            country.capitalInfo.latlng[0]
          }&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${
            import.meta.env.VITE_API_KEY
          }`
        );
        if (!response.ok) {
          throw new Error(`Error thrown with response code ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setCityWeather(data);
      } catch (e) {
        console.error(e.message);
      }
    };
    if (countries.length === 1) grabCityWeather(countries[0]);
  }, [countries]);

  return (
    <>
      <label htmlFor="countries">find countries</label>
      <input value={text} onChange={handleChange} id="countries" />
      {text ? (
        countries.length > 10 ? (
          <p>Too many countries, specify filter</p>
        ) : countries.length === 1 ? (
          <>
            <h1>{countries[0].name.common}</h1>
            <p>Capital {countries[0].capital[0]}</p>
            <p>Area {countries[0].area}</p>
            <h1>Languages</h1>
            <ul>
              {Object.values(countries[0].languages).map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
            <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
            <h1>Weather in {countries[0].capital[0]}</h1>
            {!cityWeather ? (
              ""
            ) : (
              <>
                <p>Temperature {cityWeather.main.temp} Celsius</p>
                <img
                  src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
                  alt="weather alt"
                />
                <p>Wind {cityWeather.wind.speed}m/s</p>
              </>
            )}
          </>
        ) : (
          countries.map((country) => (
            <div key={country.name.common} className="flex">
              <p>{country.name.common}</p>
              <button onClick={() => handleClick(country.name.common)}>
                show
              </button>
            </div>
          ))
        )
      ) : (
        ""
      )}
    </>
  );
}

export default App;
