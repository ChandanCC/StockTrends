import {UPDATE_LOGGED_IN_USER} from '../actionTypes';
import {ILoggedInUser, LoggedInUserAction} from '../actionTypes/loggedInUser';

/**
 * Update Logged in User Fields To Redux
 */
const updateLoggedInUser = (
  newUserData: ILoggedInUser,
): LoggedInUserAction => ({
  type: UPDATE_LOGGED_IN_USER,
  payload: newUserData,
});

export {updateLoggedInUser};
