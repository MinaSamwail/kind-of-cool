import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./views/Home";
import Product from "./components/Product";
import Panier from "./components/Panier";
import Checkout from "./components/CheckoutForm/Checkout";
import Accueil from "./views/Accueil";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    let { data } = await commerce.products.list();
    setProducts(data);
  };

  const addToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handleEmptyAll = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };
  // rafraichit le panier
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOdrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOdrder);
      console.log("newOrder", incomingOdrder);
      refreshCart();
    } catch (error) {
      console.log("error", error);
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  //permet de trier les prix
  const triPrixCroissant = () => {
    const sortedDown = [...products].sort((articleA, articleB) => {
      return articleA.price.raw - articleB.price.raw;
    });
    setProducts(sortedDown);
  };
  // permet de trier les prix de facon decroissante
  const triPrixDecroissant = () => {
    const sortedUp = [...products].sort((articleA, articleB) => {
      return articleB.price.raw - articleA.price.raw;
    });
    setProducts(sortedUp);
  };

  return (
    <div className="app">
      <NavMain totalItems={cart.total_unique_items} />

      <Switch>
        <Route exact path="/checkout">
          <Checkout
            cart={cart}
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}
          />
        </Route>

        <Route exact path="/panier">
          <Panier
            cart={cart}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyAll={handleEmptyAll}
          />
        </Route>

        <Route
          path="/product/:name"
          render={(props) => (
            <Product {...props} onAddToCart={addToCart} isAuthed={true} />
          )}
        />

        <Route exact path="/product">
          <Home
            cart={cart}
            products={products}
            onAddToCart={addToCart}
            triPrixCroissant={triPrixCroissant}
            triPrixDecroissant={triPrixDecroissant}
          />
        </Route>

        <Route exact path="/">
          <Accueil />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
