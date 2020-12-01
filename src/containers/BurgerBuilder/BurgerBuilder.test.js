import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BurgerBuilder";
import BuilderController from "../../components/Burger/BuilderController/BuilderController";

//connect enzyme: allow to render only needed component for testing
configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });
  //afterEach() cleanup
  //your actual test

  it("WHEN - Receiving Ingredients: Should render BuilderController", () => {
    wrapper.setProps({ ingredients: { salad: 1 } });

    expect(wrapper.find(BuilderController)).toHaveLength(1);
  });
});
