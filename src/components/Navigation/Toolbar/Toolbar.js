import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../UI/Logo/Logo";
import MenuIcon from "../../../assets/images/menu.svg";
import BurgerIcon from "../../../assets/images/burger-logo.png";
import NavItems from "../NavigationItems/NavigationItems";

const Toolbar = (props) => {
  return (
    <header className={styles.Toolbar}>
      <div
        className={`${styles.mobileOnly} ${styles.Logo}`}
        onClick={props.toggleMenu}
      >
        <Logo src={MenuIcon} />
      </div>
      <div className={styles.Logo}>
        <Logo src={BurgerIcon} />
      </div>

      <nav className={styles.DesktopOnly}>
        <NavItems isAuth={props.isAuth} />
      </nav>
    </header>
  );
};

export default Toolbar;
