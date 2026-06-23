import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type Ticket = {
  name: string;
  price: number;
  available: number;
};

type State = {
  step: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
  time: string;
  location: string;
  tickets: Ticket[];
};

const initialState: State = {
  step: 1,
  title: "",
  description: "",
  category: "",
  imageUrl: "",
  date: "",
  time: "",
  location: "",
  tickets: [],
};

const createEventSlice = createSlice({
  name: "createEvent",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },

    prevStep: (state) => {
      state.step -= 1;
    },

    resetForm: () => initialState,

    updateField: (
      state,
      action: PayloadAction<{ field: keyof State; value: any }>
    ) => {
      (state as any)[action.payload.field] = action.payload.value;
    },

    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
    },
  },
});

export const {
  nextStep,
  prevStep,
  updateField,
  addTicket,
  resetForm,
} = createEventSlice.actions;

export default createEventSlice.reducer;