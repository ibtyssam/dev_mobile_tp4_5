import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStack from './AppStack';
import TodoListFetchScreen from '../TodoListFetchScreen';
import SettingScreen from '../SettingScreen';
import HomeScreen from '../HomeScreen';
import TodoListOfflineScreen from '../TodoListOfflineScreen';

const Tab = createBottomTabNavigator();

export default function TasksTabs({ initialRouteName = 'Liste' }) {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let icon = 'list';
          if (route.name === 'Paramètres') icon = 'settings';
          if (route.name === 'Accueil') icon = 'home';
          if (route.name === 'Liste') icon = 'list';
          if (route.name === 'API') icon = 'cloud';
          if (route.name === 'Offline') icon = 'cloud';
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Liste" component={AppStack} />
      <Tab.Screen name="Paramètres" component={SettingScreen} />
      <Tab.Screen name="API" component={TodoListFetchScreen} />
      <Tab.Screen name="Offline" component={TodoListOfflineScreen} />
    </Tab.Navigator>
  );
}
