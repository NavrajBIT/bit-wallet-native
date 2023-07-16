import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, IconButton, Button } from "@react-native-material/core";
import { useState, useEffect } from "react";
import useDB from "../../db/db";

const Navbar = ({ navigation }) => {
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const db = useDB();

  useEffect(() => {
    db.dbRead("networks")
      .then((res) => {
        res.map((network) => {
          if (network.isSelected === 1) {
            setSelectedNetwork(network);
          }
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      <IconButton
        icon={(props) => <Icon name="menu" {...props} />}
        color="white"
        onPress={() => navigation.navigate("Sidebar")}
      />

      <TouchableOpacity
        style={{
          width: "40%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: "white",
          borderRadius: 10,
          padding: 10,
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
        onPress={() => navigation.navigate("Network")}
      >
        <Text style={{ color: "white", fontSize: 15 }}>
          {selectedNetwork.name}
        </Text>
        <Icon name="arrow-down" style={{ color: "white", fontSize: 20 }} />
      </TouchableOpacity>
      <Image
        source={require("../../../assets/icon.png")}
        style={{ height: 50, width: 40 }}
      />
    </View>
  );
};

export default Navbar;
