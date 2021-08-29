import { actionsConstants } from "../../constants/actions";

const {
  GET_USER_DETAILS_START,
  GET_USER_DETAILS_FULFILLED,
  GET_USER_DETAILS_FAILED,
} = actionsConstants;

const initialState = {
  details: null,
  lastUpdate: null,
  isLoading: false,
  error: null,
};

/**
 * Get user details (e.g related realtors, unread messages)
 * @category Redux/reducers
 */
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      };

    case GET_USER_DETAILS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        details: action.data,
        lastUpdate: new Date(),
      };

    case GET_USER_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.data,
      };

    default:
      return state;
  }
};
