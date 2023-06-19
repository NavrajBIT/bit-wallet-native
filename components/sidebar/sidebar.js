import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Icon, IconButton, Button } from "@react-native-material/core";

const Sidebar = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black", padding: 10 }}>
      <Text style={{ color: "blue", fontSize: 50, textAlign: "center" }}>
        BitWallet
      </Text>
      <Button
        title="Close"
        trailing={(props) => <Icon name="close" {...props} />}
        style={{ backgroundColor: "red", width: 100 }}
        onPress={() => navigation.navigate("Home")}
      />

      <View
        style={{
          padding: 10,
          borderBottomColor: "grey",
          borderBottomWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Icon name="account" color="white" size={20} />
        <Text style={{ color: "white", fontSize: 20 }}>Account details</Text>
      </View>

      <TouchableOpacity
        style={{
          padding: 10,
          borderBottomColor: "grey",
          borderBottomWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
        onPress={() => navigation.navigate("Browser")}
      >
        <Icon name="web" color="white" size={20} />
        <Text style={{ color: "white", fontSize: 20 }}>Browser</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Sidebar;
