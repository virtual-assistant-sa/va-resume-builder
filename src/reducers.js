import { combineReducers } from "redux";
import login from "./features/login/reducer";
import users from "./features/users/reducer";
import jobs from "./features/jobs/reducer";
import offers from "./features/offers/reducer";

const rootReducer = combineReducers({
  login,
  users,
  jobs,
  offers,
});

export default rootReducer;
