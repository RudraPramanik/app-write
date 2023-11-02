import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppwriteContext } from '../appwrite/appwriteContext';
import Loading from '../components/Loading';
// routes
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export const Router = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { appwrite, isLoggedIn, setIsLoggedIn } = useContext(AppwriteContext);

  useEffect(() => {
    appwrite
      .getCurrentUser()
      .then((response) => {
        setIsLoggedIn(false);
        if (response) {
          setIsLoggedIn(true);
        }
      })
      .catch((_) => {
        setIsLoading(false);
        setIsLoggedIn(false);
      });
  }, [appwrite, setIsLoggedIn]);
  if (Loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
