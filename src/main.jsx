import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import userReducer from './reducers/userReducer.js'



const store = configureStore({
reducer:{
  userReducer
}
})



const colors = {
  brand: {
    900: '#E9813B',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
