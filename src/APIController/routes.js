import {BASE_URL} from '@env';

export const ROUTES = {
  POST_RENEW_TOKEN: `${BASE_URL}/auth/access_token/renew`,
  POST_LOGIN: `${BASE_URL}/auth/login`,
  GET_ALL_POSTS: `${BASE_URL}/post/all`,
  GET_SEARCH_EXPLORE: `${BASE_URL}/explore/all?`,
  GET_ALL_EVENTS: `${BASE_URL}/post/all/event`,
  GET_PERSONAL_CHAT:`${BASE_URL}/chat/personal`,
  GET_PERSONAL_RECENT_CHAT:`${BASE_URL}/chat/recent/personal`,
  GET_GROUP_RECENT_CHAT:`${BASE_URL}/chat/recent/group`,
  GET_USER_PROFILE:`${BASE_URL}/user`,
};
