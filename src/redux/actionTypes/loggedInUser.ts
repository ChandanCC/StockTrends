export interface ILoggedInUser {
  token: string | null;
}

export type LoggedInUserAction = {
  type: string;
  payload: ILoggedInUser;
};
