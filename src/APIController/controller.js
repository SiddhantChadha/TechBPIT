import {ROUTES} from './routes';
import {
  setAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../EncryptedStorageHelper';

let setIsLoggedIn = null;

export function loggedInStateSetter(setIsLoggedIna) {
  console.log('SETTING STATE');
  setIsLoggedIn = setIsLoggedIna;
  return () => (setIsLoggedIn = null);
}

export async function getAllPosts(onResponseReceived, onResponseFailed) {
  try {
    const response = await fetch(ROUTES.GET_ALL_POSTS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });
    const data = await response.json();
    onResponseReceived(1, data);
    // setAccessToken(null);
    // setRefreshToken(null);
    if (setIsLoggedIn != null) {
      setIsLoggedIn(false);
      console.log('logging out');
    }
    console.log('setIsLoggedIn is null HAI');

    if (response.status === 401) {
      await postRefreshToken();
    }
    return data;
  } catch (error) {
    onResponseFailed(1, error);
  }
}
async function postRefreshToken() {
  try {
    const response = await fetch(ROUTES.POST_RENEW_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: await getRefreshToken(),
      }),
    });
    if (response.ok) {
      const data = await response.json();
      await setAccessToken(data.access_token);
    }
    if (response.status === 401) {
    }
  } catch (error) {}
}

export async function postLoginRequest(email, password, onResponseReceived) {
  try {
    const response = await fetch(ROUTES.POST_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    setAuthTokens(data.access_token, data.refresh_token);
    onResponseReceived(data);
  } catch (error) {}
}
