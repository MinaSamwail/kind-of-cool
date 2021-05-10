import React from "react";
import { Grid } from "@material-ui/core";
import "../css/Home.css";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Shoes",
    description: "Running shoes.",
    price: "$5",
    images: [
      "https://image.freepik.com/photos-gratuite/ordinateur_1205-717.jpg?1",
      "https://image.freepik.com/photos-gratuite/ordinateur_1205-717.jpg?1",
    ],
  },
  {
    id: 2,
    name: "Macbook",
    description: "Apple mac.",
    price: "$10",
    images: [
      "https://image.freepik.com/photos-gratuite/ordinateur_1205-717.jpg?1",
      "https://image.freepik.com/photos-gratuite/ordinateur_1205-717.jpg?1",
    ],
  },
  {
    id: 3,
    name: "Macbook",
    description: "Apple mac.",
    price: "$10",
    images: [
      "https://image.freepik.com/photos-gratuite/ordinateur_1205-717.jpg?1",
      "https://image.freepik.com/photos-gratuite/ordinateur_1205-717.jpg?1",
    ],
  },
  {
    id: 4,
    name: "Macbook",
    description: "Apple mac.",
    price: "$10",
    images: [
      "https://image.freepik.com/photos-gratuite/ordinateur_1205-717.jpg?1",
      "https://image.freepik.com/photos-gratuite/ordinateur_1205-717.jpg?1",
    ],
  },
];

function Home() {
  return (
    <div className="home">
      <Grid container justify="center" spacing={4}>
        {products.map((product) => {
          return (
            <Link
              className="home__link"
              to={{
                pathname: `/product`,
                query: {
                  product: { product },
                },
              }}
            >
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <img
                  className="home__image"
                  src={product.images[0]}
                  alt="vetement"
                />
                <div className="overlay">
                  <p className="text-bloc">{product.price}€</p>
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
