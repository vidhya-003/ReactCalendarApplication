import { createSlice } from '@reduxjs/toolkit';

const communicationSlice = createSlice({
  name: 'communications',
  initialState: [],
  reducers: {
    addCommunication: (state, action) => {
      state.push(action.payload);
    },
    updateCommunication: (state, action) => {
      const index = state.findIndex((comm) => comm.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteCommunication: (state, action) => {
      return state.filter((comm) => comm.id !== action.payload);
    },
  },
});

export const { addCommunication, updateCommunication, deleteCommunication } =
  communicationSlice.actions;

export default communicationSlice.reducer;



