import React from "react";
import { AuthContext } from "../context";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Button,
  TextInput,
} from "react-native";

export const SigninScr = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = React.useContext(AuthContext);

  const onCreateAccountPress = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Sign In</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />

        <Text style={styles.labelText}>Password</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>

      <View style={styles.buttonCountainer}>
        <TouchableOpacity
          onPress={() => signIn(email, password)}
          style={styles.signinButton}
          activeOpacity={0.8}
        >
          <Text style={styles.signinText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonCountainer}>
        <TouchableOpacity
          onPress={onCreateAccountPress}
          style={styles.signupButton}
          activeOpacity={0.8}
        >
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  buttonCountainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
  },
  inputContainer: {
    backgroundColor: "#fff",
    padding: 15,
  },
  textInput: {
    fontSize: 15,
    width: 300,
    height: 60,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  signinButton: {
    elevation: 10,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 300,
    height: 60,
  },
  signinText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  signupButton: {
    elevation: 10,
    backgroundColor: "#aeafb0",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 300,
    height: 60,
  },
  signupText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  labelText: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    alignSelf: "flex-start",
    textTransform: "uppercase",
    paddingVertical: 1,
  },
  titleText: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    //textTransform: "uppercase",
    paddingVertical: 1,
  },
});

export default SigninScr;
