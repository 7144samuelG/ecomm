import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  totalCost: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existItem) {
        existItem.quantity++;
      } else {
        console.log(state.items)
        state.items = [...state.items, action.payload];
       // state.items.push(action.payload);
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const items = state.items.filter((item) => item.id !== action.payload.id);
      state.items = items;
    },
    removeAll: (state) => {
      return (state.items = []);
    },

    setCartTotalCost: (state) => {
      let sum = 0;
      state.items.forEach((elem) => {
        sum += elem.price * elem.quantity;
      });
      state.totalCost = sum;
    },
  },
});
export const { addToCart, increaseQuantity, decreaseQuantity, removeAll } =
  cartSlice.actions;
export default cartSlice.reducer;
