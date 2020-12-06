import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { checkValidity } from "../../shared/validation";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  componentDidMount() {
    !this.props.buildingBurger &&
      this.props.authRedirectPath !== "/" &&
      this.props.onAuthSetRedirectPath();
  }

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };
  formSubmitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };
  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = null;
    this.props.loading
      ? (form = <Spinner />)
      : (form = formElementArray.map((formElement) => {
          const label = formElement.id;
          return (
            <Input
              label={label.toUpperCase()}
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              inValid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(e) => this.inputChangeHandler(e, formElement.id)}
            />
          );
        }));
    let errorMessage = null;
    if (this.props.error) {
      this.props.error.message === ("INVALID_PASSWORD" || "EMAIL_NOT_FOUND")
        ? (errorMessage = <p>Your email or password is incorrect</p>)
        : (errorMessage = <p>{this.props.error.message}</p>);
    }
    return (
      <div className={classes.Auth}>
        {this.props.isAuthenticated && (
          <Redirect to={this.props.authRedirectPath} />
        )}
        {errorMessage}
        <form onSubmit={this.formSubmitHandler}>
          {form}
          <Button btnType="Success" disabled={false}>
            {this.state.isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Button
            click={this.switchAuthModeHandler}
            btnType="Danger"
            disabled={false}
          >
            Switch to {this.state.isSignup ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, passoword, isSignup) =>
      dispatch(actions.auth(email, passoword, isSignup)),
    onAuthSetRedirectPath: () => dispatch(actions.authSetRedirectPath("/")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
