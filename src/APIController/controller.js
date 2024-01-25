import {REST_COMMANDS} from './RestCommands';

import {ROUTES} from './routes';
import {
  setAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setSelfId,
} from '../EncryptedStorageHelper';
let setIsLoggedIn = null;
export function loggedInStateSetter(setIsLoggedIna) {
  setIsLoggedIn = setIsLoggedIna;
}

export async function execute(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  switch (command) {
    case REST_COMMANDS.REQ_GET_ALL_POSTS:
      await getAllPosts(command, request, onResponseReceived, onResponseFailed);
      break;
    case REST_COMMANDS.REQ_POST_LOGIN:
      await postLoginRequest(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_POST_SIGNUP:
      await postSignupRequest(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_POST_VERIFY_OTP:
      await postOtpVerifyRequest(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
    case REST_COMMANDS.REQ_GET_SEARCH_EXPLORE:
      await getSearchedExplore(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_GET_ALL_EVENTS:
      await getAllEvents(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_GET_PERSONAL_CHAT:
      await getPersonalChat(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_GET_PERSONAL_RECENT_CHAT:
      await getPersonalRecentChat(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_GET_USER_PROFILE:
      await getUserProfile(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_GET_EXPLORE_GROUPS:
      await getExploreGropus(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_GET_EXPLORE_USERS:
      await getExploreUsers(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_GET_USERS_PROJECT:
      await getUsersProjects(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_GET_MANAGEABLE_GROUPS:
      await getManageableGroups(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_GET_ALL_USERS:
      await getAllUsers(command, request, onResponseReceived, onResponseFailed);
      break;
    case REST_COMMANDS.REQ_GET_GROUP_RECENT_CHAT:
      await getGroupRecentChat(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_GET_GROUP_DETAILS:
      await getGroupDetails(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_PATCH_LEAVE_GROUP:
      await leaveGroup(command, request, onResponseReceived, onResponseFailed);
      break;

    case REST_COMMANDS.REQ_POST_JOIN_GROUP:
      await joinGroup(command, request, onResponseReceived, onResponseFailed);
      break;

    case REST_COMMANDS.REQ_POST_CREATE_COLLABORATION_PROJECT:
      await createCollaborationProject(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );

    case REST_COMMANDS.REQ_GET_COLLABORATION_PROJECTS:
      await getCollaborationProjects(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;

    case REST_COMMANDS.REQ_GET_COLLABORATION_PROJECT:
      await getCollaborationProject(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;

    case REST_COMMANDS.REQ_DELETE_COLLABORATION_PROJECT:
      await deleteCollaborationProject(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_PATCH_COLLABORATION_PROJECT:
      await updateCollaborationProject(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;

    case REST_COMMANDS.REQ_DELETE_POST:
      await deletePost(command, request, onResponseReceived, onResponseFailed);
      break;
    case REST_COMMANDS.REQ_DELETE_PROJECT:
      await deleteProject(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_POST_CREATE_PROJECT:
      await createProject(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;

    case REST_COMMANDS.REQ_POST_CREATE_POST:
      await createPost(command, request, onResponseReceived, onResponseFailed);
      break;

    case REST_COMMANDS.REQ_GET_ALL_COLLABORATION_PROJECTS:
      await getAllCollaborationProjects(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;

    case REST_COMMANDS.REQ_PATCH_UPDATE_POST:
      await updatePost(command, request, onResponseReceived, onResponseFailed);
      break;
    case REST_COMMANDS.REQ_PATCH_UPDATE_PROFILE:
      await updateProfile(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_PATCH_UPDATE_PROJECT:
      await updateProject(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    case REST_COMMANDS.REQ_GET_GROUP_CHAT:
      await getGroupChat(
        command,
        request,
        onResponseReceived,
        onResponseFailed,
      );
      break;
    default:
      break;
  }
}
async function basicResponseHandler(
  command,
  response,
  onResponseReceived,
  onResponseFailed,
) {
  console.log('called', response.status);
  if (response.ok) {
    const data = await response.json();
    onResponseReceived(command, data);
  } else if (response.status === 401) {
    await postRefreshToken(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } else {
    onResponseFailed(command, response);
  }
}
let refreshTokenPromise = Promise.resolve();
async function postRefreshToken(
  command,
  responseData,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    await refreshTokenPromise;

    let refresh_token = await getRefreshToken();
    let access_token = await getAccessToken();
    if (refresh_token == null) {
      refreshTokenPromise = Promise.resolve();
      return;
    }
    //not working because of null header in responseData
    // if (
    //   access_token !== null &&
    //   access_token !== responseData.headers.get('authorization')
    // ) {
    //   console.log('fuck', access_token, '  ', responseData);
    //   execute(command, responseData.body, onResponseReceived, onResponseFailed);
    //   refreshTokenPromise = Promise.resolve();
    //   return;
    // }
    const response = await fetch(ROUTES.POST_RENEW_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: refresh_token,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      await setAccessToken(data.access_token);
      execute(command, responseData.body, onResponseReceived, onResponseFailed);
    }
    if (response.status === 401) {
      await setAuthTokens(null, null);
      await setSelfId(null);
      setIsLoggedIn(false);
    }
    refreshTokenPromise = Promise.resolve();
  } catch (error) {
    refreshTokenPromise = Promise.reject(error);
  }
}
// {"email":"chunmay@gmail.com","password":"123456","username":"chkmnay"}

async function postLoginRequest(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.POST_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    console.log('await response.json()');

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    console.log(error);
    onResponseFailed(error);
  }
}
async function postSignupRequest(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.POST_SIGNUP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    console.log('await response.json()');

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    console.log(error);
    onResponseFailed(error);
  }
}

async function postOtpVerifyRequest(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.POST_VERIFY_OTP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    console.log('await response.json()');

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    console.log(error);
    onResponseFailed(error);
  }
}
async function getAllPosts(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.GET_ALL_POSTS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}
async function getAllEvents(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.GET_ALL_EVENTS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}
async function getSearchedExplore(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(
      ROUTES.GET_SEARCH_EXPLORE +
        new URLSearchParams({search: request.searchString}),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      },
    );

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    console.log(error);
    onResponseFailed(command, error);
  }
}

async function getPersonalChat(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(`${ROUTES.GET_PERSONAL_CHAT}/${request.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function getPersonalRecentChat(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.GET_PERSONAL_RECENT_CHAT, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function getUserProfile(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(`${ROUTES.GET_USER_PROFILE}/${request.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}
async function getExploreGropus(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.GET_EXPLORE_GROUPS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    console.log(error);
    onResponseFailed(command, error);
  }
}

async function getExploreUsers(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(
      ROUTES.GET_EXPLORE_USERS + new URLSearchParams({count: request.count}),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      },
    );

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    console.log(error);
    onResponseFailed(command, error);
  }
}

async function getUsersProjects(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.GET_USERS_PROJECTS + request.id, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    console.log(error);
    onResponseFailed(command, error);
  }
}

async function getManageableGroups(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.GET_MANGABLE_GROUPS + request.id, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    console.log(error);
    onResponseFailed(command, error);
  }
}
async function getAllUsers(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.GET_ALL_USERS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    console.log(error);
    onResponseFailed(command, error);
  }
}
async function getGroupDetails(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(`${ROUTES.GET_GROUP_DETAILS}/${request.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}
async function getGroupRecentChat(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.GET_GROUP_RECENT_CHAT, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function leaveGroup(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(`${ROUTES.PATCH_LEAVE_GROUP}/${request.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function joinGroup(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.POST_JOIN_GROUP, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({groupId: request.id}),
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function createCollaborationProject(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.POST_CREATE_COLLABORATION_PROJECT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(request),
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function getCollaborationProjects(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.GET_COLLABORATION_PROJECTS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function getCollaborationProject(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(
      `${ROUTES.GET_COLLABORATION_PROJECT}/${request.id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      },
    );

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function deleteCollaborationProject(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(
      `${ROUTES.DELETE_COLLABORATION_PROJECT}/${request.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      },
    );

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function updateCollaborationProject(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const {id, ...body} = request;
    const response = await fetch(
      `${ROUTES.PATCH_COLLABORATION_PROJECT}/${id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(body),
      },
    );

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function deletePost(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(`${ROUTES.DELETE_POST}/${request.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function createProject(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.POST_CREATE_PROJECT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(request),
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function deleteProject(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(`${ROUTES.DELETE_PROJECT}/${request.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function createPost(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(ROUTES.POST_CREATE_POST, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({post: request}),
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function getAllCollaborationProjects(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(
      `${ROUTES.GET_ALL_COLLABORATION_PROJECTS}/${request.id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      },
    );

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function updatePost(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const {id, ...body} = request;

    const response = await fetch(`${ROUTES.PATCH_UPDATE_POST}/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({post: body}),
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function updateProfile(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(`${ROUTES.PATCH_UPDATE_PROFILE}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({item: request}),
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function updateProject(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const {id, ...body} = request;
    const response = await fetch(`${ROUTES.PATCH_UPDATE_PROJECT}/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(body),
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}

async function getGroupChat(
  command,
  request,
  onResponseReceived,
  onResponseFailed,
) {
  try {
    const response = await fetch(`${ROUTES.GET_GROUP_CHAT}/${request.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    basicResponseHandler(
      command,
      response,
      onResponseReceived,
      onResponseFailed,
    );
  } catch (error) {
    onResponseFailed(command, error);
  }
}
