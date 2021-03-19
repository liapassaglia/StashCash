import React from 'react';
import config from './config/config'; // firebase key
import firebase from 'firebase';
import { Alert, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SigninScr from './screens/SigninScr';
import SignupScr from './screens/SignupScr';
import OverviewScr from './screens/OverviewScr';
import BudgetingScr from './screens/BudgetingScr';
import MoneyJarScr from './screens/MoneyJarScr';
import DashboardScr from './screens/DashboardScr';
import { AuthContext } from './context';
const AuthStack = createStackNavigator();
const AppStack = createBottomTabNavigator();
const RootStack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="Signin" component={SigninScr} />
      <AuthStack.Screen name="Signup" component={SignupScr} />
    </AuthStack.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="OverviewScr" component={OverviewScr} />
      <AppStack.Screen name="BudgetingScr" component={BudgetingScr} />
      <AppStack.Screen name="MoneyJarScr" component={MoneyJarScr} />
      <AppStack.Screen name="DashboardScr" component={DashboardScr} />
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
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

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
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => {
            console.log(firebase.auth().currentUser); // Prints logged user
            setIsAuthenticated(true);
          }, (error) => {
            Alert.alert(error.message); // does not work
            console.log(error.message);
          });
      },
      signUp: (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => {
            // Should redirect to login (or login at once)
          }, (error) => {
            Alert.alert(error.message) // does not work
            console.log(error.message)
          });
      },
      signOut: () => {
        firebase.auth().signOut()
          .then(() => {
            Alert.alert("Signed out") // does not work
            console.log("Signed out")
          }, (error) => {
            console.log(error.message)
          });
        setIsAuthenticated(false);

      },
    };
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootNavigation isAuthenticated={isAuthenticated} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
