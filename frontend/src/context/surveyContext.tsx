import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { SingleSurvey } from '../utils/Types';

import data from '../data.json';

export interface MyContextProps {
  surveys: SingleSurvey[];
  updateValue: (newValue: SingleSurvey) => void;
  userToken: String | undefined;
  updateUserToken: (Token: String) => void;
}

const initialValues:MyContextProps = {
  surveys: [],
  updateValue: function (newValue: SingleSurvey): void {
    throw new Error('Function not implemented.');
  },
  userToken: undefined,
  updateUserToken: function (Token: String): void {
    throw new Error('Function not implemented.');
  }
}

const MyContext = createContext<MyContextProps>(initialValues);

interface MyContextProviderProps {
  children: ReactNode;
}


export const removeLocalStorageData = () => {
  localStorage.removeItem('surveys');
  localStorage.removeItem('userToken');
  window.location.href = `${window.location.origin}/login`;
}

const SurveyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [surveys, setMyValue] = useState<SingleSurvey[]| any>(data as SingleSurvey[]);
  const [userToken, setUserToken] = useState<String | any>(undefined);

  // Storing data into local storage
  useEffect(() => {
      if(surveys){
        localStorage.setItem('surveys',JSON.stringify(surveys));
      }

      if(userToken){
        localStorage.setItem('userToken',userToken);
      }
  }, [userToken,surveys]);

// Fetching and restoring data from local storage

  useEffect(() => {
    let surveysLocalStorage = localStorage.getItem('surveys');
    let userTokenLocalStorage = localStorage.getItem('userToken');

    if(surveysLocalStorage){
      setMyValue(JSON.parse(surveysLocalStorage));
    }
    if(userTokenLocalStorage){
      setUserToken(JSON.parse(userTokenLocalStorage));
    }
  }, []);


  const updateValue = (newValue:SingleSurvey) => {
    setMyValue((prev: any)=>[...prev, newValue]);
  };

  const updateUserToken = (Token:String) => {
    setUserToken(Token);
  }

  const contextValues: MyContextProps = {
    surveys,
    updateValue,
    userToken,
    updateUserToken
  };

  return (
    <MyContext.Provider value={contextValues}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, SurveyContextProvider };
