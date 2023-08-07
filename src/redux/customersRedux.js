import {createSlice} from "@reduxjs/toolkit"

export const customersSlice = createSlice({
    name:"customer",
    initialState:{
        customers:[],
        isFetching:false,
        error:false
    },
    reducers:{
        //get all customers
        getCustomersStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        getCustomersSuccess:(state,action) => {
            state.isFetching = false
            state.customers = action.payload
        },
        getCustomersFailure:(state) => {
            state.isFetching = false
            state.error = true
        },

        createCustomerStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        createCustomerSuccess:(state,action) => {
            state.isFetching = false
            state.customers.push(action.payload)
        },
        createCustomerFailure:(state) => {
            state.isFetching = false
            state.error = true
        },

        //updating a product
        updateCustomerStart:(state) => {
            state.isFetching = true,
            state.error = true
        },
        updateCustomerSuccess:(state,action) => {
            state.isFetching = false
            const {customer} = action.payload
            //find the index of the customer in the state array
            const index = state.customers.findIndex((item) => item._id === item.id)
            if(index !== -1){
                //create a new object with the merged properties of the existing customer and the updated one
                const updatedCustomer = {...state.customers[index],...customer}
                //update the customer at the specified index with the merged customer
                state.customers[index] = updatedCustomer
            }
        },
        updateCustomerFailure:(state) => {
            state.isFetching = false
            state.error = true
        },

        //deleting a product
        deleteCustomerStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        deleteCustomerSuccess:(state,action) => {
            state.isFetching = false
            state.customers.splice(state.customers.findIndex((item) => item._id === action.payload),1)
        },
        deleteCustomerFailure:(state) => {
            state.isFetching = false
            state.error = true
        }

    }
})

export const {createCustomerStart,createCustomerSuccess,createCustomerFailure,
             getCustomersStart,getCustomersSuccess,getCustomersFailure,
            updateCustomerStart,updateCustomerSuccess,updateCustomerFailure,
            deleteCustomerStart,deleteCustomerSuccess,deleteCustomerFailure } = customersSlice.actions

export default customersSlice.reducer