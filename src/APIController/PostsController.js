import {ROUTES} from './routes';
import {getAccessToken} from '../EncryptedStorageHelper';
import {basicResponseHandler} from './controller';
export async function getAllPosts(
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
