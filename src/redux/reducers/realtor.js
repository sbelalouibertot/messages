import { actionsConstants } from "../../constants/actions";

const {
  UPDATE_REALTOR_START,
  UPDATE_REALTOR_FULFILLED,
  UPDATE_REALTOR_FAILED,
  GET_REALTOR_MESSAGES_START,
  GET_REALTOR_MESSAGES_FULFILLED,
  GET_REALTOR_MESSAGES_FAILED,
  UPDATE_REALTOR_MESSAGE_READ_STATUS,
} = actionsConstants;

const initialState = {
  id: null,
  messages: null,
  lastUpdate: null,
  isLoading: false,
  error: null,
};

/**
 * Update current selected realotr
 * Get realtor messages
 * @category Redux/reducers
 */
export const realtorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REALTOR_START:
    case GET_REALTOR_MESSAGES_START:
      return {
        ...state,
        isLoading: true,
      };

    case UPDATE_REALTOR_FULFILLED:
      return {
        ...state,
        isLoading: false,
        id: action.data,
        lastUpdate: new Date(),
      };

    case GET_REALTOR_MESSAGES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        messages: action.isNextPageData
          ? state.messages.concat(action.data)
          : action.data,
        lastUpdate: new Date(),
      };

    case UPDATE_REALTOR_MESSAGE_READ_STATUS:
      const messageIndex = state.messages.findIndex(
        (message) => message.id === action.messageId
      );
      state.messages[messageIndex] = action.data;
      return {
        ...state,
        isLoading: false,
        lastUpdate: new Date(),
      };

    case UPDATE_REALTOR_FAILED:
    case GET_REALTOR_MESSAGES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.data,
      };

    default:
      return state;
  }
};
