import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "../css/Panier.css";

function Panier(cart) {
  // console.log("CART", cart);
  const isEmpty = cart.cart.line_items.length === 0;

  const EmptyCard = () => {
    return (
      <div className="emptyCart">
        <h2>Votre Panier est actuellement vide !</h2>
        <Link to="/">Retour à la boutique</Link>
      </div>
    );
  };

  const FilledCart = () => {
    return (
      <div className="filledCart">
        <div className="filledCart__items">
          {cart.cart.line_items.map((item) => (
            <div key={item.id}>
              <img src={item.media.source} alt={item.name} />
              <p>{item.name}</p>
              <Button
                size="large"
                type="button"
                variant="contained"
                color="secondary"
                onClick={() => cart.handleRemoveFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
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
              onClick={cart.handleEmptyAll}
            >
              Empty Cart
            </Button>
            <Button
              component={Link}
              to="/checkout"
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
