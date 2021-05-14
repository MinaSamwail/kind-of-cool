import React from "react";
import { Button } from "@material-ui/core";

function Panier(cart) {
  console.log("CART", cart.cart);
  const isEmpty = cart.cart.line_items == 0;

  const EmptyCard = () => {
    return (
      <div>
        <h2>Votre Panier est actuellement vide !</h2>
      </div>
    );
  };

  const FilledCart = () => {
    return (
      <div className="filledCart">
        <div className="filledCart__items">
          {cart.cart.line_items.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
        <div className="filledCart__subtotal">
          <h3>Subtotal : {cart.cart.subtotal.formatted}€</h3>
          <div className="filledCart__btn">
            <Button
              size="large"
              type="button"
              variant="contained"
              color="secondary"
            >
              Empty Cart
            </Button>
            <Button
              size="large"
              type="button"
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="panier">
      <h1>Panier</h1>
      {isEmpty ? <EmptyCard /> : <FilledCart />}
    </div>
  );
}

export default Panier;
