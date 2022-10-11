import React from 'react'
import { useGlobalContext } from './context/Context'
import './Modal.css'
export default function Modal() {
const {selectedMeal, closeModal} = useGlobalContext();
  return (
    <aside className='modal-overlay'>
<div className='modal-container'>
<img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
<p>{selectedMeal.strInstructions}</p>
<a href={selectedMeal.strSource} target='_blank'>View full recepie</a>
<button onClick={closeModal}>Close</button>
</div>
    </aside>
  )
}
