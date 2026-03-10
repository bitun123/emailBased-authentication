import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { routers } from "./routes/AppRoutes"
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div>   <RouterProvider router={routers} />

      <ToastContainer />
    </div>


  )
}

export default App