import React, {useCallback, useEffect, useState} from 'react';
import InfoBlock from "./Components/Info-Block/Info-Block";
import CountryItem from "./Components/Country-Item/Country-item";
import {Countries} from "./Components/type";
import axios from "axios";

const CountryNameURL= 'https://restcountries.com/v2/all?fields=name';

function App() {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [clickedCountry, setClickedCountry] = useState<string | null>(null);


  const fetchData = useCallback(async () => {
    const countriesResponse = await axios.get<Countries[]>(CountryNameURL);
    const promises = countriesResponse.data.map(async country => {
      return {
        name:country.name,
        id:Math.random().toString(),
      }
    });
    const newCountries = await Promise.all(promises);
    setCountries(newCountries);
  }, []);

  useEffect(()=> {
    fetchData().catch(console.error);
  }, [fetchData]);


  return (
    <div className="m-auto d-flex mt-2" style={{width:'890px'}}>
      <div className="Country-List w-25 overflow-scroll" style={{height:'400px'}} >
        <h1>Countries</h1>
        {countries.map(country => (
          <CountryItem name={country.name} key={country.id} onClick={() => setClickedCountry(country.name)}/>
        ))}
      </div>
      <div className="info-block w-75">
        <InfoBlock name={clickedCountry}/>
      </div>
    </div>
  );
}

export default App;
