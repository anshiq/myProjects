import React from 'react'
import {BsHandThumbsUp} from 'react-icons/bs'
import { useGlobalContext } from './context/Context'
export default function Meals() {
  const meals = useGlobalContext().meals;
  const {loading,selectMeal,addtoFavorite } = useGlobalContext();
  if(loading){
    return <section>
      <h1>loading......</h1>
    </section>
  
  }
  if(meals.length<1){
    return <section>
      <h1>No recipie found with your search.......</h1>
    </section>
  
  }
const allMeal = meals.map((eachmeal)=>{
  return <article className='single-meal' key={eachmeal.idMeal}>
    <img src={eachmeal.strMealThumb} className= 'img' onClick={()=>selectMeal(eachmeal.idMeal,false)} alt='sorry' style={{width: '200px'}}/>
    <footer>
      <h5>{eachmeal.strMeal}</h5>
      <button onClick={()=>addtoFavorite(eachmeal.idMeal)} className='like-btn'><BsHandThumbsUp/></button>
    </footer>
  </article>
})
  return <section style={{display: 'grid',gridTemplateColumns: ' repeat(3,1fr)'}}>
    {allMeal}
  </section>
}
