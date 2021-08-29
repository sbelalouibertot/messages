import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { customRender } from "../__utils__/testUtils";

import MessagesContainer from "../../components/realtors/messages/MessagesContainer";

import messageReducer from "../__fixtures__/messageReducer.data";
import realtorReducer from "../__fixtures__/realtorReducer.data";
import userReducer from "../__fixtures__/userReducer.data";

import { createMemoryHistory } from "history";

// Functional tests

let container = null;
const initialState = {
  messageReducer,
  realtorReducer,
  userReducer,
};

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
    render(<MessagesContainer />);
  });
  const messagesElement = container.querySelector(".messages-wrapper");
  expect(messagesElement).not.toBeNull();
});

test("history update after clicking on message", () => {
  const history = createMemoryHistory();
  const pushSpy = jest.spyOn(history, "push");

  act(() => {
    render(<MessagesContainer />, { history });
  });
  const messageItems = container.querySelectorAll("nav ul li.message-item a");

  realtorReducer.messages.forEach((message, i) => {
    // Message item values
    expect(messageItems[i].href).toBe(
      `http://localhost/realtors/${realtorReducer.id}/messages/${message.id}`
    );
    expect(
      messageItems[i].querySelector("span.message-item-contact-main")
        .textContent
    ).toBe(message.contact.fullName);
    expect(
      messageItems[i].querySelector("span.message-item-contact-secondary")
        .textContent
    ).toBe(`(${message.contact.spacedPhoneNumber})`);
    expect(
      messageItems[i].querySelector("time.message-item-date").textContent
    ).toBe(message.relativeDate);
    expect(
      messageItems[i].querySelector("time.message-item-date").dateTime
    ).toBe(message.date);
    expect(
      messageItems[i].querySelector("section h5.message-item-subject")
        .textContent
    ).toBe(message.subject);
    expect(
      messageItems[i].querySelector("section p.message-item-body").textContent
    ).toBe(message.shortBody);

    // Message action on click
    jest.clearAllMocks();
    expect(pushSpy).not.toHaveBeenCalled();
    act(() => {
      messageItems[i].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(pushSpy).toHaveBeenCalledWith(
      `/realtors/${realtorReducer.id}/messages/${message.id}`
    );
  });
});
