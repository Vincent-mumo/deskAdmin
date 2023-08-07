import {configureStore,combineReducers} from "@reduxjs/toolkit"
import productsReducer from "./productsRedux"
import customersReducer from "./customersRedux"
import employeesReducer from "./employeesRedux"
import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from "redux-persist";
import storage from "redux-persist/lib/storage";
import ordersRedux from "./ordersRedux";
import expensesRedux from "./expensesRedux";
import transactionsRedux from "./transactionsRedux";

const peristConfig = {key:"root",version:1,storage}

const rootReducer = combineReducers({
    product:productsReducer,
    customer:customersReducer,
    employee:employeesReducer,
    order:ordersRedux,
    expense:expensesRedux,
    transaction:transactionsRedux
})

const persistedReducer = persistReducer(peristConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}
      }),
})

export let persistor = persistStore(store);