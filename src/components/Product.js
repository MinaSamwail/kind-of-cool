import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../css/Product.css";

function Product(props) {
  // console.log("props", props);
  const { name, price } = props.location.query.product.product;

  let images = props.location.query.product.product.assets;

  const [alert, setAlert] = useState("");

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
        {/* <input
          type="submit"
          value="Ajouter au panier"
          onClick={() =>
            addToCart(
              article,
              setAlert("Cet article a bien été ajouté à votre panié")
            )
          }
        /> */}
        <h3>{alert}</h3>
      </div>
    </div>
  );
}

export default Product;
