import { api } from ".";
import { User } from "../../types/user";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], any>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});
