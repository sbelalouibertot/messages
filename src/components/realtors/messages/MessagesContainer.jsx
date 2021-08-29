import React, { useEffect, useState, memo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";

import { updateMessageDetails } from "../../../redux/actions/message";
import { getUserDetails } from "../../../redux/actions/user";
import { getRealtorMessages } from "../../../redux/actions/realtor";
import { updateRealtor } from "../../../redux/actions/realtor";

import { formatMessage } from "../../../utils/utils";
import merge from "lodash/merge";

import Messages from "./Messages";

/**
 * Messages container
 * Process messages and pass information to the displayer hook
 */
const MessagesContainer = () => {
  const dispatch = useDispatch();
  const { realtorId } = useParams();
  const history = useHistory();
  const messagesListRef = useRef(null);
  const selectedMessageRef = useRef(null);

  const realtor = useSelector((store) => store.realtorReducer);
  const realtors = useSelector((store) => store.userReducer?.details?.realtors);
  const messageDetailsId = useSelector(
    (store) => store.messageReducer?.details?.id
  );

  const [page, setPage] = useState(1);
  const [formattedMessage, setFormattedMessages] = useState(null);

  useEffect(() => {
    messagesListRef?.current?.addEventListener("scroll", handleScroll);
    return () => {
      messagesListRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Realtor loaded from url and different from previous one (if exists)
    // After receiving realtors from apis
    if (
      realtorId &&
      realtorId !== realtor?.id &&
      history.action === "POP" &&
      realtors
    )
      dispatch(updateRealtor(parseInt(realtorId)));
  }, [realtors]);

  useEffect(() => {
    // Update realtor's messages formats when realtor changes
    if (realtor.messages) {
      setFormattedMessages(
        realtor.messages.map((message) =>
          merge(message, {
            ...formatMessage(message),
            selected: message.id === messageDetailsId,
          })
        )
      );
    }
  }, [realtor.lastUpdate]);

  useEffect(() => {
    // If realtor changes and no message id is specified, then scroll to the top
    if (!messageDetailsId) {
      setPage(1);
      messagesListRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [realtor.id]);

  useEffect(() => {
    // Update selected status of message if current selected message changed
    if (messageDetailsId) {
      setFormattedMessages(
        realtor.messages.map((message) => ({
          ...message,
          selected: message.id === messageDetailsId,
        }))
      );
    }
  }, [messageDetailsId]);

  useEffect(() => {
    // Auto scroll to selected message
    if (selectedMessageRef?.current) {
      selectedMessageRef.current.scrollIntoView({
        behavior: "smooth",
      });
      selectedMessageRef.current = null;
    }
  }, [selectedMessageRef.current]);

  useEffect(() => {
    // If page number increases (= if the user scrolls down at the end of the first page results)
    // Then results of next page are requested
    if (page > 1) {
      dispatch(
        getRealtorMessages(realtor?.id, {
          page,
        })
      );
    }
  }, [page]);

  const openMessageDetails = (messageId) =>
    dispatch(
      updateMessageDetails(messageId, realtor?.id, {
        onSuccess: () => {
          dispatch(getUserDetails());
        },
      })
    );

  const handleScroll = () => {
    const bottom =
      messagesListRef.current.scrollTop >=
      messagesListRef.current.scrollHeight -
        messagesListRef.current.clientHeight -
        1;

    if (bottom) setPage((previousPage) => previousPage + 1);
  };

  return (
    <Messages
      {...{
        messages: formattedMessage,
        openMessageDetails,
        realtorId: realtor?.id,
        selectedMessageRef,
      }}
      ref={messagesListRef}
    />
  );
};

MessagesContainer.propTypes = {};

export default memo(MessagesContainer);
