import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { withAuth } from '@/lib/api';
import { RootState } from '../store';
import { toast } from 'sonner';

interface OrderState {
  loading: boolean;
  error: string | null;
  order: any | null;
}

const initialState: OrderState = {
  loading: false,
  error: null,
  order: null,
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData: any, { getState, dispatch }) => {
    const {
      auth: { token },
    } = getState() as RootState;
    if (token) {
      const client = withAuth(token);
      try {
        const response = await client.post('/orders', orderData);
        toast.success('Order placed successfully!');
        // dispatch(clearCart()); // This will be in cartSlice, but we can call it from here
        return response.data;
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to create order.');
        throw error;
      }
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create order';
      });
  },
});

export default orderSlice.reducer;
