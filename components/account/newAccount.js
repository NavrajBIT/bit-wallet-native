import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Icon, IconButton, Button } from "@react-native-material/core";
import { useState } from "react";
import ImportAccount from "./importAccount";
import CreateAccount from "./createAccount";

const NewAccount = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState("");

  if (selectedOption === "importAccount")
    return (
      <ImportAccount
        setSelectedOption={setSelectedOption}
        navigation={navigation}
      />
    );
  if (selectedOption === "createAccount")
    return (
      <CreateAccount
        setSelectedOption={setSelectedOption}
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
