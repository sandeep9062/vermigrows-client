import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./api";

export const propertiesApi = createApi({
  reducerPath: "propertiesApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Property"],
  endpoints: (builder) => ({
    getAllProperties: builder.query({
      query: (params) => ({
        url: "/properties",
        params,
      }),
      providesTags: ["Property"],
    }),
    getProperty: builder.query({
      query: (id) => `/properties/${id}`,
      providesTags: (result, error, id) => [{ type: "Property", id }],
    }),
    getOwnedProperties: builder.query({
      query: () => `/properties/owned`,
      providesTags: ["Property"],
    }),
    createProperty: builder.mutation({
      query: (property) => {
        const formData = new FormData();
        const { token, ...propertyData } = property;
        Object.keys(propertyData).forEach((key) => {
          if (key === "image") {
            propertyData[key].forEach((file: File) => {
              formData.append(key, file);
            });
          } else if (typeof propertyData[key] === "object" && propertyData[key] !== null) {
            formData.append(key, JSON.stringify(propertyData[key]));
          } else {
            formData.append(key, propertyData[key]);
          }
        });
        return {
          url: "/properties",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Property"],
    }),
    updateProperty: builder.mutation({
      query: ({ id, ...property }) => {
        const formData = new FormData();
        Object.keys(property).forEach((key) => {
          if (key === "image") {
            property[key].forEach((file: File | string) => {
              if (file instanceof File) {
                formData.append(key, file);
              }
            });
          } else if (typeof property[key] === "object" && property[key] !== null) {
            formData.append(key, JSON.stringify(property[key]));
          } else {
            formData.append(key, property[key]);
          }
        });
        return {
          url: `/properties/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Property", id }, "Property"],
    }),
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/properties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Property"],
    }),
  }),
});

export const {
  useGetAllPropertiesQuery,
  useGetPropertyQuery,
  useGetOwnedPropertiesQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = propertiesApi;
