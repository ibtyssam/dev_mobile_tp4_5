import { View, Text, Button } from "react-native";
// import { useDispatch } from "react-redux"; // Redux 
// import { removeTodo } from "../store/todosSlice"; // Redux 
import { useTodoStore } from "../store/useTodoStore";

export default function TodoDetailsScreen({ route, navigation }) {
  const { id, title } = route.params;
  // const dispatch = useDispatch(); // Redux (commented for progress)
  const { removeTodo: zRemoveTodo } = useTodoStore();

  const handleDelete = () => {
    zRemoveTodo(id);
    // dispatch(removeTodo(id)); // Redux 
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 30, marginBottom: 8 }}>{title}</Text>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>ID : {id}</Text>
      <Button title="Supprimer cette tâche" color="red" onPress={handleDelete} />
    </View>
  );
}
