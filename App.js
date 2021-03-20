import 'react-native-gesture-handler'
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import {SafeAreaView} from 'react-native';
import { NavigationContainer, CreateAppContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SigninScr from './screens/SigninScr';
import OverviewScr from './screens/OverviewScr';
import BudgetingScr from './screens/BudgetingScr';
import MoneyJarScr from './screens/MoneyJarScr';
import DashboardScr from './screens/DashboardScr';
import { AuthContext } from './context';
import {Appbar} from 'react-native-paper';

const AuthStack = createStackNavigator();
const AppStack = createBottomTabNavigator();
const RootStack = createStackNavigator();

function CustomeNavigationBar({navigation}){
  return(
    <Appbar.Header style={{backgroundColor:'black'}}>
      <Appbar.Content title="Stash Cash"/>
    </Appbar.Header>
  );
}

const AuthNavigation = () => {
  return(
      <AuthStack.Navigator headerMode='none'>
        <AuthStack.Screen name='Signin' component={SigninScr}/>
      </AuthStack.Navigator>
  )
}

const AppNavigation = () => {
  return(
      <AppStack.Navigator
        screenOptions={{
          header: (props)=> <CustomeNavigationBar{...props}/>
      }}>
        <AppStack.Screen name='OverviewScr' component={OverviewScr}/>
        <AppStack.Screen name='BudgetingScr' component={BudgetingScr}/>
        <AppStack.Screen name='MoneyJarScr' component={MoneyJarScr} options={{title:'Money Jars'}}/>
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

export default function Main() {
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
    <PaperProvider>
      <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            <RootNavigation userToken={userToken} />
          </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};
