import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../UI/Logo/Logo";
import MenuIcon from "../../../assets/images/menu.svg";
import BurgerIcon from "../../../assets/images/burger-logo.png";
import NavItems from "../NavigationItems/NavigationItems";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div
        className={`${classes.mobileOnly} ${classes.Logo}`}
        onClick={props.toggleMenu}
      >
        <Logo src={MenuIcon} />
      </div>
      <div className={classes.Logo}>
        <Logo src={BurgerIcon} />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavItems isAuth={props.isAuth} />
      </nav>
    </header>
  );
};

export default Toolbar;
