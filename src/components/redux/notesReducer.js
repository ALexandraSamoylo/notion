import {
  SET_LOADING,
  SET_NOTES,
  SET_ERROR,
  DELETE_NOTE,
  ADD_NOTE,
  UPDATE_NOTE,
} from './actions';

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };

    case SET_NOTES:
      return {
        ...state,
        notes: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };

    case SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };

    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };

    default:
      return state;
  }
};

export default notesReducer;
