import {BASE_URL} from '@env';

export const ROUTES = {
  POST_RENEW_TOKEN: `${BASE_URL}/auth/access_token/renew`,
  POST_LOGIN: `${BASE_URL}/auth/login`,
  GET_ALL_POSTS: `${BASE_URL}/post/all`,
  GET_SEARCH_EXPLORE: `${BASE_URL}/explore/all?`,
  GET_ALL_EVENTS: `${BASE_URL}/post/all/event`,
  GET_PERSONAL_CHAT: `${BASE_URL}/chat/personal`,
  GET_PERSONAL_RECENT_CHAT: `${BASE_URL}/chat/recent/personal`,
  GET_GROUP_RECENT_CHAT:`${BASE_URL}/chat/recent/group`,
  GET_USER_PROFILE: `${BASE_URL}/user`,
  GET_EXPLORE_GROUPS: `${BASE_URL}/explore/group`,
  GET_EXPLORE_USERS: `${BASE_URL}/explore/user?`,
  GET_USERS_PROJECTS: `${BASE_URL}/project/all/`,
  GET_MANGABLE_GROUPS: `${BASE_URL}/group/`,
  GET_ALL_USERS: `${BASE_URL}/user/all`,
  GET_GROUP_DETAILS:`${BASE_URL}/group/get`,
  PATCH_LEAVE_GROUP:`${BASE_URL}/group/leave`
};
