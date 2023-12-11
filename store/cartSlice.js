import { createSlice } from "@reduxjs/toolkit";
import { ToastAndroid } from "react-native";
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
        ToastAndroid.show(
          "item added to cart",
          ToastAndroid.SHORT
        );
        
      } else {
       
        // [...state.items, action.payload];
        state.items.push(action.payload);
        ToastAndroid.show(
          "item added to cart",
          ToastAndroid.SHORT
        );
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
        if(item.quantity===1){
          const newItems=state.items.filter((item)=>item.id!==action.payload.id);
          state.items=newItems
        }
        item.quantity--;
      }

    },
    setCartTotalCost: (state) => {
      let sum = 0;
      state.items.forEach((elem) => {
        sum += elem.price * elem.quantity;
      });
      state.totalCost = sum;
    },
    emptyCart:(state)=>{
      state.items=[]
    }
  },
});
export const { addToCart,increaseQuantity,decreaseQuantity,setCartTotalCost,emptyCart} =
  cartSlice.actions;
  export const selectBasketTotal = (state) =>
  state.cart.items.reduce((total, item) => (total += item.price*item.quantity), 0);

export default cartSlice.reducer;
