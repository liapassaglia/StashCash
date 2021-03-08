import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SigninScr from './screens/SigninScr';
import OverviewScr from './screens/OverviewScr';

const AuthStack = createStackNavigator();
const AppStack = createBottomTabNavigator();

const AuthNavigation = () => {
  return(
    <NavigationContainer>
        <AuthStack.Navigator>
            <AuthStack.Screen name='Signin' component={SigninScr}/>
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