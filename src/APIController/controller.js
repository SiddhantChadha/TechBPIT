import {REST_COMMANDS} from './RestCommands';

import {ROUTES} from './routes';
import {
  setAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
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
  console.log('called');
  if (response.ok) {
    const data = await response.json();
    console.log(data);
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
      setIsLoggedIn(false);
      await setAuthTokens(null, null);
    }
    refreshTokenPromise = Promise.resolve();
  } catch (error) {
    refreshTokenPromise = Promise.reject(error);
  }
}

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
      ROUTES.GET_EXPLORE_USERS +
        new URLSearchParams({count: request.count}),
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
