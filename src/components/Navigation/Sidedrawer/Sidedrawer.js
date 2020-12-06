import React, { useEffect } from "react";
import classes from "./Sidedrawer.module.css";
import Logo from "../../UI/Logo/Logo";
import NavItems from "../NavigationItems/NavigationItems";
import Aux from "../../../hoc/Aux";
import Backdrop from "../../UI/Backdrop/Backdrop";
import BurgerIcon from "../../../assets/images/burger-logo.png";

const Sidedrawer = (props) => {
  const { closed } = props;
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        closed();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close); //important, to remove the event listener when the components is unmounted
  }, [closed]);

  let attachedClasses = [classes.Sidedrawer, classes.Closed];
  if (props.open) {
    attachedClasses = [classes.Sidedrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop backdropClicked={props.closed} show={props.open} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo src={BurgerIcon} />
        </div>
        <nav>
          <NavItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default Sidedrawer;
