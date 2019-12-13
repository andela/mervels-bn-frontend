import { toast } from 'react-toastify';
import { LOGIN_FAILURE, LOGIN_SUCCESS } from './actionTypes';
import API from '../../config/axiosInstance';

export const loginSucess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload) => ({
  type: LOGIN_FAILURE,
  payload,
});

export const localAuth = (payload) => async (dispatch) => {
  try {
    const res = await API.post('/api/v1/auth/signin', payload);
    localStorage.setItem('bareFootToken', res.data.data);
    dispatch(loginSucess(res.data));
  }
  catch (err) {
    if (err.response) {
      toast.error(err.response.data.message);
      dispatch(loginFailure(err.response.data.message));
    } else {
      toast.error('Network Error');
    }
  }
};

export const socialAuth = (payload) => (dispatch) => {
  if(payload.status === 200) {
    localStorage.setItem('bareFootToken', payload.data);
    dispatch(loginSucess(payload));
  }else {
    dispatch(loginFailure(payload.error));
  }
};