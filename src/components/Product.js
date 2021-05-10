import React, { useState } from "react";
import "../css/Card.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Product(props) {
  console.log("Props", props);
  const { name, price, images } = props.location.query.product.product;
  const article = props.location.query.product.vetement;
  const [alert, setAlert] = useState("");

  return (
    <div className="card">
      <div className="card__picture">
        <Carousel>
          {images.map((image) => {
            return <img key={image} src={image} alt={name} />;
          })}
        </Carousel>
      </div>
      <div className="card__description">
        <h2>{name}</h2>
        <h3>{price}€</h3>
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
