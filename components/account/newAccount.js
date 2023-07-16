import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Icon, IconButton, Button } from "@react-native-material/core";
import { useState, useEffect } from "react";
import CreateAccount from "./createAccount";
import useDB from "../db/db";

const NewAccount = ({ navigation }) => {
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const [selectedOption, setSelectedOption] = useState("");

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

  if (selectedOption !== "")
    return (
      <CreateAccount
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedNetwork={selectedNetwork}
        navigation={navigation}
      />
    );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        padding: 10,
        gap: 20,
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: "blue", fontSize: 50, textAlign: "center" }}>
        Welcome to BitWallet
      </Text>

      <NetworkSelector
        navigation={navigation}
        selectedNetwork={selectedNetwork}
      />

      <View>
        <Text style={{ color: "white", fontSize: 30 }}>Create New Account</Text>
        <Button
          title="Create New Account"
          trailing={(props) => <Icon name="wallet" {...props} />}
          style={{ margin: 20 }}
          onPress={() => setSelectedOption("createAccount")}
        />
      </View>
      <View>
        <Text style={{ color: "white", fontSize: 30 }}>Import Account</Text>
        <Button
          title="Import Account"
          trailing={(props) => <Icon name="wallet" {...props} />}
          style={{ margin: 20 }}
          onPress={() => setSelectedOption("importAccount")}
        />
      </View>
      <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
        Powered by: NEAR Protocol
      </Text>
    </SafeAreaView>
  );
};

export default NewAccount;

const NetworkSelector = ({ navigation, selectedNetwork }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    }}
  >
    <Text style={{ color: "white", fontSize: 20 }}>Network:</Text>
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
  </View>
);
