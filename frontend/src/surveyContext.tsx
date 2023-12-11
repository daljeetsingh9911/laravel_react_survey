import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { SingleSurvey } from './Types';

import data from './data.json';

export interface MyContextProps {
  surveys: SingleSurvey[];
  updateValue: (newValue: SingleSurvey) => void;
  userToken: String | undefined;
  updateUserToken: (Token: String) => void;
  removeLocalStorageData: () =>void;
}

const initialValues:MyContextProps = {
  surveys: [],
  updateValue: function (newValue: SingleSurvey): void {
    throw new Error('Function not implemented.');
  },
  userToken: undefined,
  updateUserToken: function (Token: String): void {
    throw new Error('Function not implemented.');
  },
  removeLocalStorageData: function (): void {
    throw new Error('Function not implemented.');
  }
}

const MyContext = createContext<MyContextProps>(initialValues);

interface MyContextProviderProps {
  children: ReactNode;
}

const SurveyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [surveys, setMyValue] = useState<SingleSurvey[]| any>(data as SingleSurvey[]);
  const [userToken, setUserToken] = useState<String | undefined>(undefined);

  // Storing data into local storage
  useEffect(() => {
      if(surveys){
        localStorage.setItem('surveys',JSON.stringify(surveys));
      }

      if(userToken){
        localStorage.setItem('userToken',JSON.stringify(userToken));
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


  const removeLocalStorageData = () => {
      localStorage.removeItem('surveys');
      localStorage.removeItem('userToken');
  }

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
    updateUserToken,
    removeLocalStorageData
  };

  return (
    <MyContext.Provider value={contextValues}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, SurveyContextProvider };
