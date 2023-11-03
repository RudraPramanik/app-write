import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp } from '../screens/SignUp';
import { Login } from '../screens/Login';

export type AuthStackParamList = {
  SignUp: undefined;
  Login: undefined;
};
const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleStyle: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
