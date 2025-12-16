import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoListScreen from "../TodoListScreen";
import TodoDetailsScreen from "../TodoDetailsScreen";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Liste" component={TodoListScreen} />
      <Stack.Screen name="Détails" component={TodoDetailsScreen} />
    </Stack.Navigator>
  );
}
