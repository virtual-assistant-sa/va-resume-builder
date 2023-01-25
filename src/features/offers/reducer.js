import { SET_OFFER, DEL_OFFER, CANCEL_OFFER } from "./type";

const initialState = [];

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case SET_OFFER: {
      const item = action.payload;
      const exists = state.some((f) => f.id === item.id);
      return exists
        ? state.map((f) => (f.id === item.id ? item : f))
        : [...state, item];
    }
    case DEL_OFFER: {
      const { id } = action.payload;
      return state.filter((f) => f.id !== id);
    }
    case CANCEL_OFFER: {
      const { JobId, UserId } = action.payload;
      return state.filter((f) => {
        return !(f.JobId === JobId && f.UserId === UserId);
      });
    }
    default:
      return state;
  }
}
