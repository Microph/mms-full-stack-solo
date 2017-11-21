import { combineReducers } from "redux";
import authReducer from "./authReducer";
import fetchStudentsReducer from "./fetchStudentsReducer";
import fetchTutorsReducer from "./fetchTutorsReducer";

export default combineReducers({
  auth: authReducer,
  students: fetchStudentsReducer,
  tutors: fetchTutorsReducer
});
