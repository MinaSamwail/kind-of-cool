import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import "../css/Home.css";
import { Link } from "react-router-dom";
import { commerce } from "../lib/commerce";

function Home() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    let { data } = await commerce.products.list();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home">
      <Grid container justify="center" spacing={3}>
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              className="home__link"
              to={{
                // changer le lien product en nom du produit
                pathname: `/product`,
                query: {
                  product: { product },
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
  );
}

export default Home;
