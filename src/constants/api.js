const MA_REALTORS_ENDPOINT = "http://localhost:8080";

export const apiConstants = {
  UPDATE_MESSAGE_DETAILS: (realtorId, messageId) =>
    `${MA_REALTORS_ENDPOINT}/realtors/${realtorId}/messages/${messageId}`,
  GET_REALTOR_MESSAGES: (realtorId, page, pageSize) =>
    `${MA_REALTORS_ENDPOINT}/realtors/${realtorId}/messages?sort=date,desc&page=${page}&page_size=${pageSize}`,
  GET_USER_DETAILS: () => `${MA_REALTORS_ENDPOINT}/realtors`,
};
