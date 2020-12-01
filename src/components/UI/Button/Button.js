import React from "react";
import styles from "./Button.module.css";
const Button = (props) => {
  return (
    <button
      onClick={props.click}
      disabled={props.disabled}
      className={[styles.Button, styles[props.btnType]].join(" ")}
    >
      {props.children}
    </button>
  );
};

export default Button;
