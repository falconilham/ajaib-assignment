import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
}

const slice = createSlice({
  name: 'pokemon-data',
  initialState: initialState,
  reducers: {
    toggleLoading: (state) => ({
      ...state,
      loading: !state.loading
    }),
    addUsers: (state, action) => ({
      ...state,
      users: [...state.users, ...action.payload]
    }),
    changeUsers: (state, action) => ({
      ...state,
      users: action.payload
    }),
  },
});

export const { addUsers, changeUsers, toggleLoading } = slice.actions;

export default slice.reducer;