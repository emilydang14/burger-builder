import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavItem from "./NavigationItem/NavigationItem";

//connect enzyme: allow to render only needed component for testing
configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  //afterEach() cleanup
  //your actual test

  it("IF AUTHENTICATED: Should render  <NavItem> Log Out </NavItem>  ", () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.contains(<NavItem link="/logout">Log out</NavItem>)).toEqual(
      true
    );
  });

  it("IF AUTHENTICATED: Should render 3 <NavItem /> elements ", () => {
    //testing logic
    //1st solution: wrapper = shallow(<NavigationItems isAuth />);
    //2nd solution
    wrapper.setProps({ isAuth: true });
    //our expectation
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });

  it("IF NOT AUTHENTICATED: Should render 2 <NavItem /> elements ", () => {
    //testing logic
    wrapper = shallow(<NavigationItems />);

    //our expectation
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });
});
