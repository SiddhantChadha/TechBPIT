import {BASE_URL} from '@env';

export const ROUTES = {
  POST_RENEW_TOKEN: `${BASE_URL}/auth/access_token/renew`,
  POST_LOGIN: `${BASE_URL}/auth/login`,
  GET_ALL_POSTS: `${BASE_URL}/post/all`,
  GET_SEARCH_EXPLORE: `${BASE_URL}/explore/all?`,
};
