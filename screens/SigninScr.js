import React from "react";
import { AuthContext } from "../context";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image
} from "react-native";
import logo from '../assets/images/StashCash.png';
import { TextInput,Button } from 'react-native-paper';


export const SigninScr = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = React.useContext(AuthContext);

  const onCreateAccountPress = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={logo} style={{width:200,height:200}}/>
      </View>
      <Text style={styles.titleText}>Sign In</Text>
      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(email)=>{setEmail(email)}}
          style={styles.inputBox}
          autoCorrect={false}
          autoCapitalize="none"
          theme={{colors: {primary: '#5B5B5B'}}}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(password)=>{setPassword(password)}}
          style={styles.inputBox}
          autoCorrect={false}
          secureTextEntry={true}
          autoCapitalize="none"
          theme={{colors: {primary: '#5B5B5B'}}}
        />
      </View>
      <Button
        mode="contained"
        uppercase={false}
        style={styles.button}
        onPress={() => signIn(email, password)}
      >
        <Text style={{fontSize:20}}>Sign In</Text>
      </Button>
      <Button
        mode="contained"
        uppercase={false}
        style={styles.button}
        onPress={() => onCreateAccountPress()}
      >
        <Text style={{fontSize:20}}>Sign Up</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0E2D0',
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
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
  inputContainer: {
    backgroundColor: '#fafafa',
    padding: 15,
    marginTop:25,
  },
  inputBox:{
    height: 50,
    width: 300,
    backgroundColor: '#fafafa',
    marginBottom: 25,
    alignSelf: 'center',
    fontSize: 20,
  },
  signinText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
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
    paddingTop: 25
  },
});

export default SigninScr;
