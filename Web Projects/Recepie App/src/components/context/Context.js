import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
const AppContext = React.createContext();
const getFavoritesFromLocalStoreage = () => {
  let fav = localStorage.getItem("favorites");
  if (fav) {
    fav = JSON.parse(localStorage.getItem("favorites"));
  } else {
    fav = [];
  }
  return fav;
};
const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("ig");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorite, setFavorite] = useState(getFavoritesFromLocalStoreage());
  const allMealsUrl = `https://themealdb.com/api/json/v1/1/search.php?s=${search}`;
  const singleRandomMealUrl = "https://themealdb.com/api/json/v1/1/random.php";

  const fetchRandomMeal = async () => {
    setLoading(true);
    try {
      const { data } = await axios(singleRandomMealUrl);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const fetchMeals = async () => {
    setLoading(true);
    try {
      const { data } = await axios(allMealsUrl);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchMeals();
  }, [search]);
  // the function in react work only with respect to components. means if we are calling below function from favourites but somehow meals component is not rendered the we can not use mead.find(idMeals)
  // if we only pass idMeal means function is called from meals component and the meals.find will be usabel
  // idMeal will work when meal components is rendered // favoriteMeal will work when favourite is rendered
  // full details in summary 1 below.
  const selectMeal = (idMeal, reqFromFavComponent) => {
    let meal;
    // if reqFromFavComponent doesnot true means req is comming from  meals component
    if (reqFromFavComponent) {
      // finding meal from meals array as written above for favorite component
      meal = favorite.find((meal) => meal.idMeal === idMeal);
    } else {
      // finding meal from meals useState array as written above for meal component.
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setSelectedMeal(meal);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const addtoFavorite = (idMeal) => {
    // console.log(idMeal)
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const alreadyFavorite = favorite.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavorite) return;
    const updateFavorite = [...favorite, meal]; // added meal to existing favorites.
    setFavorite(updateFavorite);
    localStorage.setItem("favorites", JSON.stringify(updateFavorite));
  };
  const removeFromFavorite = (idMeal) => {
    const updateFavorite = favorite.filter((meal) => meal.idMeal !== idMeal);
    setFavorite(updateFavorite);
    localStorage.setItem("favorites", JSON.stringify(updateFavorite));
  };
  return (
    <AppContext.Provider
      value={{
        meals,
        loading,
        setSearch,
        fetchRandomMeal,
        showModal,
        selectMeal,
        selectedMeal,
        closeModal,
        addtoFavorite,
        removeFromFavorite,
        favorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };

/*************************************************************
               Summary 1
   *************************************************************/

/*
 We cannot use useState of other component  in another component when it is not rendered or gets removed 
 so it is best to make use state of each component with respect to themselves.


*/
