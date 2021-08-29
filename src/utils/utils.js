import axios from "axios";
import DraftsSharpIcon from "@material-ui/icons/DraftsSharp";
import EmailSharpIcon from "@material-ui/icons/EmailSharp";
import TextsmsSharpIcon from "@material-ui/icons/TextsmsSharp";
import PhoneSharpIcon from "@material-ui/icons/PhoneSharp";

/**
 * API fetching generic method
 * @category utils
 * @see https://github.com/axios/axios
 * @param  {string} url url to fetch
 * @param  {string} method request method
 * @param  {} data request body, only for POST, PUT, DELETE, PATCH
 * @param  {string} responseType type of data in the response
 * @param  {number} timeout in miliseconds
 * @param  {} params url parameters to be sent with the request
 */
const apiService = (
  url,
  method = "GET",
  data,
  responseType = "json",
  timeout = 0,
  params = null
) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Acces-Control-Allow-Origin": "*",
  };

  url = url.replace(",", "%3A"); // TODO : Fix EncodeURIComponent issue

  return axios({
    method,
    url,
    //headers, //TODO : Fix CORS issue and remove comment
    data,
    responseType,
    timeout,
    params,
  });
};

const getMessageIcon = (type, isRead) => {
  switch (type) {
    case "email":
      return isRead ? DraftsSharpIcon : EmailSharpIcon;
    case "sms":
      return TextsmsSharpIcon;
    case "phone":
      return PhoneSharpIcon;
    default:
      return EmailSharpIcon;
  }
};

const getRelativeDate = (inputDate) => {
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  const date = typeof inputDate === "string" ? new Date(inputDate) : inputDate;
  const now = new Date();
  const diffTimeMs = Math.abs(date - now);
  const diffDays = Math.ceil(diffTimeMs / (1000 * 60 * 60 * 24)) - 1;

  if (diffDays >= 0 && diffDays <= 1) {
    return `${date.getHours()}:${date.getMinutes()}`;
  } else if (diffDays >= 2 && diffDays <= 7) {
    return days[date.getDay()];
  } else return date.toLocaleDateString();
};

const formatMessage = (message) => ({
  type: { icon: getMessageIcon(message.type, message.read) },
  contact: {
    fullName: `${message.contact.firstname} ${message.contact.lastname}`,
    spacedPhoneNumber: message.contact.phone.match(/.{1,2}/g).join(" "),
  },
  relativeDate: message.isFormatted
    ? message.relativeDate
    : getRelativeDate(message.date),
  shortBody: message.body.substring(0, 150) + "...",
  isFormatted: true,
});

export { apiService, getMessageIcon, getRelativeDate, formatMessage };
