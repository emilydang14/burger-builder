import { authReducer, initialState } from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("Auth Reducer", () => {
  it("Should return initial state", () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it("Should store token upon login", () => {
    expect(
      authReducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        token: "someRandomTOken",
        userId: "someUserID",
      })
    ).toEqual({
      token: "someRandomTOken",
      userId: "someUserID",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
