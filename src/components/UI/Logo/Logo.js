import React from "react";
import styles from "./Logo.module.css";
const Logo = (props) => {
  return (
    <div className={styles.Logo}>
      <img src={props.src} alt="BurBrgg" />
    </div>
  );
};

export default Logo;
