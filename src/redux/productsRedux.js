import {createSlice} from "@reduxjs/toolkit"

export const productsSlice = createSlice({
    name:"product",
    initialState:{
        products:[],
        isFetching:false,
        error:false
    },
    reducers:{
        //get all products
        getProductsStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        getProductsSuccess:(state,action) => {
            state.isFetching = false
            state.products = action.payload
        },
        getProductsFailure:(state) => {
            state.isFetching = false
            state.error = true
        },

        //creating a product
        createProductStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        createProductSuccess:(state,action) => {
            state.isFetching = false
            state.products.push(action.payload)
        },
        createProductFailure:(state) => {
            state.isFetching = false
            state.error = true
        },

        //updating a product
        updateProductStart:(state) => {
            state.isFetching = true,
            state.error = true
        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            const { id, product } = action.payload;
            // Find the index of the product in the state array
            const index = state.products.findIndex((item) => item._id === id);
            if (index !== -1) {
              // Create a new object consisting of  the merged properties of the existing product and the new properties in the payload
              const updatedProduct = { ...state.products[index], ...product };
              // Update the product at the specified index with the merged product
              state.products[index] = updatedProduct;
            }
          },
          
        updateProductFailure:(state) => {
            state.isFetching = false
            state.error = true
        },

        //deleting a product
        deleteProductStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        deleteProductSuccess:(state,action) => {
            state.isFetching = false
            state.products.splice(state.products.findIndex((item) => item._id === action.payload),1)
        },
        deleteProductFailure:(state) => {
            state.isFetching = false
            state.error = true
        }

    }
})

export const {createProductStart,createProductSuccess,createProductFailure,
             getProductsStart,getProductsSuccess,getProductsFailure,
            updateProductStart,updateProductSuccess,updateProductFailure,
            deleteProductStart,deleteProductSuccess,deleteProductFailure } = productsSlice.actions

export default productsSlice.reducer