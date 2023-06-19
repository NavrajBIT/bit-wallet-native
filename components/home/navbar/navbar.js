import { Text, View, Image, StyleSheet } from "react-native";
import { Icon, IconButton, Button } from "@react-native-material/core";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

const Navbar = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("apple");
  const [items, setItems] = useState([
    { label: "Polygon Mainnet", value: "apple" },
    { label: "Polygon Testnet", value: "banana" },
  ]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <IconButton
        icon={(props) => <Icon name="menu" {...props} />}
        color="white"
        onPress={() => navigation.navigate("Sidebar")}
      />

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        containerStyle={{
          flex: 1,
          marginLeft: 20,
          marginRight: 20,
        }}
      />
      <Image
        source={require("../../../assets/icon.png")}
        style={{ height: 50, width: 40 }}
      />
    </View>
  );
};

export default Navbar;
