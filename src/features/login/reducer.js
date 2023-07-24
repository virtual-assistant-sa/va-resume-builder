import { SWITCH_USER } from "./type";

const initialState = { user: undefined };

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_USER: {
      return { user: action.payload };
    }
    default:
      return state;
  }
};

export default loginReducer;
