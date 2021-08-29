import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { customRender } from "../__utils__/testUtils";

import Header from "../../components/header/Header";

import realtorReducer from "../__fixtures__/realtorReducer.data";
import userReducer from "../__fixtures__/userReducer.data";

// Functional tests

let container = null;
const initialState = {};

const onRealtorSelectChange = jest.fn();

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

jest.mock("../../../public/assets/mail-ios.png", () => ({
  default: null,
}));

test("renders component without crashing with no props. no message counter is displayed", () => {
  act(() => {
    render(<Header />);
  });
  const headerElement = container.querySelector("header.app-header");
  expect(headerElement).not.toBeNull();
  expect(headerElement.querySelector("span.unread-message-counter")).toBeNull();
});

test("renders component without crashing with realtors loaded and currentRealtor", () => {
  act(() => {
    render(
      <Header
        realtors={userReducer.details.realtors}
        currentRealtor={realtorReducer}
      />
    );
  });
  const headerElement = container.querySelector("header.app-header");
  expect(headerElement).not.toBeNull();
});

test("correct information displayed : unread messages, selected realtor and other realtor", () => {
  const currentRealtor = userReducer.details.realtors.find(
    (realtor) => realtor.id === realtorReducer.id
  );
  act(() => {
    render(
      <Header
        realtors={userReducer.details.realtors}
        currentRealtor={currentRealtor}
      />
    );
  });
  const headerElement = container.querySelector("header.app-header");

  expect(
    headerElement.querySelector(".unread-message-counter data").textContent
  ).toBe(currentRealtor.unread_messages.toString());

  const realtorsOptions = headerElement.querySelectorAll("nav select option");

  userReducer.details.realtors.forEach((realtor, i) => {
    expect(realtorsOptions[i].textContent).toBe(realtor.name);

    if (realtor.id === currentRealtor.id)
      expect(realtorsOptions[i].selected).toBe(true);
    else expect(realtorsOptions[i].selected).toBe(false);
  });
});
