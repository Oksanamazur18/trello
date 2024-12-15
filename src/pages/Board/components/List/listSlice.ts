import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../../api/request';
import { IList } from '../../../../common/interfaces/IList';


interface ListState {
  lists: IList[];
  error: string | null; 
}

const initialState: ListState = {
  lists: [],
  error: null, 
};


export const addNewList = createAsyncThunk<
  IList, 
  { boardId: string; title: string; position: number }, 
  { rejectValue: string } 
>('lists/addNewList', async ({ boardId, title, position }, { rejectWithValue }) => {
  try {
    const response = await api.post(
      `/board/${boardId}/list`,
      { title, position },
      { headers: { Authorization: 'Bearer 123' } }
    );
    return response.data; 
  } catch (error) {
    return rejectWithValue(error+'Не вдалося створити список');
  }
});

export const removeList = createAsyncThunk(
  'lists/removeList',
  async ({ boardId, listId }: { boardId: string; listId: number }, { rejectWithValue }) => {
    try {
      await api.delete(`/board/${boardId}/list/${listId}`);
      return listId; 
    } catch (error:unknown) {
      return rejectWithValue(error);
    }
  }
);

export const updateList = createAsyncThunk<
  IList, 
  { boardId: number; listId: number; title: string }, 
  { rejectValue: string } 
>('lists/updateList', async ({ boardId, listId, title }, { rejectWithValue }) => {
  try {
    await api.put(`/board/${boardId}/list/${listId}`, { title });

    const response = await api.get(`/board/${boardId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error+'Не вдалося оновити список');
  }
});


const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeList.fulfilled, (state, action) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload); 
    });
    builder.addCase(updateList.fulfilled, (state, action) => {
        const updatedList = action.payload;
        const index = state.lists.findIndex((list) => list.id === updatedList.id);
        if (index !== -1) {
          state.lists[index] = updatedList; 
        }
      });
      builder.addCase(updateList.rejected, (state, action) => {
        state.error = action.payload ?? 'Щось пішло не так';
      });
      builder.addCase(addNewList.fulfilled, (state, action) => {
        state.lists.push(action.payload); 
        state.error = null;
      });
      builder.addCase(addNewList.rejected, (state, action) => {
        state.error = action.payload ?? 'Щось пішло не так';
      });
  },
});

export const { setLists } = listSlice.actions;
export default listSlice.reducer;
