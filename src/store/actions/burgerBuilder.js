import * as actionTypes from "./actionTypes";
//database
import axios from "../../axios-orders";

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: ingName,
  };
};
export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: ingName,
  };
};

export const setIngredients = (ings) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ings,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    //async code
    axios
      .get("https://burger-builder-50dc8.firebaseio.com/ingredients.json")
      .then((res) => {
        dispatch(setIngredients(res.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
