//basic
import React, { Component } from "react";
//database
import axios from "../../axios-orders";
//redux
import { connect } from "react-redux"; //hoc to connect to reducer
import * as actions from "../../store/actions/index";
//hoc
import Aux from "../../hoc/Aux";
import withErrorHandler from "../../hoc/withErrorHandler";

//other components
import Burger from "../../components/Burger/Burger";
import BuilderController from "../../components/Burger/BuilderController/BuilderController";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

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

export class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // ingredients: null, //client-side state => redux
      //totalPrice: 0, //client-side state => redux
      //initialPrice: 3, //client-side state => redux
      orderButtonClicked: false, //local UI State
    };
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }
  /***/
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((updatedCurrentSum, individualElement) => {
        return updatedCurrentSum + individualElement;
      }, 0);
    return sum > 0;
  };

  /***/
  orderButtonHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ orderButtonClicked: true });
    } else {
      this.props.onAuthSetRedirectPath("/cart");
      this.props.history.push("/auth");
    }
  };

  /***/
  closeModalHandler = () => {
    this.setState({ orderButtonClicked: false });
  };

  /***/

  continueOrderHandler = () => {
    const queryParam = [];
    for (let i in this.props.ingredients) {
      queryParam.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.props.ingredients[i])
      );
    }
    queryParam.push("price=" + this.props.totalPrice.toFixed(2));
    const queryString = queryParam.join("&");
    this.props.history.push({
      pathname: "/cart",
      search: "?" + queryString,
    });
    this.props.onInitPurchase();
  };

  /***/
  totalIngredientPriceCalculator = (ingredientsInfoObject) => {
    const totalIngredientPrice = Object.keys(ingredientsInfoObject)
      .map((ingKey, i) => {
        return ingredientsInfoObject[ingKey] * INGREDIENT_PRICES[ingKey];
      })
      .reduce((prevValue, currValue) => {
        return prevValue + currValue;
      });
    return totalIngredientPrice;
  };

  /***/
  addingIngredientsHandler = (ingredientType) => {
    //count ingredients
    const oldCount = this.props.ingredients[ingredientType];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.props.ingredients,
    };

    updatedIngredients[ingredientType] =
      updatedCount <= MAX_INGREDIENTS_QUANTITY[ingredientType]
        ? updatedCount
        : MAX_INGREDIENTS_QUANTITY[ingredientType];

    //calculate current updated ingredients price

    const initialPrice = this.props.initialPrice;
    const updatedIngredientPrice = this.totalIngredientPriceCalculator(
      updatedIngredients
    );
    const newTotalPrice = (updatedIngredientPrice + initialPrice).toFixed(2);

    //set the new State
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newTotalPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  /***/
  removingIngredientsHandler = (ingredientType) => {
    //count ingredients
    const oldCount = this.props.ingredients[ingredientType];
    const updatedCount = oldCount <= 0 ? 0 : oldCount - 1;
    const updatedIngredients = {
      ...this.props.ingredients,
    };
    updatedIngredients[ingredientType] = updatedCount;

    //calculate current updated ingredients price

    const initialPrice = this.props.initialPrice;
    const updatedIngredientPrice = this.totalIngredientPriceCalculator(
      updatedIngredients
    );
    const newTotalPrice = (updatedIngredientPrice + initialPrice).toFixed(2);

    //set the new State
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newTotalPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  /***/
  ingredientQuantityHandler = (ingredientType) => {
    const currentQuantity = this.props.ingredients[ingredientType];
    return currentQuantity;
  };
  /***/
  ingredientPriceHandler = (ingredientType) => {
    const ingredientPrice = INGREDIENT_PRICES[ingredientType];
    return ingredientPrice + "€";
  };

  /***/
  maxIngredientQuantityHandler = (ingredientType) => {
    const ingredientQuantity = MAX_INGREDIENTS_QUANTITY[ingredientType];
    return ingredientQuantity;
  };

  render() {
    let orderSummary = null;
    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary
          totalPrice={this.props.totalPrice}
          continueOrder={this.continueOrderHandler}
          cancelOrder={this.closeModalHandler}
          ingredients={this.props.ingredients}
        />
      );
    }

    let burger = this.props.error ? (
      <p>The page cannot be loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuilderController
            maxIngredientQuantity={this.maxIngredientQuantityHandler}
            ingredientPrice={this.ingredientPriceHandler}
            addingElement={this.props.onIngredientAdded} //need to pass the ingrname but in the bulder controller, we aldready pass the control type to it
            removingElement={this.props.onIngredientRemoved}
            ingredientQuantity={this.ingredientQuantityHandler}
            totalPrice={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            orderButtonOnClick={this.orderButtonHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.orderButtonClicked}
          closeModal={this.closeModalHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onAuthSetRedirectPath: (path) =>
      dispatch(actions.authSetRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
