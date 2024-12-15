import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../pages/modal/modalSlice'; 
import listReducer from '../pages/Board/components/List/listSlice';
import boardReducer from '../pages/Board/boardSlice'

const store = configureStore({
  reducer: {
    modal: modalReducer, 
    lists: listReducer,
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
