import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/contactData/ContactData";
import * as actions from "../../store/actions/index";
class Checkout extends Component {
  //client-side state => redux
  // state = {
  //   ingredients: null,
  //   totalPrice: 0,
  // };
  // UNSAFE_componentWillMount() {
  //   console.log(this.props);
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients, totalPrice: price });
  // }
  UNSAFE_componentWillMount() {
    this.props.onInitPurchase();
  }
  checkOutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkOutContinuedHandler = () => {
    this.props.history.replace("/cart/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/orders" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkOutCancelled={this.checkOutCancelledHandler}
            checkOutContinued={this.checkOutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return (
      <div className="checkout">
        {summary}
        {/* <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.props.ingredients}
              price={this.props.totalPrice}
              {...props}
            />
          )}
        /> redux use below*/}
      </div>
    );
  }
}

//redux
const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
