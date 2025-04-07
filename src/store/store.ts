import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../pages/modal/modalSlice.ts";
import listReducer from "../pages/Board/components/List/listSlice.ts";
import boardReducer from "../pages/Board/boardSlice.ts";
import RegisterReducer from "../pages/authorization/Register/RegisterSlice.ts"


const store = configureStore({
  reducer: {
    modal: modalReducer,
    lists: listReducer,
    board: boardReducer,
    register: RegisterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
