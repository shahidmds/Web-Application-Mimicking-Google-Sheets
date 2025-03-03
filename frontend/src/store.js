import { configureStore, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const sheetSlice = createSlice({
  name: 'sheet',
  initialState: {
    data: [['']], // Initial empty sheet
    formulas: {}, // Track formulas
    history: [], // For undo/redo functionality
    future: [], // For redo functionality
  },
  reducers: {
    setSheetData: (state, action) => {
      // Save current state to history before updating
      state.history.push({ data: state.data, formulas: state.formulas });
      state.future = []; // Clear future states
      state.data = action.payload;
    },
    undo: (state) => {
      if (state.history.length > 0) {
        // Move current state to future
        state.future.push({ data: state.data, formulas: state.formulas });
        // Restore previous state
        const previousState = state.history.pop();
        state.data = previousState.data;
        state.formulas = previousState.formulas;
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        // Move current state to history
        state.history.push({ data: state.data, formulas: state.formulas });
        // Restore future state
        const nextState = state.future.pop();
        state.data = nextState.data;
        state.formulas = nextState.formulas;
      }
    },
  },
});

// Export actions
export const { setSheetData, undo, redo } = sheetSlice.actions;

// Fetch sheet data from the backend
export const fetchSheet = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/sheets');
    dispatch(setSheetData(response.data[0]?.data || [['']]));
  } catch (error) {
    console.error('Error fetching sheet:', error);
  }
};

// Save sheet data to the backend
export const saveSheet = () => async (dispatch, getState) => {
  try {
    const { data } = getState().sheet;
    await axios.post('http://localhost:5000/api/sheets', { data });
    console.log('Sheet saved successfully!');
  } catch (error) {
    console.error('Error saving sheet:', error);
  }
};

// Create the Redux store
export default configureStore({
  reducer: {
    sheet: sheetSlice.reducer,
  },
});