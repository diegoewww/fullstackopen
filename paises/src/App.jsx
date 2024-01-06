import { useEffect, useState } from "react";
import axios from 'axios';

const App = () => {
  const [name, setName] = useState("");
  const [countries, setCountries] = useState([]);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const filtered = name ? countries.filter(element =>
    element.name.common.toLowerCase().includes(name.toLowerCase())
  ) : countries;

  const showCountryDetails = (element) => {
    // Aquí actualizamos el estado "name" para mostrar los detalles del país
    setName(element.name.common);
  };

  return (
    <div>
      find countries <input type="text" value={name} onChange={handleChangeName} />
      {filtered.length === 1 ? (
        <div>
          <h1>{filtered[0].name.common}</h1>
          <p>capital {filtered[0].capital}</p>
          <p>population {filtered[0].population}</p>
          <h2>languages</h2>
          <ul>
            {filtered[0].languages && (
              <ul>
                {Object.values(filtered[0].languages).map((element, index) => (
                  <li key={index}>{element}</li>
                ))}
              </ul>
            )}
          </ul>
          <img src={filtered[0].flags.png} alt="" />
        </div>
      ) : (
        filtered.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          <div>
            {filtered.map((element) => (
              <div key={element.name.common}>
                <p>{element.name.common}</p>
                <button onClick={() => showCountryDetails(element)}>SHOW</button>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default App;
