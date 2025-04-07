import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/request.ts";
import type { IBoard } from "../../common/interfaces/IBoard.d.ts";

interface BoardState {
  board: IBoard | null;
  loading: boolean;
  error: string | null;
}

const initialState: BoardState = {
  board: null,
  loading: false,
  error: null,
};

export const fetchBoard = createAsyncThunk(
  "board/fetchBoard",
  async (boardId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/board/${boardId}`);
      console.log(response.data, "RD");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error && "response" in error) {
        const serverError = error as {
          response?: { data?: { message?: string } };
        };
        return rejectWithValue(
          serverError.response?.data?.message || "Помилка завантаження дошки",
        );
      }
      return rejectWithValue("Помилка завантаження дошки");
    }
  },
);
/* eslint-disable no-param-reassign */
const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    resetBoard: (state) => {
      state.board = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.board = action.payload;
        state.loading = false;
      })
      .addCase(fetchBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
/* eslint-enable no-param-reassign */
export const { resetBoard } = boardSlice.actions;
export default boardSlice.reducer;
