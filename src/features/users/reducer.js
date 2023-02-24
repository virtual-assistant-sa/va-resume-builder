import { SET_USER, DEL_USER, SWITCH_USER, VERIFY_USER } from "./type";
import { uniqueItems } from "../../utils/array";

const initialState = { recent: [], active: undefined };

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      const item = action.payload;
      const exists = state.recent.some((f) => f.id === item.id);
      const recent = exists
        ? state.recent.map((f) => (f.id === item.id ? { ...f, ...item } : f))
        : [...state, item];
      return { ...state, recent };
    }
    case DEL_USER: {
      const id = action.payload;
      const recent = state.recent.filter((f) => f.id !== id);
      return { ...state, recent };
    }
    case SWITCH_USER: {
      const active = action.payload;
      const id = active?.id;
      const others = state.recent.filter((v) => v.id !== id);
      const recent = uniqueItems(active ? [active, ...others] : others);
      return { recent, active };
    }
    case VERIFY_USER: {
      const id = action.payload;
      const active = state.active;
      const recent = state.recent.map((f) =>
        f.id === id ? { ...f, profile: { ...f.profile, verified: true } } : f
      );
      return { recent, active };
    }
    default:
      return state;
  }
}
