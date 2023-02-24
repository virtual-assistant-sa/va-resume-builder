import { SET_USER, DEL_USER, SWITCH_USER, VERIFY_USER } from "./type";

export const setUser = (payload) => {
  console.log("setUser", payload);
  return {
    type: SET_USER,
    payload,
  };
};

export const delUser = (payload) => ({
  type: DEL_USER,
  payload,
});

export const switchUser = (user) => ({
  type: SWITCH_USER,
  payload: user,
});

export const verifyUser = (id) => ({
  type: VERIFY_USER,
  payload: id,
});
