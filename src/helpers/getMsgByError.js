const mapStatusToMsg = {
  404: 'Sorry, but the article does not exist! Try another article ID.',
  default: 'Ooops! Something went wrong! Please, try later.',
}

export const getMsgByError = status => mapStatusToMsg[status] || mapStatusToMsg.default;
