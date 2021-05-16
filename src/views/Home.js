import React from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../css/Home.css";

function Home(products) {
  console.log("je veux mon info", products);

  return (
    <div>
      <div className="home__btn">
        <button onClick={products.triPrixCroissant}>Prix croissant</button>
        <button onClick={products.triPrixDecroissant}>Prix décroissant</button>
      </div>
      <div className="home">
        <Grid container justify="center" spacing={3}>
          {products.products.map((product) => {
            return (
              <Link
                key={product.id}
                className="home__link"
                to={{
                  pathname: `/product/${product.name}`,
                  query: {
                    product: { product },
                    handleAddToCart: { products },
                  },
                }}
              >
                <Grid container item xs={12} sm={6} md={4} lg={3}>
                  <img
                    className="home__image"
                    src={product.media.source}
                    alt="vetement"
                  />
                  <div className="overlay">
                    <p className="text-bloc">{product.price.raw}€</p>
                    <p className="text">{product.name}</p>
                  </div>
                </Grid>
              </Link>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default Home;
