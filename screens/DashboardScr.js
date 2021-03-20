import React from 'react';
import { AuthContext } from '../context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';


export default function DashboardScr({navigation}) {
  const { signOut } = React.useContext(AuthContext);

  const onBackLoginPress = () => {
    navigation.navigate('Signin');
  };

  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <Button
        title="Sign Out"
        onPress={() => signOut()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
