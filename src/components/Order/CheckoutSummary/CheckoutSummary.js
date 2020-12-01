import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./checkoutSummary.module.css";
const CheckoutSummary = (props) => {
  return (
    <div className={styles.checkoutSummary}>
      <h1>We hope you like our burger!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
        <Button click={props.checkOutCancelled} btnType="Danger">
          Cancel
        </Button>
        <Button click={props.checkOutContinued} btnType="Success">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
