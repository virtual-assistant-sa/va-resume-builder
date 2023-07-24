import { combineReducers } from "redux";
import login from "./login/reducer";
import users from "./users/reducer";
import jobs from "./jobs/reducer";
import offers from "./offers/reducer";

const rootReducer = combineReducers({
  login,
  users,
  jobs,
  offers,
});

export default rootReducer;
