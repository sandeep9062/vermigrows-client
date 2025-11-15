import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "../store/authSlice";
import { RootState } from "../store";
import { baseQueryWithAuth } from "./api";

// ✅ Interfaces
export interface Location {
  address?: string;
  city?: string;
  pincode?: string;
  state?: string;
  landmark?: string;
  country?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  password?: string;
  role: string;
  isActive: boolean;
  googleId?: string;
  profile?: Record<string, any>;
  resetPasswordToken?: string;
  resetPasswordExpire?: string;
  createdAt: string;
  bookings: any[];
  location?: Location;
}

interface UpdateUserPayload {
  id: string;
  data: Partial<User>;
}

interface ToggleUserStatusPayload {
  id: string;
  isActive: boolean;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // ✅ Get all users
    getUsers: builder.query<User[], void>({
      query: () => `/users`,
      providesTags: ["User"],
    }),

    // ✅ Get single user by ID
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => ["User", { type: "User", id }],
    }),

    // ✅ Create a new user
    addUser: builder.mutation<User, Partial<User>>({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    // ✅ Update user
    updateUser: builder.mutation<User, UpdateUserPayload>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "User",
        { type: "User", id },
      ],
    }),

    // ✅ Delete user
    deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => ["User", { type: "User", id }],
    }),

    // ✅ Toggle active/inactive status
    toggleUserStatus: builder.mutation<User, ToggleUserStatusPayload>({
      query: ({ id, isActive }) => ({
        url: `/users/${id}/toggle`,
        method: "PUT",
        body: { isActive },
      }),
      invalidatesTags: (result, error, { id }) => [
        "User",
        { type: "User", id },
      ],
    }),

    // ✅ Filter users by role
    getUsersByRole: builder.query<User[], string>({
      query: (role) => `/users/role/${role}`,
      providesTags: ["User"],
      transformResponse: (response: { users: User[] }) => response.users,
    }),


    // ✅ Update profile
    updateProfile: builder.mutation<User, FormData>({
      query: (data) => ({
        url: `/users/profile-update`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "User",
        { type: "User", id: result?._id },
      ],
    }),
  }),
});

// ✅ Export hooks
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useToggleUserStatusMutation,
  useGetUsersByRoleQuery,

  useUpdateProfileMutation,
} = userApi;
