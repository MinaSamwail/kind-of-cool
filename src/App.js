import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./views/Home";
import Product from "./components/Product";
import Panier from "./components/Panier";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  console.log("prooood", products);

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

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const triPrixCroissant = () => {
    const sortedDown = [...products].sort((articleA, articleB) => {
      console.log("click", articleA);
      return articleA.price.raw - articleB.price.raw;
    });
    setProducts(sortedDown);
  };

  const triPrixDecroissant = () => {
    const sortedUp = [...products].sort((articleA, articleB) => {
      return articleB.price.raw - articleA.price.raw;
    });
    setProducts(sortedUp);
  };

  return (
    <div className="app">
      <NavMain totalItems={cart.total_items} />
      <Switch>
        <Route exact path="/panier">
          <Panier
            cart={cart}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyAll={handleEmptyAll}
          />
        </Route>

        <Route exact path="/product/:name" component={Product} />

        <Route exact path="/">
          <Home
            products={products}
            onAddToCart={addToCart}
            triPrixCroissant={triPrixCroissant}
            triPrixDecroissant={triPrixDecroissant}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
