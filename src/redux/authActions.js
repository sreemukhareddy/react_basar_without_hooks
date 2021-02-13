import * as apicalls from "../api/apicalls";

export const loginSuccess = (userdata) => {
  localStorage.setItem("user", userdata);
  return {
    type: "login-success",
    payload: userdata,
  };
};

export const onLoginHandler = (credentials) => {
  return (dispatch) => {
    return apicalls.login(credentials).then((response) => {
      dispatch(
        loginSuccess({
          ...response.data,
          password: credentials.password,
        })
      );
      return response;
    });
  };
};

export const onSignUpHandler = (userdata) => {
  return (dispatch) => {
    return apicalls.signUp(userdata).then((response) => {
      //   dispatch(onLoginHandler(userdata));
      //   return response;
      return dispatch(onLoginHandler(userdata));
    });
  };
};
