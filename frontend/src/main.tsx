import React from 'react'
import ReactDOM from 'react-dom/client'
import RoutesPath from './routes.tsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={RoutesPath} />
  </React.StrictMode>,
)
