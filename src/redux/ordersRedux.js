import { createSlice } from "@reduxjs/toolkit";


export const ordersSlice = createSlice({
    name:"order",
    initialState:{
        orders:[],
        isFetching:false,
        error:false
    },
    reducers:{
        //get all orders
        getOrdersStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        getOrdersSuccess:(state,action) => {
            state.isFetching = false
            state.orders = action.payload
        },
        getOrdersFailure:(state) => {
            state.isFetching = false
            state.error = true
        },

        //create an order
        createOrderStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        createOrderSuccess:(state,action) => {
            state.isFetching = false
            state.orders.push(action.payload)
        },
        createOrderFailure:(state) => {
            state.isFetching = false
            state.error = true
        },

        //updating an order
        updateOrderStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        updateOrderSuccess:(state,action) => {
            state.isFetching = false
            const {id,order} = action.payload
            // Find the index of the order in the state array
            const index = state.orders.findIndex((item) => item._id === id)
            if(index !== -1){
                 // Create a new object consisting of  the merged properties of the existing order which was found on the specified index
                 // and the new properties of the order in the payload
                 const updatedOrder = {...state.orders[index],...order}
                 // Update the order at the specified index with the merge results
                 state.orders[index] = updatedOrder
            }
        },
        updateOrderFailure:(state) => {
            state.isFetching = false
            state.error = true
        },

        //deleting an order
        deleteOrderStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        deleteOrderSuccess:(state,action) => {
            state.isFetching = false
            state.orders.splice(state.orders.findIndex((item) => item._id === action.payload),1)
        },
        deleteOrderFailure:(state) => {
            state.isFetching = false
            state.error = true
        }


    }
})

export const {createOrderStart,createOrderSuccess,createOrderFailure,
    getOrdersStart,getOrdersSuccess,getOrdersFailure,
   updateOrderStart,updateOrderSuccess,updateOrderFailure,
   deleteOrderStart,deleteOrderSuccess,deleteOrderFailure } = ordersSlice.actions

export default ordersSlice.reducer