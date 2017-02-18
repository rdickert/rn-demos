import Exponent from 'exponent';
import React from 'react';

import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import RecentChatsScreen from './screens/RecentChatsScreen';
import AllContactsScreen from './screens/AllContactsScreen';

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
});

MainScreenNavigator.navigationOptions = {
  title: 'My Chats',
};

const App = StackNavigator({
  Home: { screen: MainScreenNavigator },
  Chat: { screen: ChatScreen },
});


Exponent.registerRootComponent(App);
