import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Icon, IconButton, Button } from "@react-native-material/core";
import { useState } from "react";
import useDB from "../db/db";
import { ethers } from "ethers";

const ImportAccount = ({ setSelectedOption, navigation }) => {
  const [privateKey, setPrivateKey] = useState("");
  const [status, setStatus] = useState("");
  const db = useDB();

  const handleSubmit = async () => {
    setStatus("");
    let finalPrivateKey;
    if (privateKey.length === 66) {
      finalPrivateKey = privateKey;
    } else if (privateKey.length === 64) {
      finalPrivateKey = "0x" + privateKey;
    } else {
      setStatus("Invalid Private Key");
      return;
    }
    const signer = new ethers.Wallet(finalPrivateKey);
    const publicKey = await signer.getAddress();

    db.dbUpdate(
      "account",
      {
        privateKey: finalPrivateKey,
        publicKey: publicKey,
      },
      "id=?",
      [1]
    )
      .then((res) => navigation.navigate("Home"))
      .catch((err) => console.log(err));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        padding: 10,
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: "blue", fontSize: 50, textAlign: "center" }}>
        Import Account
      </Text>
      <View style={{ marginTop: 100 }}>
        <Text style={{ color: "white", fontSize: 20, textAlign: "left" }}>
          Enter Private Key:
        </Text>
        <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            paddingLeft: 10,
            borderColor: "white",
            borderRadius: 10,
            color: "white",
          }}
          placeholder="Enter Private Key"
          value={privateKey}
          secureTextEntry
          onChangeText={(e) => {
            setPrivateKey(e);
          }}
        />

        <Text
          style={{
            color: "white",
            fontSize: 20,
            textAlign: "left",
            marginTop: 20,
            color: "red",
          }}
        >
          {status}
        </Text>

        <Button
          title="Submit"
          style={{ backgroundColor: "grey", width: 100, marginTop: 10 }}
          onPress={handleSubmit}
        />
      </View>
      <Button title="< Back" onPress={() => setSelectedOption("")} />
    </SafeAreaView>
  );
};

export default ImportAccount;
