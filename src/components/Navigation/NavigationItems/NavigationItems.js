import React from "react";
import Aux from "../../../hoc/Aux";
import classes from "./NavigationItems.module.css";
import NavItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <Aux>
      <ul className={classes.NavItems}>
        <NavItem link="/" exact>
          Burger Builder
        </NavItem>
        {props.isAuth && <NavItem link="/orders">Orders</NavItem>}

        {!props.isAuth ? (
          <NavItem link="/auth">Log in</NavItem>
        ) : (
          <NavItem link="/logout">Log out</NavItem>
        )}
      </ul>
    </Aux>
  );
};

export default NavigationItems;
