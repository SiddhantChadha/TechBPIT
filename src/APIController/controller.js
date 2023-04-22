import {ROUTES} from './routes';
import {
  setAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from '../EncryptedStorageHelper';

export async function getAllPosts() {
  try {
    const response = await fetch(ROUTES.GET_ALL_POSTS, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 401) {
      console.log(response.status);
      await postRefreshToken();
    }
    return data;
  } catch (error) {
    console.log(error);
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
      console.log(data);
    }
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
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
  } catch (error) {
    console.log(error);
  }
}
