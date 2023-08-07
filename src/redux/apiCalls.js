import {adminRequests} from "../utils/requestMethods"

//products actions
import {getProductsFailure, getProductsStart, getProductsSuccess,
       createProductStart, createProductFailure, createProductSuccess,
       updateProductStart,updateProductFailure,updateProductSuccess,
       deleteProductStart,deleteProductSuccess,deleteProductFailure } from "./productsRedux"

//employees actions
import {createEmployeeFailure, createEmployeeStart, createEmployeeSuccess,
       deleteEmployeeFailure,deleteEmployeeStart,deleteEmployeeSuccess,
       getEmployeesFailure, getEmployeesStart, getEmployeesSuccess, 
       updateEmployeeFailure, updateEmployeeStart, updateEmployeeSuccess} from "./employeesRedux"

//customers actions
import {createCustomerFailure, createCustomerStart, createCustomerSuccess, 
       deleteCustomerFailure, deleteCustomerStart, deleteCustomerSuccess, 
       getCustomersFailure, getCustomersStart, getCustomersSuccess, 
       updateCustomerFailure, updateCustomerStart, updateCustomerSuccess} from "./customersRedux"

//orders actions
import { createOrderFailure, createOrderStart, createOrderSuccess,
        deleteOrderFailure,deleteOrderStart,deleteOrderSuccess,
        getOrdersFailure, getOrdersStart, getOrdersSuccess,
        updateOrderFailure, updateOrderStart, updateOrderSuccess } from "./ordersRedux"


//expenses actions
import { createExpenseFailure, createExpenseStart, createExpenseSuccess,
        deleteExpenseFailure, deleteExpenseStart, deleteExpenseSuccess,
        getExpensesFailure, getExpensesStart, getExpensesSuccess, 
        updateExpenseFailure, updateExpenseStart, updateExpenseSuccess } from "./expensesRedux"

//transactions actions
import { createTransactionFailure, createTransactionSuccess, deleteTransactionFailure, 
       deleteTransactionStart, deleteTransactionSuccess, getTransactionsFailure, 
       getTransactionsStart, getTransactionsSuccess, updateTransactionFailure, 
       updateTransactionStart, updateTransactionSuccess } from "./transactionsRedux"

//productions section
//getting all products
export const getProducts = async (dispatch) => {
    dispatch(getProductsStart())
    try{
        const res = await adminRequests.get("/products")
        dispatch(getProductsSuccess(res.data))
    }catch(err){
        dispatch(getProductsFailure())
    }
}

//creating a product
export const createProduct = async (product,dispatch) => {
    dispatch(createProductStart())
    try{
        const res = await adminRequests.post(`/products`,product)
        dispatch(createProductSuccess(res.data))
    }catch(err){
        dispatch(createProductFailure())
    }
}

//updating a product
export const updateProduct = async (id,product,dispatch) => {
    dispatch(updateProductStart())
    try{
        await adminRequests.put(`/products/${id}`,product)
        dispatch(updateProductSuccess({id,product}))
    }catch(err){
        dispatch(updateProductFailure())
    }
}

//deleting a product
export const deleteProduct = async (id,dispatch) => {
    dispatch(deleteProductStart())
    try{
        await adminRequests.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id))
    }catch(err){
        dispatch(deleteProductFailure())
    }
}

//employees section
//getting all employees
export const getEmployees = async (dispatch) => {
    dispatch(getEmployeesStart())
    try{
        const res = await adminRequests.get("/employees")
        dispatch(getEmployeesSuccess(res.data))
    }catch(err){
        dispatch(getEmployeesFailure())
    }
}

//creating an employee
export const createEmployee = async (employee,dispatch) => {
    dispatch(createEmployeeStart())
    try{
       const res =  await adminRequests.post(`/employeesAuth/register`,employee)
        dispatch(createEmployeeSuccess(res.data))
    }catch(err){
        dispatch(createEmployeeFailure())
    }
}

//updating an employee
export const updateEmployee = async (id,employee,dispatch) => {
    dispatch(updateEmployeeStart())
    try{
        await adminRequests.put(`/employees/${id}`,employee)
        dispatch(updateEmployeeSuccess({id,employee}))
    }catch(err){
        dispatch(updateEmployeeFailure())
    }
}

//deleting an employee
export const deleteEmployee = async (id,dispatch) => {
    dispatch(deleteEmployeeStart())
    try{
        await adminRequests.delete(`/employees/${id}`)
        dispatch(deleteEmployeeSuccess(id))
    }catch(err){
        dispatch(deleteEmployeeFailure())
    }
}

//customers section
//getting all customers
export const getCustomers = async (dispatch) => {
    dispatch(getCustomersStart())
    try{
        const res = await adminRequests.get("/customers")
        dispatch(getCustomersSuccess(res.data))
    }catch(err){
        dispatch(getCustomersFailure())
    }
}

