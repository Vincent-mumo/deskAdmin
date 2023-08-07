import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext'
import { Provider } from 'react-redux'
import {PersistGate} from "redux-persist/integration/react"
import {persistor, store} from "./redux/store"

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
       <Provider store={store}>
        <PersistGate loading="null" persistor={persistor}>
           <App/>
        </PersistGate>
       </Provider>
   </AuthContextProvider>
)
