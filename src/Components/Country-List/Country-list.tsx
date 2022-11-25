import React, {useCallback, useEffect, useState} from 'react';
import CountryItem from "../Country-Item/Country-item";
import {Countries} from "../type";
import axios from "axios";
const CountryNameURL= 'https://restcountries.com/v2/all?fields=name';


const CountryList = () => {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [clickedCountry, setClickedCountry] = useState<string | null>(null);


  const fetchData = useCallback(async () => {
    const countriesResponse = await axios.get<Countries[]>(CountryNameURL);
    const promises = countriesResponse.data.map(async country => {
      return {
        name:country.name,
        id:Math.random().toString()
      }
    });
    const newCountries = await Promise.all(promises);
    setCountries(newCountries);
  }, []);

  useEffect(()=> {
    fetchData().catch(console.error);
  }, [fetchData]);


console.log(clickedCountry);


  return (
    <div className='w-25'>
      <h1>Countries</h1>
      <div className="overflow-hidden overflow-scroll" style={{height:'400px'}}>
        {countries.map(country => (
          <CountryItem name={country.name} key={country.id} onClick={() => setClickedCountry(country.name)}/>
        ))}
      </div>
    </div>
  );
};

export default CountryList;