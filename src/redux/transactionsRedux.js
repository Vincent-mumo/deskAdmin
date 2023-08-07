import { createSlice } from "@reduxjs/toolkit";


export const transactionsSlice = createSlice({
    name:"transaction",
    initialState:{
        transactions:[],
        isFetching:false,
        error:false
    },
    reducers:{
        //get all transactions
        getTransactionsStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        getTransactionsSuccess:(state,action) => {
            state.isFetching = false
            state.transactions = action.payload
        },
        getTransactionsFailure:(state) => {
            state.isFetching = false
            state.error = true
        },

        //create a transaction
        createTransactionStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        createTransactionSuccess:(state,action) => {
            state.isFetching = false
            state.transactions.push(action.payload)
        },
        createTransactionFailure:(state) => {
            state.isFetching = false
            state.error = true
        },

        //updating a transaction
        updateTransactionStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        updateTransactionSuccess:(state,action) => {
            state.isFetching = false
            const {id,transaction} = action.payload
            // Find the index of the transaction in the state array
            const index = state.transactions.findIndex((item) => item._id === id)
            if(index !== -1){
                 // Create a new object consisting of  the merged properties of the existing transaction which was found on the specified index
                 // and the new properties of the transaction in the payload
                 const updatedTransaction = {...state.transactions[index],...transaction}
                 // Update the transaction at the specified index with the merge results
                 state.transactions[index] = updatedTransaction
            }
        },
        updateTransactionFailure:(state) => {
            state.isFetching = false
            state.error = true
        },

        //deleting a transaction
        deleteTransactionStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        deleteTransactionSuccess:(state,action) => {
            state.isFetching = false
            state.transactions.splice(state.transactions.findIndex((item) => item._id === action.payload),1)
        },
        deleteTransactionFailure:(state) => {
            state.isFetching = false
            state.error = true
        }


    }
})

export const {createTransactionStart,createTransactionSuccess,createTransactionFailure,
    getTransactionsStart,getTransactionsSuccess,getTransactionsFailure,
   updateTransactionStart,updateTransactionSuccess,updateTransactionFailure,
   deleteTransactionStart,deleteTransactionSuccess,deleteTransactionFailure } = transactionsSlice.actions

export default transactionsSlice.reducer