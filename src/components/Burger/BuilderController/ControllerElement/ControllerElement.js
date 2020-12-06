import React from "react";
import classes from "./ControllerElement.module.css";

const ControllerElement = (props) => {
  return (
    <div className={classes.ControllerElement}>
      <table>
        <tbody>
          <tr>
            <th>
              {props.ingredientName}
              <span>
                (max ingredient quanity : {props.maxIngredientQuantity})
              </span>
            </th>
            <th>{props.ingredientPrice}</th>
            <th>
              <button onClick={props.addingElement}>+</button>
            </th>
            <th>{props.ingredientQuantity}</th>
            <th>
              <button onClick={props.removingElement}>-</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ControllerElement;
