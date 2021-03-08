import React from 'react';
import {SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SigninScr from './screens/SigninScr';
import OverviewScr from './screens/OverviewScr';
import BudgetingScr from './screens/BudgetingScr';
import MoneyJarScr from './screens/MoneyJarScr';
import DashboardScr from './screens/DashboardScr';
import { AuthContext } from './context';
const AuthStack = createStackNavigator();
const AppStack = createBottomTabNavigator();
const RootStack = createStackNavigator();

const AuthNavigation = () => {
  return(
    <AuthStack.Navigator headerMode='none'>
      <AuthStack.Screen name='Signin' component={SigninScr}/>
    </AuthStack.Navigator>
  )
}

const AppNavigation = () => {
  return(
      <AppStack.Navigator>
        <AppStack.Screen name='OverviewScr' component={OverviewScr}/>
        <AppStack.Screen name='BudgetingScr' component={BudgetingScr}/>
        <AppStack.Screen name='MoneyJarScr' component={MoneyJarScr}/>
        <AppStack.Screen name='DashboardScr' component={DashboardScr}/>
      </AppStack.Navigator>
  )
}

const RootNavigation = ({userToken}) => (
  <RootStack.Navigator headerMode='none'>
    {userToken ? (
      <RootStack.Screen name='App' component={AppNavigation}/>
    ):(
      <RootStack.Screen name='Auth' component={AuthNavigation}/>
    )}
  </RootStack.Navigator>
)

export default () => {
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setUserToken("asdf");
      },
      signUp: () => {
        setUserToken("asdf");
      },
      signOut: () => {
        setUserToken(null);
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <RootNavigation userToken={userToken} />
        </NavigationContainer>
    </AuthContext.Provider>
  );
};