import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Profile from '../screens/Profile';
import Notifications from '../screens/notification';




import ExploreScreen from '../screens/ExploreScreen'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
        }}
      />
      <BottomTab.Screen
        name="notification"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="bell" />,
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="play-circle" />,
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="user" />,
        }}
      />
    </BottomTab.Navigator>
  );
}
