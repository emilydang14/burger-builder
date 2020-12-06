import React from "react";
import styles from "./Logo.module.css";

const Logo = (props) => {
  return (
    <div className={styles.Logo_container}>
      <img src={props.src} alt="BurBrgg" />
    </div>
  );
};

export default Logo;
