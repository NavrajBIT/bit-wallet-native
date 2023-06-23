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
      <MenuItem
        menu="Account Details"
        icon="account"
        route="AccountDetails"
        navigation={navigation}
      />
      <MenuItem
        menu="Browser"
        icon="web"
        route="Browser"
        navigation={navigation}
      />
      <MenuItem
        menu="Reset Account"
        icon="reload"
        route="ResetAccount"
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default Sidebar;

const MenuItem = ({ menu, icon, route, navigation }) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
      }}
      onPress={() => navigation.navigate(route)}
    >
      <Icon name={icon} color="white" size={20} />
      <Text style={{ color: "white", fontSize: 20 }}>{menu}</Text>
    </TouchableOpacity>
  );
};
