const host = 'http://127.0.0.1:8000/';

export const URLS = {
  getTokenUrl: host + 'api-token-auth/',
  refreshTokenUrl: host + 'api-token-refresh/',
  verifyTokenUrl: host + 'api-token-verify/',
  roomsUrl: host + 'rooms/',
  messagesUrl: host + 'messages/',
  currentUserUrl: host + 'current_user/',
  usersUrl: host + 'users/',
};
