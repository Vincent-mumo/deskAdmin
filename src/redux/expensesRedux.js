import { createSlice } from "@reduxjs/toolkit";


export const expensesSlice = createSlice({
    name:"expense",
    initialState:{
        expenses:[],
        isFetching:false,
        error:false
    },
    reducers:{
        //get all expenses
        getExpensesStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        getExpensesSuccess:(state,action) => {
            state.isFetching = false
            state.expenses = action.payload
        },
        getExpensesFailure:(state) => {
            state.isFetching = false
            state.error = true
        },

        //create an expense
        createExpenseStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        createExpenseSuccess:(state,action) => {
            state.isFetching = false
            state.expenses.push(action.payload)
        },
        createExpenseFailure:(state) => {
            state.isFetching = false
            state.error = true
        },

        //updating an expense
        updateExpenseStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        updateExpenseSuccess:(state,action) => {
            state.isFetching = false
            const {id,expense} = action.payload
            // Find the index of the expense in the state array
            const index = state.expenses.findIndex((item) => item._id === id)
            if(index !== -1){
                 // Create a new object consisting of  the merged properties of the existing expense which was found on the specified index
                 // and the new properties of the expense in the payload
                 const updatedExpense = {...state.expenses[index],...expense}
                 // Update the expense at the specified index with the merge results
                 state.expenses[index] = updatedExpense
            }
        },
        updateExpenseFailure:(state) => {
            state.isFetching = false
            state.error = true
        },

        //deleting an expense
        deleteExpenseStart:(state) => {
            state.isFetching = true
            state.error = false
        },
        deleteExpenseSuccess:(state,action) => {
            state.isFetching = false
            state.expenses.splice(state.expenses.findIndex((item) => item._id === action.payload),1)
        },
        deleteExpenseFailure:(state) => {
            state.isFetching = false
            state.error = true
        }


    }
})

export const {createExpenseStart,createExpenseSuccess,createExpenseFailure,
    getExpensesStart,getExpensesSuccess,getExpensesFailure,
   updateExpenseStart,updateExpenseSuccess,updateExpenseFailure,
   deleteExpenseStart,deleteExpenseSuccess,deleteExpenseFailure } = expensesSlice.actions

export default expensesSlice.reducer