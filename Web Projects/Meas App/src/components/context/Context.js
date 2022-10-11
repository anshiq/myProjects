import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const[loading,setLoading]= useState(false)
  const [search,setSearch] = useState('ig')
  const [showModal,setShowModal]=useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [favorite, setFavorite] =useState([]);
  const allMealsUrl = `https://themealdb.com/api/json/v1/1/search.php?s=${search}`;
  const singleRandomMealUrl = "https://themealdb.com/api/json/v1/1/random.php";
  
  const fetchRandomMeal = async()=>{
    setLoading(true)
    try {
      const { data } = await axios(singleRandomMealUrl);
      if(data.meals){
  
        setMeals(data.meals);
      }else{
        setMeals([])
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false)

  }
  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios(url);
      if(data.meals){

        setMeals(data.meals);
      }else{
        setMeals([])
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false)
  };
  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, [search]);
  
  const selectMeal = (idMeal,favoriteMeal)=>{
   let meal;
   // finding meal from meals array as written above.
    meal = meals.find((meal)=>meal.idMeal===idMeal)    
    setSelectedMeal(meal)
    setShowModal(true)
  }
  const closeModal =  ()=>{
    setShowModal(false)
  }
  const addtoFavorite = (idMeal)=>{
    console.log(idMeal)
    // const alreadyFavorite = meals.find((meal)=> meal.idMeal===idMeal)
    // if(alreadyFavorite){
    //   return;
    // } pending fixxx.....
    const meal  = meals.find((meal)=> meal.idMeal===idMeal)
    const updateFavorite = [ ...favorite,meal] // added meal to existing favorites.
    setFavorite(updateFavorite)
  }
  const removeFromFavorite =(idMeal)=>{
        const updateFavorite = favorite.filter((meal)=>meal.idMeal!==idMeal)
        setFavorite(updateFavorite)
  }
  return (
    <AppContext.Provider value={{ meals,loading,setSearch,fetchRandomMeal,showModal,selectMeal, selectedMeal,closeModal ,addtoFavorite,removeFromFavorite,favorite}}>{children}</AppContext.Provider>
    );
  };
  export const useGlobalContext = () => {
   
    return useContext(AppContext);
  };
  export { AppContext, AppProvider };
  