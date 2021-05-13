import React from "react";
import { Link } from "react-router-dom";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { IconButton, Badge } from "@material-ui/core";
import "../css/NavMain.css";

function NavMain(totalItems) {
  // console.log("totalItems", totalItems);
  return (
    <div className="navMain">
      <div className="navMain__up">
        <Link to="/">
          <h1>Kind of Cool - Friperie en Ligne</h1>
        </Link>

        <Link to="/panier">
          <IconButton edge="start" color="inherit">
            <Badge badgeContent={totalItems.totalItems} color="secondary">
              <LocalMallIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Link>
      </div>
    </div>
  );
}

export default NavMain;
