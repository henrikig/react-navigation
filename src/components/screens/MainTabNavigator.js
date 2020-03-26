import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator, createBottomTabNavigator, createAppContainer, createDrawerNavigator, createSwitchNavigator, DrawerItems } from 'react-navigation';

import SignInScreen from './SignInScreen';
import PlaceDetailScreen from './PlaceDetail';
import FindPlaceScreen from './FindPlace';
import SharePlaceScreen from './SharePlace';

const FindPlaceStack = createStackNavigator(
  {
    FindPlace: FindPlaceScreen,
    PlaceDetails: PlaceDetailScreen,
  },
  {
    initialRouteName: "FindPlace",
    mode: 'modal',
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ paddingLeft: 15 }}>
          <Icon name="ios-menu" size={30} color="#fff" />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#7a9d96',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  }
);

const SharePlaceStack = createStackNavigator(
  {
    SharePlaceScreen: SharePlaceScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ paddingLeft: 15 }}>
          <Icon name="ios-menu" size={30} color="#000" />
        </TouchableOpacity>
      ),
    }),
  }
);

const TabStack = createBottomTabNavigator(
  {
    FindPlace: FindPlaceStack,
    SharePlace: SharePlaceStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        if (routeName === 'FindPlace') {
          iconName = Platform.OS === 'android' ? 'md-map' : 'ios-map';
        } else if (routeName === 'SharePlace') {
          iconName = Platform.OS === 'android' ? 'md-add-circle' : 'ios-add-circle';
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#3a4660',
      inactiveTintColor: 'gray',
    },
    navigationOptions: {
      drawerLabel: 'Places App',
      drawerIcon: ({ tintColor }) => (
        <Icon name={Platform.OS === 'android' ? 'md-home' : "ios-home"} size={20} color={"black"} />
      ),
    }
  }
);

const DrawerApp = createDrawerNavigator(
  {
    PlacesApp: TabStack,
  },
  {
    contentComponent:(props) => (
        <View style={{flex:1}}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                <DrawerItems {...props} />
                <View style={styles.drawerNav}>
                  <Icon name="ios-log-out" size={20} color={"#aaa"} />
                  <Button title="Logout" onPress={() => props.navigation.navigate('Auth')}/>
                </View>
            </SafeAreaView>
        </View>
    ),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
}
);

const AuthApp = createSwitchNavigator(
  {
    MainApp: DrawerApp,
    Auth: SignInScreen,
  },
  {
    initialRouteName: "MainApp",
  },
);

const styles = StyleSheet.create({
  drawerNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

const AppContainer = createAppContainer(AuthApp);
export default AppContainer;
