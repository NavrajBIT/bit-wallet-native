import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Icon, IconButton, Button } from "@react-native-material/core";
import { useState, useEffect } from "react";
import useDB from "../db/db";
import * as Clipboard from "expo-clipboard";
import Enterpin from "../password/enterpin";

const ExportPrivateKey = ({ setIsPrivateKey, isPrivetKey }) => {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("Enter PIN");
  const [privateKey, setPrivateKey] = useState("");
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const db = useDB();
  useEffect(() => {
    setIsPasswordCorrect(false);
    db.dbRead("account")
      .then((res) => {
        setPrivateKey(res[0].privateKey);
        setPassword(res[0].password);
      })
      .catch((err) => setIsPrivateKey(false));
  }, [isPrivetKey]);

  const submitPin = (pin) => {
    if (pin === password) {
      setIsPasswordCorrect(true);
    } else {
      setStatus("Incorrect PIN");
    }
  };

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
      <Text style={{ color: "blue", fontSize: 30, textAlign: "center" }}>
        Private Key
      </Text>
      <Text style={{ color: "red", fontSize: 20, textAlign: "left" }}>
        Note: Never expose your private key. Private key can be used access and
        change all your assets and account balance.
      </Text>
      {!isPasswordCorrect ? (
        <Enterpin heading={status} submit={submitPin} />
      ) : (
        <PrivateKeyView privateKey={privateKey} />
      )}

      <Button
        title="Done"
        trailing={(props) => <Icon name="check" {...props} />}
        onPress={() => setIsPrivateKey(false)}
      />
    </SafeAreaView>
  );
};

export default ExportPrivateKey;

const PrivateKeyView = ({ privateKey }) => {
  return (
    <View style={{ gap: 10 }}>
      <Text style={{ color: "white", fontSize: 20, textAlign: "left" }}>
        Private Key:
      </Text>
      <TouchableOpacity
        onPress={() => Clipboard.setStringAsync(privateKey)}
        style={{
          borderColor: "red",
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            flexWrap: "wrap",
            textAlign: "center",
            color: "white",
          }}
        >
          {privateKey}
        </Text>
      </TouchableOpacity>
      <Text style={{ color: "white", fontSize: 15, textAlign: "left" }}>
        (Click to copy)
      </Text>
    </View>
  );
};
