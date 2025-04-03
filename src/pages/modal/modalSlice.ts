import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ICard } from "../../common/interfaces/ICard";
import api from "../../api/request";

interface ModalState {
  isOpen: boolean;
  cardData: ICard | null;
  list_id: number | null;
}

const initialState: ModalState = {
  isOpen: false,
  cardData: null,
  list_id: null,
};

export const updateCardData = createAsyncThunk(
  "modal/updateCardData",
  async (
    {
      updatedCardData,
      boardId,
      listId,
    }: { updatedCardData: ICard; boardId: string; listId: number },
    { rejectWithValue },
  ) => {
    const { id, title, description } = updatedCardData;

    console.log("Board ID:", boardId, "Card ID:", id, "List ID:", listId);

    try {
      const response = await api.put(
        `/board/${boardId}/card/${id}`,
        { title, description, list_id: listId },
        { headers: { Authorization: "Bearer 123" } },
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        cardData: ICard;
        board_id: string | undefined;
        list_id: number;
      }>,
    ) => {
      state.isOpen = true;
      state.cardData = action.payload.cardData;
      state.list_id = action.payload.list_id;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.cardData = null;
      state.list_id = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCardData.fulfilled, (state, action) => {
      state.cardData = action.payload;
    });
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
