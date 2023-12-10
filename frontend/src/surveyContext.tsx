import React, { createContext, useState, ReactNode } from 'react';
import { SingleSurvey } from './Types';

import data from './data.json';

export interface MyContextProps {
  surveys: SingleSurvey[];
  updateValue: (newValue: SingleSurvey) => void;
  userToken: String | undefined;
  updateUserToken: (Token: String) => void
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

const SurveyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [surveys, setMyValue] = useState<SingleSurvey[]| any>(data as SingleSurvey[]);
  const [userToken, setUserToken] = useState<String | undefined>(undefined);


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
  };

  return (
    <MyContext.Provider value={contextValues}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, SurveyContextProvider };
