import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import DishForm from "./components/DishForm/DishForm";
import Dishes from "./components/Dishes/Dishes";
import { CartDish, Dish } from "./type";
import Cart from "./components/Cart/Cart";

const App = () => {
  const [dishes, setDishes] = useState<Dish[]>([
    {
      id: "1",
      name: "Bayel",
      description: "age: 15",
      image: "",
      price: 100,
    },
  ]);
  const [cartDishes, setCartDishes] = useState<CartDish[]>([]);
  const addDish = (newDish: Dish) => {
    setDishes((prev) => [...prev, newDish]);
  };

  const addDishToCart = (dish: Dish) => {
    setCartDishes((prev) => {
      const existingIndex = prev.findIndex((item) => {
        return item.dish === dish;
      });

      if (existingIndex !== -1) {
        const itemsCopy = [...prev];
        const itemCopy = { ...prev[existingIndex] };
        itemCopy.amount++;
        itemsCopy[existingIndex] = itemCopy;
        return itemsCopy;
      }

      return [...prev, { dish, amount: 1 }];
    });
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container">
        <div className="row flex-wrap mt-2 row-gap-3">
          <div className="col-md-4">
            <DishForm onSubmit={addDish} />
          </div>
          <div className="col-md-4">
            <Dishes addToCart={addDishToCart} dishes={dishes} />
          </div>
          <div className="col-md-4">
            <Cart setCartDishes={setCartDishes} cartDishes={cartDishes} />
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
