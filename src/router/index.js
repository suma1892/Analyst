import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {BottomNavigator} from '../components';
import {
  Home,
  Others,
  Login,
  Register,
  ListDetail,
  DetailProcurement,
  Preview,
  Setting,
  DeviceInfo,
} from '../pages';
import Alert from '../components/CustomAlert';
const Stack = createStackNavigator();
const MainStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      backBehavior="none"
      initialRouteName={'HOME'}
      tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen options={{headerShown: false}} name="HOME" component={Home} />
      <Tab.Screen
        options={{headerShown: false}}
        name="CHART"
        component={Dummy}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="ANALYSIS"
        component={Dummy}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="LIST DATA"
        component={Dummy}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="OTHERS"
        component={Others}
      />
    </Tab.Navigator>
  );
};

const Dummy = () => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    }}>
    <Text>Comming Soon :)</Text>
  </View>
);

const Auth = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="register"
        component={Register}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="setting"
        component={Setting}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

const MainStackScreen = ({route}) => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="setting"
        component={Setting}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="device-info"
        component={DeviceInfo}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="list-detail"
        component={ListDetail}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="detail-procurement"
        component={DetailProcurement}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="preview"
        component={Preview}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
};

const Router = () => {
  const isSignedIn = useSelector(state => state.loginData);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Alert />
      <NavigationContainer>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {isSignedIn.loggedIn ? (
            <>
              {
                <>
                  {/* <Stack.Screen name="MainTab" component={Auth} /> */}
                  <Stack.Screen name="MainTab" component={MainTab} />
                  <Stack.Screen name="MainStack" component={MainStackScreen} />
                </>
              }
            </>
          ) : (
            <>
              <Stack.Screen name="Auth" component={Auth} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Router;
