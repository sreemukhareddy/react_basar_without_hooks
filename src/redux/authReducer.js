const initialState = {
  id: 0,
  username: "",
  password: "",
  displayName: "",
  image: "",
  isLoggedIn: false,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "logout-success": {
      console.log("logout");
      return {
        ...initialState,
        loading: false,
      };
    }

    case "login-success": {
      console.log(" dispatch login success", action.payload);
      return {
        ...action.payload,
        loading: true,
        isLoggedIn: true,
      };
    }

    case "update-success": {
      console.log("coming from the update-success reducer");
      return {
        ...state,
        displayName: action.payload.displayName,
        image: action.payload.image,
      };
    }

    default:
      return state;
  }
};

export default reducer;
