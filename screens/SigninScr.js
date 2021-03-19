import React from "react";
import { AuthContext } from "../context";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export const SigninScr = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = React.useContext(AuthContext);

  const onCreateAccountPress = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Text>Sign In</Text>
      <TextInput
        style={{ width: 200, height: 40, borderWidth: 1, marginTop: 10 }}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        style={{ width: 200, height: 40, borderWidth: 1, marginTop: 10 }}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />

      <Button
        title="Sign In"
        onPress={() => signIn(email, password)}
        style={{ marginTop: 10 }}
      />
      <Button
        title="Sign up"
        onPress={onCreateAccountPress}
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SigninScr;
