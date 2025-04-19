import { apiSlice } from "../api/apiSlice";



export const productSuggestionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
       
        getProductCategories: builder.query({
            query:({query,page})=> ({
              url: `get-product-categories?query=${query}&page=${page}`,
              method: 'GET',
              credentials:'include' as const,
            }),
        }),
    
        getProductManufacturers: builder.query({
            query:({query,page})=> ({
              url: `get-product-manufacturers?query=${query}&page=${page}`,
              method: 'GET',
              credentials:'include' as const,
            }),
        }),
        
        getProductGenerics: builder.query({
            query:({query,page})=> ({
              url: `get-product-generics?query=${query}&page=${page}`,
              method: 'GET',
              credentials:'include' as const,
            }),
        }),

        getProductForms: builder.query({
            query:({query,page})=> ({
              url: `get-product-forms?query=${query}&page=${page}`,
              method: 'GET',
              credentials:'include' as const,
            }),
        }),

    })
});

export const {
    useGetProductCategoriesQuery,
    useLazyGetProductCategoriesQuery,
    useGetProductManufacturersQuery,
    useGetProductFormsQuery,
    useGetProductGenericsQuery
} = productSuggestionsApi