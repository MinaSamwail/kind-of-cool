import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../css/Product.css";

import { commerce } from "../lib/commerce";

function Product(props) {
  // console.log("props", props);
  const { name, price, description, id } = props.location.query.product.product;
  const images = props.location.query.product.product.assets;

  const [alert, setAlert] = useState("");
  const [cart, setCart] = useState({});

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
    // setCart(await commerce.cart.delete());
  };

  const addToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  console.log("CART", cart);

  return (
    <div className="product">
      <div className="product__picture">
        <Carousel>
          {images.map((image) => {
            return <img key={image.id} src={image.url} alt={name} />;
          })}
        </Carousel>
      </div>
      <div className="product__description">
        <h2>{name}</h2>
        <h3>{price.formatted}€</h3>
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <input
          type="submit"
          value="Ajouter au panier"
          onClick={() =>
            addToCart(
              id,
              1,
              setAlert("Cet article a bien été ajouté à votre panié")
            )
          }
          // onClick={() =>
          //   addToCart(
          //     article,
          //     setAlert("Cet article a bien été ajouté à votre panié")
          //   )
          // }
        />
        <h3>{alert}</h3>
      </div>
    </div>
  );
}

export default Product;
