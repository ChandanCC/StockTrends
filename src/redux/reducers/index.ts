import {combineReducers} from 'redux';
import loggedInUser from './loggedInUser';

const rootReducer = combineReducers({
  loggedInUser,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
