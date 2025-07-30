import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap CSS
import '@mui/material/styles' // MUI CSS
import { AuthProvider } from './components/Auth.jsx' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider>
    <App />
    </AuthProvider> 
  </React.StrictMode>,
)