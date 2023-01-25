import { SET_JOB, DEL_JOB } from "./type";

const initialState = [];

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case SET_JOB: {
      const item = action.payload;
      const exists = state.some((f) => f.id === item.id);
      return exists
        ? state.map((f) => (f.id === item.id ? item : f))
        : [...state, item];
    }
    case DEL_JOB: {
      const { id } = action.payload;
      return state.filter((f) => f.id !== id);
    }
    default:
      return state;
  }
}
