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
  // console.log("prooood", products);

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
    // setCart(await commerce.cart.delete());
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // console.log("cart", cart);

  return (
    <div className="app">
      <NavMain totalItems={cart.total_items} />
      <Switch>
        <Route exact path="/panier">
          <Panier cart={cart} />
        </Route>

        <Route exact path="/product/:name" component={Product} />

        <Route exact path="/">
          <Home products={products} onAddToCart={addToCart} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
