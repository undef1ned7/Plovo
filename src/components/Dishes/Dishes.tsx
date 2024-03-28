import React from "react";
import DishItem from "./DishItem";
import { Dish } from "../../type";
interface Props {
  dishes: Dish[];
  addToCart: (dish: Dish) => void;
}
const Dishes: React.FC<Props> = ({ dishes, addToCart }) => {
  return (
    <>
      <h4>Dishes</h4>
      {dishes.map((dish) => {
        return (
          <DishItem key={dish.id} dish={dish} onClick={() => addToCart(dish)} />
        );
      })}
      {/* <DishItem />
      <DishItem />
      <DishItem />
      <DishItem /> */}
    </>
  );
};

export default Dishes;
