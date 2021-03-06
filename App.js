import React from "react";
import "react-native-gesture-handler";
import config from "./config/config"; // firebase key
import firebase from "firebase";
import { Alert, SafeAreaView } from "react-native";
import {
  NavigationContainer,
  CreateAppContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import { Appbar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

import SigninScr from "./screens/SigninScr";
import SignupScr from "./screens/SignupScr";
import OverviewScr from "./screens/OverviewScr";
import BudgetingScr from "./screens/BudgetingScr";
import MoneyJarScr from "./screens/MoneyJarScr";
import DashboardScr from "./screens/DashboardScr";
import { AuthContext } from "./context";
import { addNewUser } from "./util/firestoreMethods";

const AuthStack = createStackNavigator();
const AppStack = createBottomTabNavigator();
const RootStack = createStackNavigator();

function CustomeNavigationBar({ navigation }) {
  return (
    <Appbar.Header style={{ backgroundColor: "black" }}>
      <Appbar.Content title="Stash Cash" />
    </Appbar.Header>
  );
}

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="Signin" component={SigninScr} />
      <AuthStack.Screen name="Signup" component={SignupScr} />
    </AuthStack.Navigator>
  );
};

// const AppNavigation = () => {
//   return (
//     <AppStack.Navigator>
//       <AppStack.Screen name="OverviewScr" component={OverviewScr} />
//       <AppStack.Screen name="BudgetingScr" component={BudgetingScr} />
//       <AppStack.Screen name="MoneyJarScr" component={MoneyJarScr} />
//       <AppStack.Screen name="DashboardScr" component={DashboardScr} />
//     </AppStack.Navigator>
//   );
// };
// =======
//   return(
//       <AuthStack.Navigator headerMode='none'>
//         <AuthStack.Screen name='Signin' component={SigninScr}/>
//       </AuthStack.Navigator>
//   )
//}
// bad practice probably
let userCredentials = { email: "", password: "" };

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        header: (props) => <CustomeNavigationBar {...props} />,
      }}
      tabBarOptions={{
        activeTintColor: "#4B674C",
        height: 60,
      }}
    >
      <AppStack.Screen
        name="OverviewScr"
        component={OverviewScr}
        options={{
          title: "Overview",
          tabBarIcon: ({ color, size }) => (
            <Icon name="pie-chart" color={color} size={size} />
          ),
        }}
      />
      <AppStack.Screen
        name="BudgetingScr"
        component={BudgetingScr}
        options={{
          title: "Budgeting",
          tabBarIcon: ({ color, size }) => (
            <Icon name="create" color={color} size={size} />
          ),
        }}
      />
      <AppStack.Screen
        name="MoneyJarScr"
        component={MoneyJarScr}
        options={{
          title: "Money Jars",
          tabBarIcon: ({ color, size }) => (
            <Icon name="logo-usd" color={color} size={size} />
          ),
        }}
      />
      <AppStack.Screen
        name="DashboardScr"
        component={DashboardScr}
        options={{
          title: "User Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-circle" color={color} size={size} />
          ),
          userCredentials: userCredentials,
        }}
      />
    </AppStack.Navigator>
  );
};

const RootNavigation = ({ isAuthenticated }) => (
  <RootStack.Navigator headerMode="none">
    {isAuthenticated ? (
      <RootStack.Screen name="App" component={AppNavigation} />
    ) : (
      <RootStack.Screen name="Auth" component={AuthNavigation} />
    )}
  </RootStack.Navigator>
);

export default () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebaseConfig);
    // Each time the user signs in/out it calls this function
    firebase.auth().onAuthStateChanged((user) => {
      setIsAuthenticated(!!isAuthenticated);
    });
  }

  const authContext = React.useMemo(() => {
    return {
      signIn: (email, password) => {
        userCredentials.email = email;
        userCredentials.password = password;
        console.log("printing userCredentials: ", userCredentials);
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(
            () => {
              //console.log(firebase.auth().currentUser); // Prints logged user

              setIsAuthenticated(true);
              console.log("Login successful!");
            },
            (error) => {
              //Alert.alert(error.message); // does not work
              Alert.alert("Login error", error.message);
              console.log("Login failed", error.message);
            }
          );
      },
      signUp: (email, password) => {
        userCredentials.email = email;
        userCredentials.password = password;

        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(
            () => {
              // Add user to Firestore database
              addNewUser(firebase.auth().currentUser.uid);

              // Should redirect to login (or login at once)
              Alert.alert(
                "Account succesfully created!",
                "You will be redirected to the Login page to login."
              );
              setIsAuthenticated(true);
              console.log("Signup successful!");
            },
            (error) => {
              Alert.alert("Signup error", error.message);
              console.log("Signup failed", error.message);
            }
          );
      },
      signOut: () => {
        firebase
          .auth()
          .signOut()
          .then(
            () => {
              userCredentials.email = "";
              userCredentials.password = "";
              Alert.alert("Signed out"); // does not work
              console.log("Signed out");
            },
            (error) => {
              console.log(error.message);
            }
          );
        setIsAuthenticated(false);
      },
    };
  }, []);
  //<<<<<<< auth
  //     <AuthContext.Provider value={authContext}>
  //       <NavigationContainer>
  //         <RootNavigation isAuthenticated={isAuthenticated} />
  //       </NavigationContainer>
  //     </AuthContext.Provider>
  return (
    <PaperProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <RootNavigation isAuthenticated={isAuthenticated} />
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};
