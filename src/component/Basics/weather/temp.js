//https://api.openweathermap.org/data/2.5/weather?q=raipur&appid=b65b9e9784f8a253409e5e0e706e6032

import React,{useState,useEffect} from "react";
import "./style.css";
import Weathercard from "./weathercard";

const Temp = () => {

    const [searchValue,setSearchValue]=useState("raipur");
    const [tempInfo,setTempInfo]=useState({});
    const getWeatherInfo=async()=>{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=b65b9e9784f8a253409e5e0e706e6032`;
            let res=await fetch(url);
            let data=await res.json();

            const {temp,humidity,pressure}=data.main;
            const {main:weathermood}=data.weather[0];
            const {name}=data;
            const {speed}=data.wind;
            const {country,sunset}=data.sys;

            const myNewWeatherInfo={
                temp,humidity,pressure,
                weathermood,name,
                speed,
                country,
                sunset,
            };
            setTempInfo(myNewWeatherInfo);
            // console.log(temp);
        }catch(error){
            console.log(error);
        }
    };
    useEffect(()=>{getWeatherInfo()},[]);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue }
            onChange={(e)=>setSearchValue(e.target.value)}
          />
          <button className="searchButton" type="button" onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>
      <br />
      {/* our temp  card */}
      <Weathercard tempInfo={tempInfo}/>
    </>
  );
};

export default Temp;
