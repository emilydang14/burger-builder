import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../ultility";
export const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
  });
};

const authSetRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path,
  });
};

export const authReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(currentState, action);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(currentState, action);
    case actionTypes.AUTH_FAIL:
      return authFail(currentState, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(currentState, action);
    case actionTypes.AUTH_SET_REDIRECT_PATH:
      return authSetRedirectPath(currentState, action);
    default:
      return currentState;
  }
};
