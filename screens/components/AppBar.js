import { View, Text, Button } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function AppBar({ title, back }) {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 60,
        backgroundColor: "#2196F3",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {back && (
          <Button title="⬅️" color="#fff" onPress={() => navigation.goBack()} />
        )}
        <Text style={{ fontSize: 20, color: "white", marginLeft: back ? 10 : 0 }}>{title}</Text>
      </View>
      <Button title="Logout" color="#fff" onPress={logout} />
    </View>
  );
}
