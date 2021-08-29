import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { customRender } from "../__utils__/testUtils";

import Messages from "../../components/realtors/messages/Messages";

import realtorReducer from "../__fixtures__/realtorReducer.data";

import merge from "lodash/merge";
import EmailSharpIcon from "@material-ui/icons/EmailSharp";

// Functional tests

let container = null;
const initialState = {};

const openMessageDetails = jest.fn();
const messages = realtorReducer.messages.map((message, i) =>
  merge(message, {
    type: { icon: EmailSharpIcon },
    contact: {
      fullName: `${message.contact.firstname} ${message.contact.lastname}`,
    },
    relativeDate: `10:0${i}`,
    shortBody: message.body.substring(0, 100) + "...",
    isFormatted: true,
  })
);

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.clearAllMocks();
});

const render = (children, options = {}) =>
  customRender(children, container, initialState, options);

test("renders component without crashing", () => {
  act(() => {
    render(<Messages messages={messages} />);
  });
  const messagesElement = container.querySelector(".messages-wrapper");
  expect(messagesElement).not.toBeNull();
});

test("messages data correctly displayed", () => {
  act(() => {
    render(<Messages messages={messages} />);
  });
  const messagesElement = container.querySelector(".messages-wrapper");

  const messageItems = messagesElement.querySelectorAll(".message-item");
  expect(messageItems.length).toBe(realtorReducer.messages.length);

  messageItems.forEach((messageItem, i) => {
    const nameElement = messageItem.querySelector(
      ".message-item-header .message-item-contact .message-item-contact-main"
    );
    const dateElement = messageItem.querySelector(
      ".message-item-header .message-item-date"
    );
    const subjectElement = messageItem.querySelector(
      ".message-item-content .message-item-subject"
    );
    const bodyElement = messageItem.querySelector(
      ".message-item-content .message-item-body"
    );

    expect(nameElement).not.toBeNull();
    expect(dateElement).not.toBeNull();
    expect(subjectElement).not.toBeNull();
    expect(bodyElement).not.toBeNull();

    expect(nameElement.textContent).toBe(
      `${realtorReducer.messages[i].contact.firstname} ${realtorReducer.messages[i].contact.lastname}`
    );
    expect(dateElement.textContent).toBe(`10:0${i}`);
    expect(subjectElement.textContent).toBe(messages[i].subject);
    expect(bodyElement.textContent).toBe(messages[i].shortBody);
  });
});

test("message callback correctly called", () => {
  act(() => {
    render(
      <Messages messages={messages} openMessageDetails={openMessageDetails} />
    );
  });
  const messageItems = container.querySelectorAll(".message-item");

  expect(openMessageDetails).not.toHaveBeenCalled();
  act(() => {
    messageItems[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(openMessageDetails).toHaveBeenCalledWith(messages[1].id);
});