//creating a customer
export const createCustomer = async (customer,dispatch) => {
    dispatch(createCustomerStart())
    try{
        const res = await adminRequests.post("/customerAuth/register",customer)
        dispatch(createCustomerSuccess(res.data))
    }catch(err){
        dispatch(createCustomerFailure())
    }
}

//updating customer data
export const updateCustomer = async (id,customer,dispatch) => {
    dispatch(updateCustomerStart())
    try{
        await adminRequests.put(`/customers/${id}`,customer)
        dispatch(updateCustomerSuccess({id,customer}))
    }catch(err){
        dispatch(updateCustomerFailure())
    }
}

//deleting a customer
export const deleteCustomer = async (id,dispatch) => {
    dispatch(deleteCustomerStart())
    try{
        await adminRequests.delete(`/customers/${id}`)
        dispatch(deleteCustomerSuccess(id))
    }catch(err){
        dispatch(deleteCustomerFailure())
    }
}

//orders section
//getting all orders
export const getOrders = async (dispatch) => {
    dispatch(getOrdersStart())
    try{
        const res = await adminRequests.get("/orders")
        dispatch(getOrdersSuccess(res.data))
    }catch(err){
        dispatch(getOrdersFailure())
    }
}

//creating an order
export const createOrder = async (order,dispatch) => {
    dispatch(createOrderStart())
    try{
        const res = await adminRequests.post("/orders",order)
        dispatch(createOrderSuccess(res.data))
    }catch(err){
        dispatch(createOrderFailure())
    }
}

//updating order data
export const updateOrder = async (id,order,dispatch) => {
    dispatch(updateOrderStart())
    try{
        await adminRequests.put(`/orders/${id}`,order)
        dispatch(updateOrderSuccess({id,order}))
    }catch(err){
        dispatch(updateOrderFailure())
    }
}

//deleting an order
export const deleteOrder = async (id,dispatch) => {
    dispatch(deleteOrderStart())
    try{
        await adminRequests.delete(`/orders/${id}`)
        dispatch(deleteOrderSuccess(id))
    }catch(err){
        dispatch(deleteOrderFailure())
    }
}

//expenses section
//getting all expenses
export const getExpenses = async (dispatch) => {
    dispatch(getExpensesStart())
    try{
        const res = await adminRequests.get("/expenses")
        dispatch(getExpensesSuccess(res.data))
    }catch(err){
        dispatch(getExpensesFailure())
    }
}

//creating an expense
export const createExpense = async (expense,dispatch) => {
    dispatch(createExpenseStart())
    try{
        const res = await adminRequests.post("/expenses",expense)
        dispatch(createExpenseSuccess(res.data))
    }catch(err){
        dispatch(createExpenseFailure())
    }
}

//updating expense data
export const updateExpense = async (id,expense,dispatch) => {
    dispatch(updateExpenseStart())
    try{
        await adminRequests.put(`/expenses/${id}`,expense)
        dispatch(updateExpenseSuccess({id,expense}))
    }catch(err){
        dispatch(updateExpenseFailure())
    }
}

//deleting an expense
export const deleteExpense = async (id,dispatch) => {
    dispatch(deleteExpenseStart())
    try{
        await adminRequests.delete(`/expenses/${id}`)
        dispatch(deleteExpenseSuccess(id))
    }catch(err){
        dispatch(deleteExpenseFailure())
    }
}


//transactions section
//getting all transactions
export const getTransactions = async (dispatch) => {
    dispatch(getTransactionsStart())
    try{
        const res = await adminRequests.get("/transactions")
        dispatch(getTransactionsSuccess(res.data))
    }catch(err){
        dispatch(getTransactionsFailure())
    }
}

//creating a transaction
export const createTransaction = async (transaction,dispatch) => {
    dispatch(createExpenseStart())
    try{
        const res = await adminRequests.post("/transactions",transaction)
        dispatch(createTransactionSuccess(res.data))
    }catch(err){
        dispatch(createTransactionFailure())
    }
}

//updating a transaction
export const updateTransaction = async (id,transaction,dispatch) => {
    dispatch(updateTransactionStart())
    try{
        await adminRequests.put(`/transactions/${id}`,transaction)
        dispatch(updateTransactionSuccess({id,expense}))
    }catch(err){
        dispatch(updateTransactionFailure())
    }
}

//deleting an expense
export const deleteTransaction = async (id,dispatch) => {
    dispatch(deleteTransactionStart())
    try{
        await adminRequests.delete(`/transactions/${id}`)
        dispatch(deleteTransactionSuccess(id))
    }catch(err){
        dispatch(deleteTransactionFailure())
    }
}