import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SigninScr from './screens/SigninScr';
import SignupScr from './screens/SignupScr'
import OverviewScr from './screens/OverviewScr';

const AuthStack = createStackNavigator();
const AppStack = createBottomTabNavigator();

const AuthNavigation = () => {
  return(
    <NavigationContainer>
        <AuthStack.Navigator>
            <AuthStack.Screen name='Signin' component={SigninScr}/>
            <AuthStack.Screen name='Signup' component={SignupScr}/>
        </AuthStack.Navigator>
    </NavigationContainer>
  )
}

const AppNavigation = () => {
  return(
    <AppStack.Navigator>
      <AppStack.Screen name='OverviewScr' component={OverviewScr}/>
    </AppStack.Navigator>
  )
}

export default AuthNavigation;