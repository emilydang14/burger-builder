import React from "react";
import Aux from "../../hoc/Aux";
import Button from "../../components/UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((ingKey) => {
    return (
      <li key={ingKey}>
        <span style={{ textTransform: "capitalize" }}>{ingKey}</span>:{" "}
        {props.ingredients[ingKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>Your delicious burger fillied with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        Total price:
        <span style={{ fontWeight: "bold" }}>{props.totalPrice}</span>
      </p>
      <Button click={props.continueOrder} btnType="Success">
        Continue
      </Button>
      <Button click={props.cancelOrder} btnType="Danger">
        Cancel
      </Button>
    </Aux>
  );
};

export default OrderSummary;
