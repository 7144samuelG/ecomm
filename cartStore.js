import React from 'react';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

// This function represents your "store".
// It should contain the logic to add, update, or remove items from the cart.
const useStore = create(
 (set) => ({
    cart: [],
    addToCart: (item) => set((state) => ({
      cart: [...state.cart, item],
    })),
    updateQuantity: (itemId,quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity:quantity } : item
      ),
    })),
    removeFromCart: (item) => set((state) => ({
      cart: state.cart.filter((cartItem) => cartItem.id !== item.id),
    })),

    
    updateOrAddToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // If the item already exists, update the quantity
        const newQuantity = existingItem.quantity + 1;
        return { cart: state.cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem)) };
      } else {
        // If the item doesn't exist, add it to the cart
        return { cart: [...state.cart, item] };
      }
    }),
 })
)

export default useStore