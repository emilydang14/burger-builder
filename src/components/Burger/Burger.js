import React from "react";
import styles from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
  const chosenIngredients = Object.keys(props.ingredients)
    .map((ingKey) => {
      return [...Array(props.ingredients[ingKey])].map((_, i) => {
        return <BurgerIngredient key={ingKey + i} ingredientType={ingKey} />;
      });
    })
    .reduce((prevValue, currValue) => {
      return prevValue.concat(currValue);
    }, []);

  return (
    <div className={styles.Burger}>
      <BurgerIngredient ingredientType="bread-top" />
      {chosenIngredients.length === 0 ? (
        <p>Select your ingredients</p>
      ) : (
        chosenIngredients
      )}
      <BurgerIngredient ingredientType="bread-bottom" />
    </div>
  );
};

export default Burger;
