import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "../css/Panier.css";
import LocalMallIcon from "@material-ui/icons/LocalMall";

function Panier(cart) {
  console.log("CART", cart);
  const isEmpty =
    Object.keys(cart.cart).length && cart.cart.line_items.length === 0;

  const EmptyCard = () => {
    return (
      <div className="emptyCart">
        <LocalMallIcon className="icon" style={{ fontSize: "90px" }} />
        <h2>Votre Panier est actuellement vide !</h2>
        <Link to="/product">Continuer vos achats</Link>
      </div>
    );
  };

  if (cart.cart.line_items === undefined) {
    return <EmptyCard />;
  }

  const FilledCart = () => {
    return (
      <div className="filledCart">
        <h2>Votre panier</h2>
        <div className="filledCart__items">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {cart.cart.line_items.map((item) => (
                <tr key={item.product_id}>
                  {console.log("ITEM DU PANIER", item.product_id)}
                  <td className="filledCart__item">
                    <img src={item.media.source} alt={item.name} />

                    <p>{item.name}</p>
                  </td>
                  <td>{item.price.formatted_with_symbol}</td>
                  <td>
                    <Button
                      size="large"
                      type="button"
                      variant="contained"
                      color="secondary"
                      onClick={() => cart.handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
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
          </table>
        </div>

        {/* <div className="filledCart__subtotal">
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
        </div> */}
      </div>
    );
  };

  return (
    <div className="panier">{isEmpty ? <EmptyCard /> : <FilledCart />}</div>
  );
}

export default Panier;
