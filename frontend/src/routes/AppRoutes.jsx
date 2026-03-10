import { createBrowserRouter } from 'react-router-dom'

import Login from '../features/auth/pages/Login'
import Registration from '../features/auth/pages/registration'
import Home from '../features/home/Home'



export const routers = createBrowserRouter([
    {
        path:"/",
        element: <Home/>
    },
    {
        path: '/registration',
        element: <Registration />
    },
    {
        path: '/login',
        element: <Login/>
    }
])