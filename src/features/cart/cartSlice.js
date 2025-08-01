import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
      state.totalAmount += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const itemToRemove = state.cartItems.find(item => item.id === itemId);
      if (itemToRemove) {
        state.cartItems = state.cartItems.filter(item => item.id !== itemId);
        state.totalAmount -= itemToRemove.price;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
