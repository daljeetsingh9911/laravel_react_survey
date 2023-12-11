import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css'


import 'bootstrap/dist/css/bootstrap.min.css';
import { SurveyContextProvider } from './surveyContext.tsx'
import App from './App.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SurveyContextProvider>
     <BrowserRouter>
      <App/>
     </BrowserRouter>
    </SurveyContextProvider>
  </React.StrictMode>,
)
