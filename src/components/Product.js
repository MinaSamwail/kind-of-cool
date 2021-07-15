import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../css/Product.css";

const Product = (props) => {
  // redirect if !props.location.query.product.product
  //history push

  // if product already in cart can't add it twice

  // console.log("PROPS", props.location.query); // c'est la ou sa bug props.location.query.product of undefined

  console.log("2eme option", props);
  const { name, price, description, id } = props.location.query.product.product;
  const linkVestiareCollective = props.location.query.product.product.seo.title;
  const linkVinted = props.location.query.product.product.thank_you_url;
  const images = props.location.query.product.product.assets;
  const addToCart = props.location.query.handleAddToCart.products.onAddToCart;
  let stock = props.location.query.product.product.inventory.available;
  const [alert, setAlert] = useState("");

  // HANDLE ERROR = return a la page d'acceuil
  const history = useHistory();

  if (props.location.query.product.product === undefined) {
    return history.push("/");
  }

  // GERER LE STOCK quand l'article est deja dans le panier ne pas l'avoir deux fois

  // const stock = () => {
  //   for (
  //     let i = 0;
  //     i <= props.location.query.cart.products.cart.line_items;
  //     i++
  //   ) {
  //     // if(id === )
  //     console.log("i", props.location.query.cart.products.cart.line_items);
  //   }
  // };
  console.log(stock);
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
          // disabled={stock === 0 ? "" : "disabled"}
        >
          Ajouter au Panier {/* {stock > 0 ? "Add to cart" : "Sold out"} */}
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
