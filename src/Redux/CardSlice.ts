import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type cardType = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  preview?: string;
  content: string;
};

type cardState = cardType[];

const initialState: cardState = [];

const CardSlice = createSlice({
  name: "cards",
  initialState,

  reducers: {
    setCards: (state: cardState, action: PayloadAction<cardType[]>) => {
      return action.payload;
    },

    updateCard: (state: cardState, action: PayloadAction<cardType>) => {
      const index = state.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
    },

    deleteCard: (state: cardState, action: PayloadAction<string>) => {
      return state.filter((c: cardType) => c.id !== action.payload);
    },

    clearCards: () => [],
  },
});

export const { setCards, updateCard, deleteCard, clearCards } =
  CardSlice.actions;
export default CardSlice.reducer;
