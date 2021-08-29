import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useParams, useHistory } from "react-router-dom";

import { updateMessageDetails } from "../../../redux/actions/message";
import { getUserDetails } from "../../../redux/actions/user";

import MessageDetails from "./MessageDetails";

/**
 * Message details container
 * Process details of a message and pass information to the displayer hook
 */
const MessageDetailsContainer = () => {
  const dispatch = useDispatch();
  const { realtorId, messageId } = useParams();
  const history = useHistory();
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 799px)",
  });

  const currentSelectedRealtor = useSelector((store) => store.realtorReducer);
  const realtors = useSelector((store) => store.userReducer?.details?.realtors);
  const messageDetails = useSelector((store) => store.messageReducer?.details);

  const [formattedMessageDetails, setFormattedMessageDetails] = useState(null);

  useEffect(() => {
    // Realtor message loaded from url
    // After getting results of realtor messages (initial render)
    // or after popping history(back / forward)
    if (
      realtors &&
      currentSelectedRealtor?.messages &&
      messageId &&
      realtorId &&
      history.action === "POP"
    )
      dispatch(
        updateMessageDetails(parseInt(messageId), parseInt(realtorId), {
          onSuccess: () => {
            dispatch(getUserDetails());
          },
        })
      );
  }, [currentSelectedRealtor?.messages, messageId]);

  useEffect(() => {
    if (messageDetails) {
      setFormattedMessageDetails({
        ...messageDetails,
        localeDate: new Date(messageDetails.date).toLocaleString(),
      });
    } else setFormattedMessageDetails(null);
  }, [messageDetails]);

  const goBack = () => history.goBack();

  return (
    <MessageDetails
      {...{
        messageDetails: formattedMessageDetails,
        isSmallScreen,
        goBack,
      }}
    />
  );
};

export default memo(MessageDetailsContainer);
