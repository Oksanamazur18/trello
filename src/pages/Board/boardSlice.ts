import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/request';
import { IBoard } from '../../common/interfaces/IBoard';

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
  'board/fetchBoard',
  async (boardId: string, { rejectWithValue }) => {
    // try {
    //   const response = await api.get(`/board/${boardId}`);
    //   return response.data;
    // } catch (error:unknown) {
    //   return rejectWithValue(error.response?.data?.message || 'Помилка завантаження дошки');
    // }
    try {
      const response = await api.get(`/board/${boardId}`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error && "response" in error) {
        const serverError = error as { response?: { data?: { message?: string } } };
        return rejectWithValue(serverError.response?.data?.message || "Помилка завантаження дошки");
      }
      return rejectWithValue("Помилка завантаження дошки");
    }
  }
);

const boardSlice = createSlice({
  name: 'board',
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

export const { resetBoard } = boardSlice.actions;
export default boardSlice.reducer;
