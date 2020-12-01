import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/Sidedrawer/Sidedrawer";

import { connect } from "react-redux";

//export as an auxilary function hoc, adjacent elements
class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  SideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  toggleMenuHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer,
      };
    });
  };

  render() {
    return (
      <Aux>
        <div>
          <Toolbar
            isAuth={this.props.isAuthenticated}
            toggleMenu={this.toggleMenuHandler}
          />
          <SideDrawer
            isAuth={this.props.isAuthenticated}
            closed={this.SideDrawerClosedHandler}
            open={this.state.showSideDrawer}
          />
          <main className={styles.mainSection}>{this.props.children}</main>
        </div>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
