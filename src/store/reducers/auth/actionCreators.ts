import axios from 'axios';
import { AppDispatch } from '../..';
import { IUser } from '../../../models/IUser';
import {
  SetUserAction,
  SetAuthAction,
  SetIsLoadingAction,
  SetErrorAction,
  AuthActionEnum,
} from './types';

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionEnum.SET_USER,
    payload: user,
  }),
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionEnum.SET_AUTH,
    payload: auth,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload,
  }),
  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        setTimeout(async () => {
          const response = await axios.get<IUser[]>('./users.json');
          const mockUsers = response.data.find(
            (user) => user.username === username && user.password === password
          );
          if (mockUsers) {
            localStorage.setItem('auth', mockUsers.username);
            dispatch(AuthActionCreators.setIsAuth(true));
            dispatch(AuthActionCreators.setUser(mockUsers));
          } else {
            dispatch(
              AuthActionCreators.setError('Username or password is wrong')
            );
          }
          dispatch(AuthActionCreators.setIsLoading(false));
        }, 1000);
      } catch (error) {
        dispatch(AuthActionCreators.setError('Something went wrong!'));
      }
    },
  logout:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
      } catch (error) {}
    },
};
