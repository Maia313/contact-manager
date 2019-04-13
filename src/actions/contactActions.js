import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  GET_CONTACT,
  UPDATE_CONTACT
} from './types';
import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/users';

export const getContacts = () => async dispatch => {
  const response = await axios.get(url);
  dispatch({
    type: GET_CONTACTS,
    payload: response.data
  });
};

export const getContact = id => async dispatch => {
  const response = await axios.get(`${url}/${id}`);
  dispatch({
    type: GET_CONTACT,
    payload: response.data
  });
};

export const deleteContact = id => async dispatch => {
  await axios.delete(`${url}/${id}`);
  dispatch({
    type: DELETE_CONTACT,
    payload: id
  });
};

export const addContact = contact => async dispatch => {
  const response = await axios.post(url, contact);
  dispatch({
    type: ADD_CONTACT,
    payload: response.data
  });
};

export const updateContact = contact => async dispatch => {
  const response = await axios.put(`${url}/${contact.id}`, contact);
  dispatch({
    type: UPDATE_CONTACT,
    payload: response.data
  });
};
