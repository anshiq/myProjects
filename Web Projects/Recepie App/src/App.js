import React from "react";
import { useGlobalContext } from "./components/context/Context";
import Favorite from "./components/Favorite";
import Meals from "./components/Meals";
import Modal from "./components/Modal";
import Search from "./components/Search";
export default function App() {
  const{showModal,favorite}= useGlobalContext();
  return (
    <>
    <main>
    <Search/>
 { favorite.length>0 &&  <Favorite/>}
     <Meals/>
   {showModal&&  <Modal/>}

    </main>
    </>
  );
  // Modal is a popup which is gonna show details of reciepie and link to its full details.
  // Modal will communicate with both Meals and  Favorite.
}
