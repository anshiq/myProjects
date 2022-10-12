import React from "react";
import { useState } from "react";
import { useGlobalContext } from "./context/Context";
export default function Search() {
  const { setSearch, fetchRandomMeal } = useGlobalContext();
  const [searchText, setSearchText] = useState("");
  const handleChange = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchText);
  };
const RandomMeal =()=>{
  setSearchText('')
  fetchRandomMeal();
}
  return (
    <header>
      <form >
        <input
          onChange={handleChange}
          type="text"
          value={searchText}
          placeholder="seach for recipie"
        />
        <button onClick={handleSubmit} type="button">Search</button>
      </form>
      <button onClick={RandomMeal}> Surprise</button>
    </header>
  );
}
