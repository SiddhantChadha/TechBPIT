import {ROUTES} from './routes';
import {basicResponseHandler} from './controller';
export async function postLoginRequest(
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
