import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthContext } from '../context';

export const SigninScr = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Sign In Screen</Text>
      <Button title="Sign In" onPress={() => signIn()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SigninScr;