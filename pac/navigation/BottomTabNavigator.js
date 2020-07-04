import { createBottomTabNavigator,  } from '@react-navigation/bottom-tabs';

import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import ExploreScreen from '../screens/ExploreScreen';
import Search from '../components/searchbar/testSearch'


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} 
        tabBarOptions={{
          keyboardHidesTabBar: true,
          activeTintColor: "#FE2851",
          style:{
            backgroundColor:"#232524",
            
          }
        }}

    
      >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
          
        }}
      />
      {/* <BottomTab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="search" />,
        }}
        tab
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user" />,
        }}
      /> */}
    </BottomTab.Navigator>
  );
}
