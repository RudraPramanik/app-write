import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
//react native elements
import { FAB } from '@rneui/themed';
//context api
import { AppwriteContext } from '../appwrite/appwriteContext';
import { Image } from 'react-native';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={{
            uri: 'https://appwrite.io/images-ee/blog/og-private-beta.png',
            width: 400,
            height: 300,
            cache: 'default',
          }}
          resizeMode="contain"
        />
        <Text style={styles.message}>
          Build Fast. Scale Big. All in One Place.
        </Text>
        {userData && (
          <View style={styles.userContainer}>
            <Text style={styles.userDetails}>{userData.name}</Text>
            <Text style={styles.userDetails}>{userData.email}</Text>
          </View>
        )}
      </View>
      <FAB
        placement="right"
        color="#f02e65"
        size="large"
        title="Logout"
        icon={{ name: 'logout', color: '#FFFFFF' }}
        onPress={handleLogout}
      />
    </SafeAreaView>
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
