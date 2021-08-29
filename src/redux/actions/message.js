import { apiService } from "../../utils/utils";
import { actionsConstants } from "../../constants/actions";
import { apiConstants } from "../../constants/api";
import { formatMessage } from "../../utils/utils";
import merge from "lodash/merge";

const {
  UPDATE_MESSAGE_DETAILS_START,
  UPDATE_MESSAGE_DETAILS_FULFILLED,
  UPDATE_MESSAGE_DETAILS_FAILED,
  UPDATE_REALTOR_MESSAGE_READ_STATUS,
} = actionsConstants;

const { UPDATE_MESSAGE_DETAILS } = apiConstants;

/**
 * Get details of a message
 * @category Redux/actions
 */
export const updateMessageDetails =
  (messageId, realtorId, { onSuccess } = {}) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_MESSAGE_DETAILS_START });

      if (messageId) {
        const messageDetails = getState().realtorReducer.messages?.find(
          (message) => message.id === messageId
        );
        const readMessage = (
          await apiService(
            UPDATE_MESSAGE_DETAILS(realtorId, messageId),
            "PATCH",
            { read: true }
          )
        ).data;

        dispatch({
          type: UPDATE_REALTOR_MESSAGE_READ_STATUS,
          messageId,
          data: readMessage,
        });

        dispatch({
          type: UPDATE_MESSAGE_DETAILS_FULFILLED,
          data: messageDetails
            ? readMessage
            : merge(readMessage, formatMessage(readMessage)),
        });

        onSuccess?.();
      } else
        dispatch({
          type: UPDATE_MESSAGE_DETAILS_FULFILLED,
          data: null,
        });
    } catch (error) {
      console.error(error);
      dispatch({ type: UPDATE_MESSAGE_DETAILS_FAILED, data: error });
    }
  };
