import { formatMessage, getMessageIcon, message } from "../../utils/utils";
import DraftsSharpIcon from "@material-ui/icons/DraftsSharp";
import EmailSharpIcon from "@material-ui/icons/EmailSharp";
import TextsmsSharpIcon from "@material-ui/icons/TextsmsSharp";
import PhoneSharpIcon from "@material-ui/icons/PhoneSharp";

// Unit tests

test("getMessageIcon", () => {
  expect(getMessageIcon("sms", true)).toBe(TextsmsSharpIcon);
  expect(getMessageIcon("sms", false)).toBe(TextsmsSharpIcon);
  expect(getMessageIcon("phone", false)).toBe(PhoneSharpIcon);
  expect(getMessageIcon("phone", true)).toBe(PhoneSharpIcon);
  expect(getMessageIcon("email", true)).toBe(DraftsSharpIcon);
  expect(getMessageIcon("email", false)).toBe(EmailSharpIcon);
  expect(getMessageIcon("unknown", false)).toBe(EmailSharpIcon);
  expect(getMessageIcon("unknown", true)).toBe(EmailSharpIcon);
});

test("formatMessage", () => {
  expect(
    formatMessage({
      body: "Lorem Ipsum #10193 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      contact: {
        email: "jbrown@gmail.com",
        firstname: "James",
        lastname: "Brown",
        phone: "0629275944",
      },
      date: "2021-08-27T16:10:39.692577",
      id: 10193,
      read: true,
      subject: "Email #10193",
      type: "email",
    })
  ).toStrictEqual({
    type: {
      icon: expect.any(Object), // Because it is related to behaviour of getMessageIcon function
    },
    contact: { fullName: "James Brown", spacedPhoneNumber: "06 29 27 59 44" },
    relativeDate: "16:10",
    shortBody: `Lorem Ipsum #10193 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since t...`,
    isFormatted: true,
  });
});

test("formatMessage (already formatted, with short body)", () => {
  const relativeDate = "16:55";
  expect(
    formatMessage({
      body: "Lorem Ipsum #10193",
      contact: {
        email: "jbrown@gmail.com",
        firstname: "James",
        lastname: "Brown",
        phone: "0629275944",
      },
      date: "2021-08-27T16:10:39.692577",
      id: 10193,
      read: true,
      subject: "Email #10193",
      type: "email",
      relativeDate,
      isFormatted: true,
    })
  ).toStrictEqual({
    type: {
      icon: DraftsSharpIcon,
    },
    contact: { fullName: "James Brown", spacedPhoneNumber: "06 29 27 59 44" },
    relativeDate: "16:10",
    shortBody: "Lorem Ipsum #10193...",
    isFormatted: true,
    relativeDate,
  });
});
