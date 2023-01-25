import { SWITCH_USER } from "./type";

export const switchUser = (user) => ({
  type: SWITCH_USER,
  payload: user,
});
