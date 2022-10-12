import React from "react";
import { useGlobalContext } from "./context/Context";
export default function Favorite() {
  const {  selectMeal, removeFromFavorite, favorite } =
    useGlobalContext();
  return (
    <section className="favorite">
      <h5>favorite</h5>
      <div>
        {favorite.map((item) => {
          const { strMealThumb: image } = item;
          return (
            <div
              style={{
                width: "3rem",
                display: "flex",
                flexDirection: "row",
                margin: ".2rem",
              }}
            >
              {" "}
              <img
                style={{ width: "100% " }}
                src={image}
                alt=""
                onClick={() => selectMeal(item.idMeal, true)} // sending idMeal to find meal and true means this req is comming from favorite component not from meals component
              />
              <button onClick={() => removeFromFavorite(item.idMeal)}>
                remove{" "}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

