import { actionsConstants } from "../../constants/actions";

const {
  UPDATE_MESSAGE_DETAILS_START,
  UPDATE_MESSAGE_DETAILS_FULFILLED,
  UPDATE_MESSAGE_DETAILS_FAILED,
} = actionsConstants;

const initialState = {
  details: null,
  lastUpdate: null,
  isLoading: false,
  error: null,
};

/**
 * Get details of a message
 * @category Redux/reducers
 */
export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGE_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_MESSAGE_DETAILS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        details: action.data,
        lastUpdate: new Date(),
      };

    case UPDATE_MESSAGE_DETAILS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.data,
      };

    default:
      return state;
  }
};
