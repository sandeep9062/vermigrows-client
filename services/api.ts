import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = state.auth?.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithAuth = baseQuery;
