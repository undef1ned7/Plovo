import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { CartDish } from "../../type";
import Modal from "../Modal/Modal";
interface Props {
  cartDishes: CartDish[];
  setCartDishes: React.Dispatch<React.SetStateAction<CartDish[]>>;
}
const Cart: React.FC<Props> = ({ cartDishes, setCartDishes }) => {
  const [showModal, setShowModal] = useState(false);
  const [onChangeTitle, setOnChangeTitle] = useState(false);
  useEffect(() => {
    if (!showModal) {
      setOnChangeTitle(false);
    }
  }, [showModal]);
  const total = cartDishes.reduce((sum, cartDish) => {
    return sum + cartDish.amount * cartDish.dish.price;
  }, 0);
  let cart = (
    <div className="alert alert-primary">Cart is empty! Add something!</div>
  );

  if (cartDishes.length > 0) {
    cart = (
      <>
        {cartDishes.map((cartDish) => (
          <CartItem key={cartDish.dish.id} cartDish={cartDish} />
        ))}
        <div className="card border-0 p-2">
          <div className="row">
            <div className="col text-right">Total:</div>
            <div className="col-3 text-right">
              <strong>{total}</strong> KGS
            </div>
          </div>
        </div>
        <button
          className="w-100 btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          order
        </button>
      </>
    );
  }
  const timeClose = () => {
    setOnChangeTitle(true);
    setTimeout(() => {
      setShowModal(false);
      setCartDishes([]);
    }, 2000);
  };
  const cancel = () => setShowModal(false);
  return (
    <div>  
      <h4>Cart</h4>
      {cart}
      <Modal show={showModal} title={"order"} onClose={cancel}>
        <div className="modal-body d-flex justify-content-between">
          {onChangeTitle ? (
            <h4>You ordered the dish</h4>
          ) : (
            <>
              <div>
                <strong>{total}</strong> KGS
              </div>
              <button className="btn btn-primary" onClick={() => timeClose()}>
                Buy
              </button>
            </>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={cancel}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
