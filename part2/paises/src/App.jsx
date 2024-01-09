import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [country, setCountry] = useState('');
  const [allCountry, setAllCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountry(response.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  useEffect(() => {
    console.log("changin");
    if (selectedCountry) {
      axios.get(`http://localhost:3001/${selectedCountry.name.common}`)
        .then(response => {
          setWeather(response.data[0]);
        });
    } else if (country) {
      const filteredCountry = allCountry.find(
        (element) => element.name.common.toLowerCase() === country.toLowerCase()
      );
      if (filteredCountry) {
        axios.get(`http://localhost:3001/${filteredCountry.name.common}`)
          .then(response => {
            console.log(response)
            setWeather(response.data[0]);
          });
      }
    }
  }, [selectedCountry, country, allCountry]);

  function renderCountry(countryData, weatherData) {
    return (
      <div>
        <h1>{countryData.name.common}</h1>
        <p>capital {countryData.capital}</p>
        <p>population {countryData.population}</p>
        <h2>languages</h2>
        <ul>
          {Object.values(countryData.languages).map((element, index) => (
            <li key={index}>{element}</li>
          ))}
        </ul>
        <img src={countryData.flags.png} alt="" />
        <div>
          <p>Weather</p>
          {weatherData && (
            <div>
              <p>Temperature: {weatherData.temperature}</p>
              <p>ID: {weatherData.id}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  function renderListCountry(countryList) {
    return (
      countryList.map((element) => (
        <div key={element.name.common}>
          <p>{element.name.common}</p>
          <button onClick={() => setSelectedCountry(element)}>show</button>
        </div>
      ))
    );
  }

  const filtered = country ? allCountry.filter((element) => element.name.common.toLowerCase().includes(country.toLowerCase())) : allCountry;

  return (
    <div>
      <div>
        find country <input type="text" value={country} onChange={(event) => setCountry(event.target.value)} />
        {
          (filtered.length === 1) ? (
            <>
              {
                renderCountry(filtered[0], weather)
              }
            </>
          ) : (
            (filtered.length < 10) ? (
              renderListCountry(filtered)
            ) : (
              <p>Too many countries</p>
            )
          )
        }
      </div>
      <div>
        {selectedCountry && renderCountry(selectedCountry, weather)}
      </div>
    </div>
  );
};

export default App;
