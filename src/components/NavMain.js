import React from "react";
import { Link } from "react-router-dom";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { IconButton, Badge } from "@material-ui/core";
import "../css/NavMain.css";

function NavMain(totalItems) {
  let total = totalItems.totalItems;

  return (
    <div className="navMain">
      <div className="navMain__up">
        <div className="navMain__left">
          <Link to="/">
            <img src="../img/banniere_kind_of_cool.jpg" alt="logo" />
          </Link>
        </div>

        <div className="navMain__right">
          <Link to="/">
            <h3>Home</h3>
          </Link>

          <Link to="/product">
            <h3>Boutique</h3>
          </Link>

          <Link to="/panier">
            <IconButton edge="start" color="inherit">
              <Badge badgeContent={total} color="secondary">
                <LocalMallIcon fontSize="large" />
              </Badge>
            </IconButton>
          </Link>
        </div>
      </div>
      <div className="navMain__down"></div>
    </div>
  );
}

export default NavMain;
