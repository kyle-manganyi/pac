import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import player from './components/players/player'
import LoginScreen from './screens/LoginScreen'
import Register from './screens/RegisterScreen'
import ResetPassword from './screens/ForgotPassword'
import Search from './components/searchbar/testSearch'
import ExploreChannel from './screens/ExploreChannelScreen'
import AllExploreChannel from './screens/ViewAllScreen'
import albumExplore from './screens/exploreAlbum'
import catergoryResult from './components/catergoryresults/catergoryResults'



const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer>
          <Stack.Navigator initialRouteName={"login"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="player" component={player} />
            <Stack.Screen name="resetpassword" component={ResetPassword} />
            <Stack.Screen name="search" component={Search} />
            <Stack.Screen name="explore-channel" component={ExploreChannel} />
            <Stack.Screen name="all-explore-channel" component={AllExploreChannel} />
            <Stack.Screen name="explore-album" component={albumExplore} />
            <Stack.Screen name="catergory-results" component={catergoryResult} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131212',
  },
});
