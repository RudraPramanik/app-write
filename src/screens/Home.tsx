import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
//react native elements
import { FAB } from '@rneui/themed';
//context api
import { AppwriteContext } from '../appwrite/appwriteContext';

type UserObj = {
  name: string;
  email: string;
};

const Home = () => {
  const [userData, setUserData] = useState<UserObj>();
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);
  const handleLogout = () => {
    appwrite.getAccountDelete().then(() => {
      setIsLoggedIn(false);
    });
  };

  useEffect(() => {
    appwrite.getCurrentUser().then((respone) => {
      if (respone) {
        const user: UserObj = {
          name: respone.name,
          email: respone.email,
        };
        setUserData(user);
      }
    });
  }, [appwrite]);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,

    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});
