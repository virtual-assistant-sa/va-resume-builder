import { SET_USER, DEL_USER, VERIFY_USER } from "./type";

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});
export const delUser = (payload) => ({
  type: DEL_USER,
  payload,
});
export const verifyUser = ({ id }) => ({
  type: VERIFY_USER,
  payload: id,
});
