import {AnyAction} from 'redux';
import {UPDATE_LOGGED_IN_USER} from '../actionTypes';
import {ILoggedInUser} from '../actionTypes/loggedInUser';

const initialState: ILoggedInUser = {
  token: '',
};

export default function (
  state = initialState,
  action: AnyAction,
): ILoggedInUser {
  switch (action.type) {
    case UPDATE_LOGGED_IN_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
