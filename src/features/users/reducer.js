import { SET_USER, DEL_USER, VERIFY_USER } from "./type";

const initialState = [];

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      const item = action.payload;
      const exists = state.some((f) => f.id === item.id);
      return exists
        ? state.map((f) => (f.id === item.id ? item : f))
        : [...state, item];
    }
    case DEL_USER: {
      const id = action.payload;
      return state.filter((f) => f.id !== id);
    }
    case VERIFY_USER: {
      const id = action.payload;
      return state.map((f) => (f.id === id ? { ...f, verified: true } : f));
    }
    default:
      return state;
  }
}
