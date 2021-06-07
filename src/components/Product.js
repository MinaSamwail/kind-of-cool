import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../css/Product.css";

function Product(props) {
  // redirect if !props.location.query.product.product
  //history push
  const { name, price, description, id } = props.location.query.product.product;
  const linkVinted = props.location.query.product.product.thank_you_url;
  const images = props.location.query.product.product.assets;
  const addToCart = props.location.query.handleAddToCart.products.onAddToCart;
  const stock = props.location.query.product.product.inventory.available;
  const [alert, setAlert] = useState("");
  console.log("PROPS", props);
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
        <p>Description</p>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        {stock === 1 ? (
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
          />
        ) : (
          <div>
            <p>Out of Stock</p>
            {/* <input type="submit" value="Ajouter au panier" disabled /> */}
          </div>
        )}
        <h3>{alert}</h3>
        <div className="product__logo">
          <a href={linkVinted}>
            <img src="../img/Vinted_Logo.png" alt="v-logo" />
          </a>
          <a href={linkVinted}>
            <img src="../img/vestiaire_collective_logo.png" alt="v-logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Product;
