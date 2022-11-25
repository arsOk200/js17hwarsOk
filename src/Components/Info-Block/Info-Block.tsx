import React, {useCallback, useEffect, useState} from 'react';
import {Countries, Country} from "../type";
import axios from "axios";
const URl = 'https://restcountries.com/v2/name/';
const URL_ALPHA = 'https://restcountries.com/v2/alpha/';

interface Props {
  name:string | null;
}

const InfoBlock:React.FC<Props> = ({name}) => {
  const [country , setCountry] = useState<Country | null>(null);
  const [borders, setBorders] = useState<Country | null>(null);

    const fetchData = useCallback(async (name:string)=> {
      const countryResponse = await axios.get<Country>(URl + name +'?fields=alpha2Code,flag,name,capital,population,borders');
      setCountry(countryResponse.data);
      }, []);


  useEffect(() => {
    if(name !== null) {
      fetchData(name).catch(console.error);
    }
  }, [name,fetchData]);


  // const bordersData = useCallback(async ()=> {
  //   for(let i:number = 0; i < country[0].borders.length; i++) {
  //     const bordersResponse = await axios.get<Countries>(URL_ALPHA + country[0].borders[i]);
  //     console.log(bordersResponse.data)
  //     setBorders(bordersResponse.data);
  //
  //   }
  //   console.log(borders);
  // },[]);
  //
  // useEffect(() => {
  //     bordersData().catch(console.error);
  // },[bordersData]);

  if (country) {
    let countryZero = country[0];
    return (
      <div>
        <h1>Country name:{countryZero.name} </h1>
        <p>Capital:<strong>{countryZero.capital}</strong></p>
        <img src={countryZero.flag} alt="flag" className='border-primary' style={{width:'500px',  height:'250px'}}/>
        <p>Population:<strong>{countryZero.population}</strong></p>
        <div className="borders">
          <h2>Borders</h2>
          <ul>
            {/*{countryZero.borders.map(border => (*/}
            {/*  <li>{border}</li>*/}
            {/*))}*/}
          </ul>
        </div>
      </div>
    )
  } else {
    return (
      <div className='text-center'>
        Select country
      </div>
    )
  }
};

export default InfoBlock;