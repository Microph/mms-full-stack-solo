import axios from "axios";
import { FETCH_USER, FETCH_STUDENTS } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current-login-session");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchStudents = () => async dispatch => {
  const res = await axios.get("/api/search/student");

  dispatch({ type: FETCH_STUDENTS, payload: res.data });
}

export const fetchTutors = () => async dispatch => {
  const res = await axios.get("/api/search/tutor");

  dispatch({ type: FETCH_STUDENTS, payload: res.data });
}