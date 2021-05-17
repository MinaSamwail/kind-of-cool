import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../css/Product.css";

function Product(props) {
  console.log("Product", props);
  const { name, price, description, id } = props.location.query.product.product;
  const images = props.location.query.product.product.assets;
  const addToCart = props.location.query.handleAddToCart.products.onAddToCart;
  const stock = props.location.query.product.product.inventory.available;

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
          <p>Out of Stock</p>
        )}
        <h3>{alert}</h3>
      </div>
    </div>
  );
}

export default Product;
