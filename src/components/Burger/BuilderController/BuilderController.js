import React from "react";
import ControllerElement from "./ControllerElement/ControllerElement";
import styles from "./BuilderController.module.css";

const controlElements = [
  { elementName: "Salad", type: "salad" },
  { elementName: "Bacon", type: "bacon" },
  { elementName: "Cheese", type: "cheese" },
  { elementName: "Meat", type: "meat" },
];

const BuilderController = (props) => {
  return (
    <div className={styles.BuilderController}>
      {controlElements.map((controlElement) => {
        return (
          <ControllerElement
            key={controlElement.elementName}
            ingredientName={controlElement.elementName}
            maxIngredientQuantity={props.maxIngredientQuantity(
              controlElement.type
            )}
            // ingredientPrice={props.ingredientPrice(controlElement.type)}
            ingredientQuantity={props.ingredientQuantity(controlElement.type)}
            addingElement={() => props.addingElement(controlElement.type)}
            removingElement={() => props.removingElement(controlElement.type)}
          />
        );
      })}
      <p>Total Price: {props.totalPrice}€</p>
      <button
        className={styles.orderButton}
        onClick={props.orderButtonOnClick}
        disabled={!props.purchasable}
      >
        {props.isAuth ? " Order Now" : "Please login to place your order"}
      </button>
    </div>
  );
};

export default BuilderController;
