import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { customRender } from "../__utils__/testUtils";

import MessageDetailsContainer from "../../components/realtors/message-details/MessageDetailsContainer";

import messageReducer from "../__fixtures__/messageReducer.data";
import realtorReducer from "../__fixtures__/realtorReducer.data";
import userReducer from "../__fixtures__/userReducer.data";

// Functional tests

let container = null;
const initialState = {
  messageReducer,
  realtorReducer,
  userReducer,
};
const messageDetails = {
  ...messageReducer.details,
  localeDate: new Date(messageReducer.details.date).toLocaleString(),
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
    render(<MessageDetailsContainer />);
  });
  const messagesDetailsElement = container.querySelector(
    ".message-details-wrapper"
  );
  expect(messagesDetailsElement).not.toBeNull();
});

test("should display a selection message if no data", () => {
  act(() => {
    render(<MessageDetailsContainer />, {
      customState: {
        messageReducer: null,
        realtorReducer,
        userReducer,
      },
    });
  });

  const messagesDetailsElement = container.querySelector(
    ".message-details-wrapper"
  );
  expect(messagesDetailsElement).not.toBeNull();
  expect(messagesDetailsElement.textContent).toBe("Sélectionnez un message");
});

test("data correctly displayed", () => {
  act(() => {
    render(<MessageDetailsContainer />);
  });
  const messagesDetailsElement = container.querySelector(
    ".message-details-wrapper"
  );

  const contactNameElement = messagesDetailsElement.querySelector(
    ".message-details-contact .message-details-contact-header .message-details-name"
  );
  const contactAttributesElements = messagesDetailsElement.querySelectorAll(
    ".message-details-contact .message-details-contact-information .message-details-contact-attributes h5"
  );
  const contactValuesElements = messagesDetailsElement.querySelectorAll(
    ".message-details-contact .message-details-contact-information .message-details-contact-data a"
  );

  const contentNameElement = messagesDetailsElement.querySelector(
    ".message-details-content .message-details-content-metadata .message-details-name"
  );
  const contentDateElement = messagesDetailsElement.querySelector(
    ".message-details-content .message-details-content-metadata .message-details-content-date"
  );
  const contentBodyElement = messagesDetailsElement.querySelector(
    ".message-details-content p"
  );

  expect(contactNameElement).not.toBeNull();
  expect(contactAttributesElements).not.toBeNull();
  expect(contactValuesElements).not.toBeNull();
  expect(contentNameElement).not.toBeNull();
  expect(contentDateElement).not.toBeNull();
  expect(contentBodyElement).not.toBeNull();

  expect(contactNameElement.textContent).toBe(
    `${messageReducer.details.contact.firstname} ${messageReducer.details.contact.lastname}`
  );

  expect(contactAttributesElements[0].textContent).toBe("Email");
  expect(contactAttributesElements[1].textContent).toBe("Téléphone");

  expect(contactValuesElements[0].textContent).toBe(
    messageReducer.details.contact.email
  );
  expect(contactValuesElements[1].textContent).toBe(
    messageReducer.details.contact.spacedPhoneNumber
  );

  expect(contentNameElement.textContent).toBe(
    `${messageReducer.details.contact.firstname} ${messageReducer.details.contact.lastname}`
  );
  expect(contentDateElement.textContent).toBe(messageDetails.localeDate);
  expect(contentBodyElement.textContent).toBe(messageReducer.details.body);
});
