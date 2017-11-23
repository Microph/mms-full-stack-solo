import { FETCH_STUDENTS} from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_STUDENTS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
