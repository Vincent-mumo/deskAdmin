import {adminRequests} from "../utils/requestMethods"



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










//employees section
//getting all employees
export const getEmployees = async (dispatch) => {
    dispatch(getEmployeesStart())
    try{
        const res = await adminRequests.get("/staffs")
        dispatch(getEmployeesSuccess(res.data))
    }catch(err){
        dispatch(getEmployeesFailure())
    }
}

//creating an employee
export const createEmployee = async (employee,dispatch) => {
    dispatch(createEmployeeStart())
    try{
       const res =  await adminRequests.post(`/staffAuth/register`,employee)
        dispatch(createEmployeeSuccess(res.data))
    }catch(err){
        dispatch(createEmployeeFailure())
    }
}

//updating an employee
export const updateEmployee = async (id,employee,dispatch) => {
    dispatch(updateEmployeeStart())
    try{
        await adminRequests.put(`/staffs/${id}`,employee)
        dispatch(updateEmployeeSuccess({id,employee}))
    }catch(err){
        dispatch(updateEmployeeFailure())
    }
}

//deleting an employee
export const deleteEmployee = async (id,dispatch) => {
    dispatch(deleteEmployeeStart())
    try{
        await adminRequests.delete(`/staffs/${id}`)
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
        const res = await adminRequests.get("/users")
        dispatch(getCustomersSuccess(res.data))
    }catch(err){
        dispatch(getCustomersFailure())
    }
}

//creating a customer
export const createCustomer = async (customer,dispatch) => {
    dispatch(createCustomerStart())
    try{
        const res = await adminRequests.post("/auth/register",customer)
        dispatch(createCustomerSuccess(res.data))
    }catch(err){
        dispatch(createCustomerFailure())
    }
}

//updating customer data
export const updateCustomer = async (id,customer,dispatch) => {
    dispatch(updateCustomerStart())
    try{
        await adminRequests.put(`/users/${id}`,customer)
        dispatch(updateCustomerSuccess({id,customer}))
    }catch(err){
        dispatch(updateCustomerFailure())
    }
}

//deleting a customer
export const deleteCustomer = async (id,dispatch) => {
    dispatch(deleteCustomerStart())
    try{
        await adminRequests.delete(`/users/${id}`)
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
        const res = await adminRequests.get("/tickets")
        dispatch(getOrdersSuccess(res.data))
    }catch(err){
        dispatch(getOrdersFailure())
    }
}

//creating an order
export const createOrder = async (order,dispatch) => {
    dispatch(createOrderStart())
    try{
        const res = await adminRequests.post("/tickets",order)
        dispatch(createOrderSuccess(res.data))
    }catch(err){
        dispatch(createOrderFailure())
    }
}

//updating order data
export const updateOrder = async (id,order,dispatch) => {
    dispatch(updateOrderStart())
    try{
        await adminRequests.put(`/tickets/${id}`,order)
        dispatch(updateOrderSuccess({id,order}))
    }catch(err){
        dispatch(updateOrderFailure())
    }
}

//deleting an order
export const deleteOrder = async (id,dispatch) => {
    dispatch(deleteOrderStart())
    try{
        await adminRequests.delete(`/tickets/${id}`)
        dispatch(deleteOrderSuccess(id))
    }catch(err){
        dispatch(deleteOrderFailure())
    }
}
















