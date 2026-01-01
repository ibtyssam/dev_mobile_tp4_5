import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NativeFeaturesScreen from "../NativeFeaturesScreen";
import CameraScreen from "../CameraScreen";
import LocationScreen from "../LocationScreen";
import ContactsScreen from "../ContactsScreen";
import NotificationsScreen from "../NotificationsScreen";
const Stack = createNativeStackNavigator();
export default function NativeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Fonctionnalités" component={NativeFeaturesScreen} />
      <Stack.Screen name="Caméra" component={CameraScreen} />
      <Stack.Screen name="Localisation" component={LocationScreen} />
      <Stack.Screen name="Contacts" component={ContactsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}
