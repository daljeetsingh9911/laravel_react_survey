import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'
import { SurveyContextProvider } from './context/surveyContext.tsx'
import App from './App.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <SurveyContextProvider>
     <BrowserRouter>
      <App/>
     </BrowserRouter>
    </SurveyContextProvider>
)
