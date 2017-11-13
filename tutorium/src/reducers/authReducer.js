export const types = {
  FETCH_USER: "FETCH_USER"
};

export const actionCreators = {
  fetchUser: user => {
    return { type: types.FETCH_USER, payload: user };
  }
};

const initialState = {
  auth: false
};

export const reducer = (state = initialState, action) => {
  const { auth } = state;
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_USER: {
      return {
        ...state,
        auth: [payload, ...auth]
      };
    }
    default: {
      return {
        ...state,
        auth: [payload, ...auth]
      };
    }
  }

  //   return state;
};
