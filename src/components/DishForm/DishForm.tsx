import React, { useState, ChangeEvent } from "react";
import { Dish, DishMutation } from "../../type";

interface Props {
  onSubmit: (dish: Dish) => void;
}
const DishForm: React.FC<Props> = ({ onSubmit }) => {
  const [dish, setDish] = useState<DishMutation>({
    name: "",
    description: "",
    image: "",
    price: "",
  });
  const onDishChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDish((prev) => ({ ...prev, [name]: value }));
  };
  const onFormSubmit = (e: React.FormEvent) => {
    if (
      dish.name.trim().length !== 0 ||
      dish.description.trim().length !== 0 ||
      dish.image.trim().length !== 0 ||
      dish.price.trim().length !== 0
    ) {
      e.preventDefault();
      onSubmit({
        id: Math.random().toString(),
        ...dish,
        price: parseFloat(dish.price),
      });

      setDish({
        name: "",
        description: "",
        image: "",
        price: "",
      });
    }

    // console.log(dish);
  };
  return (
    <form onSubmit={onFormSubmit}>
      <h4>Add new dish</h4>
      <div className="form-group">
        <label htmlFor="name">name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control"
          value={dish.name}
          onChange={onDishChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          value={dish.description}
          onChange={onDishChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">image</label>
        <input
          id="image"
          name="image"
          type="url"
          className="form-control"
          value={dish.image}
          onChange={onDishChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">price</label>
        <input
          id="price"
          name="price"
          type="number"
          className="form-control"
          value={dish.price}
          onChange={onDishChange}
        />
      </div>

      <button type="submit" className="btn btn-primary mt-4">
        Create
      </button>
    </form>
  );
};

export default DishForm;
