import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserT } from 'types';

type AuthStateT = {
  user?: UserT;
};

const initialState: AuthStateT = {};

export const promptSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state: AuthStateT, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = promptSlice.actions;

export default promptSlice.reducer;
