import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import { api, withAuth } from '@/lib/api';
import { RootState } from '../store';

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState }) => {
  const {
    auth: { token },
  } = getState() as RootState;
  if (token) {
    const client = withAuth(token);
    const response = await client.get('/cart');
    return response.data;
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (item: { productId: string, quantity: number }, { getState }) => {
  const {
    auth: { token },
  } = getState() as RootState;
  if (token) {
    const client = withAuth(token);
    const response = await client.post('/cart', item);
    return response.data;
  }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (id: string, { getState }) => {
  const {
    auth: { token },
  } = getState() as RootState;
  if (token) {
    const client = withAuth(token);
    const response = await client.delete(`/cart/${id}`);
    return response.data;
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item && item.id === action.payload);
      if (item) {
        item.quantity++;
        toast.success('Item quantity increased');
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item && item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
        toast.info('Item quantity decreased');
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (action.payload && action.payload.items) {
          state.items = action.payload.items;
        }
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (action.payload && action.payload.items) {
          state.items = action.payload.items;
          toast.success('Item added to cart');
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (action.payload && action.payload.items) {
          state.items = action.payload.items;
          toast.error('Item removed from cart');
        }
      });
  },
});

export const { increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
