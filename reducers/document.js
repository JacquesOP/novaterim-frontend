import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value: {
      identityCard: null,
      vitalCard: null,
      resume: null,
      iban: null,
      homePaper: null,
   },
};


export const documentSlice = createSlice({
   name: "document",
   initialState,
   reducers: {
      addIdentityCard: (state, action) => {
         state.value.identityCard = action.payload;
      },
      addVitalCard: (state, action) => {
         state.value.vitalCard = action.payload;
      },
      addResume: (state, action) => {
         state.value.resume = action.payload;
      },
      addIban: (state, action) => {
         state.value.iban = action.payload;
      },
      addHomePaper: (state, action) => {
         state.value.homePaper = action.payload;
      },
   },
});

export const { addResume, addHomePaper, addIban, addIdentityCard, addVitalCard } = documentSlice.actions;
export default documentSlice.reducer;