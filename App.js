import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Provider } from "react-redux";
import { store } from "./store/store";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import TodoListScreen from "./screens/TodoListScreen";
import TodoDetailsScreen from "./screens/TodoDetailsScreen";
import SettingScreen from "./screens/SettingScreen";
import ProfileScreen from "./screens/ProfileScreen";

import AuthProvider, { AuthContext } from "./screens/context/AuthContext";
import TodoListFetchScreen from "./screens/TodoListFetchScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Liste" component={TodoListScreen} />
      <Stack.Screen name="Détails" component={TodoDetailsScreen} />
    </Stack.Navigator>
  );
}

function TasksTabs({ initialRouteName = "Liste" }) {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let icon = "list";
          if (route.name === "Paramètres") icon = "settings";
          if (route.name === "AccueilTab") icon = "home";
          if (route.name === "Liste") icon = "list";
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="AccueilTab" component={HomeScreen} options={{ title: "Accueil" }} />
      <Tab.Screen name="Liste" component={AppStack} />
      <Tab.Screen name="Paramètres" component={SettingScreen} />
    </Tab.Navigator>
  );
}

function AppDrawer() {
  const TabsAccueil = () => <TasksTabs initialRouteName="AccueilTab" />;
  const TabsListe = () => <TasksTabs initialRouteName="Liste" />;
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Accueil" component={TabsAccueil} />
      <Drawer.Screen name="Tâches" component={TabsListe} />
      <Drawer.Screen name="Profil" component={ProfileScreen} />
      <Drawer.Screen name="API Todos" component={TodoListFetchScreen} />
      {/* Offline Todos removed as requested */}
    </Drawer.Navigator>
  );
}

function RootNavigator() {
  const { user } = useContext(AuthContext) || {};
  return user ? <AppDrawer /> : <LoginScreen />;
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
}


