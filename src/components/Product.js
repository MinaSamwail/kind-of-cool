import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../css/Product.css";

const Product = (props) => {
  console.log("propss", props);

  const { name, price, description, id } = props.location.state.product;
  const linkVestiareCollective = props.location.state.product.seo.title;
  const linkVinted = props.location.state.product.thank_you_url;
  const images = props.location.state.product.assets;
  const addToCart = props.onAddToCart;
  // let stock = props.location.query.product.product.inventory.available;
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
        <p dangerouslySetInnerHTML={{ __html: description }} />

        {/* {stock > 0 ? "Add to cart" : "Sold out"} */}
        <button
          type="submit"
          value="Ajouter au panier"
          onClick={() =>
            addToCart(
              id,
              1,
              setAlert("Cet article a bien été ajouté à votre panié")
            )
          }
        >
          Ajouter au Panier
        </button>

        <h3>{alert}</h3>
        <div className="product__logo">
          <a href={linkVinted}>
            <img src="../img/Vinted_Logo.png" alt="v-logo" />
          </a>
          <a href={linkVestiareCollective}>
            <img src="../img/vestiaire_collective_logo.png" alt="v-logo" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Product;
