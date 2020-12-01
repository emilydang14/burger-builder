import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../ultility";

const INITIAL_PRICE = 3;
const initialState = {
  ingredients: null,
  totalPrice: INITIAL_PRICE,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.4,
  bacon: 1.2,
  cheese: 0.8,
};

const MAX_INGREDIENTS_QUANTITY = {
  salad: 4,
  bacon: 2,
  meat: 2,
  cheese: 2,
};

const addIngredient = (currentState, action) => {
  const updatedIngredient = {
    [action.ingredientName]:
      currentState.ingredients[action.ingredientName] <
      MAX_INGREDIENTS_QUANTITY[action.ingredientName]
        ? currentState.ingredients[action.ingredientName] + 1
        : MAX_INGREDIENTS_QUANTITY[action.ingredientName],
  };
  const updatedIngredients = updateObject(
    currentState.ingredients,
    updatedIngredient
  );
  const totalPriceShouldUpdate = !(
    currentState.ingredients[action.ingredientName] ===
    MAX_INGREDIENTS_QUANTITY[action.ingredientName]
  );

  const updatedTotalPrice = totalPriceShouldUpdate
    ? parseFloat(
        (
          currentState.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        ).toFixed(2)
      )
    : currentState.totalPrice;

  const updatedState = {
    ingredients: updatedIngredients, //[] pass variable contains the name of the property

    totalPrice: updatedTotalPrice,
    building: true,
  };

  return updateObject(currentState, updatedState);
};

const removeIngredient = (currentState, action) => {
  const updatedIng = {
    [action.ingredientName]:
      currentState.ingredients[action.ingredientName] <= 0
        ? 0
        : currentState.ingredients[action.ingredientName] - 1,
  };

  const updatedIngs = updateObject(currentState.ingredients, updatedIng);

  const updatedTotalPrice =
    currentState.totalPrice <= INITIAL_PRICE
      ? INITIAL_PRICE
      : parseFloat(
          (
            currentState.totalPrice - INGREDIENT_PRICES[action.ingredientName]
          ).toFixed(2)
        );

  const updatedSt = {
    ingredients: updatedIngs, //[] pass variable contains the name of the property
    totalPrice: updatedTotalPrice,
    building: true,
  };

  return updateObject(currentState, updatedSt);
};

const setIngredients = (currentState, action) => {
  return updateObject(currentState, {
    ingredients: action.ingredients,
    totalPrice: INITIAL_PRICE,
    error: false,
    building: false,
  });
};
const reducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngredient(currentState, action);
    // break; no need break because we use return statement for each cases
    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredient(currentState, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(currentState, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(currentState, { error: true });

    default:
      return currentState;
  }
};

export default reducer;
