import { StyleSheet, Text, View } from 'react-native';
import React, { FC, PropsWithChildren, createContext, useState } from 'react';
import Appwrite from './service';

type AppContextType = {
  appwrite: Appwrite;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const AppwriteContext = createContext<AppContextType>({
  appwrite: new Appwrite(),
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const appwriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const defaultValue = {
    appwrite: new Appwrite(),
    isLoggedIn: false,
    setIsLoggedIn,
  };
  return (
    <AppwriteContext.Provider value={defaultValue}>
      {children}
    </AppwriteContext.Provider>
  );
};

export default appwriteProvider;

const styles = StyleSheet.create({});
