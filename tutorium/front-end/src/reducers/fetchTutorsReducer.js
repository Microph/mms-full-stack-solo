import { FETCH_TUTORS } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_TUTORS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
