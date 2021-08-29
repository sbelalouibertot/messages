import EmailSharpIcon from "@material-ui/icons/EmailSharp";

const messageReducer = {
  details: {
    body: "Lorem Ipsum #10280 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    contact: {
      email: "rthomas@gmail.com",
      firstname: "Richard",
      lastname: "Thomas",
      phone: "0629847259",
      fullName: "Richard Thomas",
      spacedPhoneNumber: "06 29 84 72 59",
    },
    date: "2021-08-05T16:10:39.693197",
    id: 10280,
    read: true,
    subject: "Email #10280",
    type: {
      icon: EmailSharpIcon,
      compare: null,
    },
    relativeDate: "8/5/2021",
    shortBody:
      "Lorem Ipsum #10280 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since t...",
    isFormatted: true,
    selected: false,
  },
  lastUpdate: "2021-08-27T17:00:36.578Z",
  isLoading: false,
  error: null,
};

export default messageReducer;
