export const SET_LOADING = 'SET_LOADING';
export const SET_NOTES = 'SET_NOTES';
export const SET_ERROR = 'SET_ERROR';
export const DELETE_NOTE = 'DELETE_NOTE';
export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const SET_USER = 'SET_USER'; 

export const setLoading = () => ({ type: SET_LOADING });
export const setNotes = (notes) => ({ type: SET_NOTES, payload: notes });
export const setError = (error) => ({ type: SET_ERROR, payload: error });
export const deleteNote = (id) => ({ type: DELETE_NOTE, payload: id });
export const addNote = (note) => ({ type: ADD_NOTE, payload: note });
export const updateNote = (note) => ({ type: UPDATE_NOTE, payload: note });
export const setUser = (user) => ({ type: SET_USER, payload: user }); 
