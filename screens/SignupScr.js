import React from "react";
import { AuthContext } from "../context";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import {TextInput,Button} from 'react-native-paper';

export const SignupScr = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signUp } = React.useContext(AuthContext);

  const onBackLoginPress = () => {
    navigation.navigate("Signin");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(email)=>{setEmail(email)}}
          style={styles.inputBox}
          autoCorrect={false}
          keyboardType="email-address"
          autoCapitalize="none"
          theme={{colors: {primary: '#5B5B5B'}}}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(password)=>{setPassword(password)}}
          secureTextEntry={true}
          style={styles.inputBox}
          autoCorrect={false}
          autoCapitalize="none"
          theme={{colors: {primary: '#5B5B5B'}}}
        />
      </View>
      <Button
        mode="contained"
        uppercase={false}
        style={styles.button}
        onPress={() => signUp(email, password)}
      >
        <Text style={{fontSize:20}}>Sign Up</Text>
      </Button>
      <Button
        mode="contained"
        uppercase={false}
        style={styles.button}
        onPress={() => onBackLoginPress()}
      >
        <Text style={{fontSize:20}}>Back to login</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#D0E2D0',
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  buttonCountainer: {
    backgroundColor: '#fafafa',
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
  },
  inputContainer: {
    backgroundColor: '#fafafa',
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
  inputBox:{
    height: 50,
    width: 300,
    backgroundColor: '#ffffff',
    marginBottom: 25,
    alignSelf: 'center',
    fontSize: 20,
  },
  button: {
    height:45,
    width: 200,
    backgroundColor: '#4B674C',
    fontSize: 20,
    alignSelf: 'center',
    marginTop:20,
    marginBottom:5,
    borderColor:'white',
    borderWidth:1,
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
    paddingVertical: 20,
  },
});

export default SignupScr;
