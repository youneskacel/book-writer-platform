import { api } from ".";
import { Section } from "../../types/section";

export const sectionsApi = api.injectEndpoints({
    endpoints: (builder) =>  ({
        getSections: builder.query<Section[], any>({
            query: () => '/sections',
            providesTags: ['Sections']
        }),
        createSection: builder.mutation<Section, Partial<Section>>({
            query: (body) => ({
                url: '/sections',
                method: 'POST',
                body,

            }),
            invalidatesTags: ['Sections']
        }),
        updateSection: builder.mutation<Section, Partial<Section>>({
            query: ({id, ...body}) => ({
                url: `/sections/${id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Sections']
        })
    }),
})