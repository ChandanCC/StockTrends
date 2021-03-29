import { SERVER_PORT, SERVER_URL } from '../config/keys';
import store from '../redux/configureStore';

const authorizedApiCall = async (
  method: string,
  endpoint: string,
  token?: string
) => {
  try {
    const { auth } = store.getState();
    const response = await fetch(`${SERVER_URL}:${SERVER_PORT}/${endpoint}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || auth.idToken}`
      }
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    console.log(err, `<<<Error in api call>>>`);
    return err;
  }
};
export default authorizedApiCall;
