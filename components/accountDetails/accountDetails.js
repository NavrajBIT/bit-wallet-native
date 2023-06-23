import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Icon, IconButton, Button } from "@react-native-material/core";
import { useState, useEffect } from "react";
import useDB from "../db/db";
import * as Clipboard from "expo-clipboard";
import QRCode from "react-native-qrcode-svg";
import ExportPrivateKey from "./exportPrivateKey";

const AccountDetails = ({ navigation }) => {
  const [account, setAccount] = useState("account");
  const [isPrivetKey, setIsPrivateKey] = useState("");
  const db = useDB();
  useEffect(() => {
    db.dbRead("account")
      .then((res) => {
        let key = res[0].publicKey;
        setAccount(key);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isPrivetKey)
    return (
      <ExportPrivateKey
        setIsPrivateKey={setIsPrivateKey}
        isPrivetKey={isPrivetKey}
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
        Account
      </Text>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Text style={{ color: "white", fontSize: 20, textAlign: "left" }}>
          Account:
        </Text>
        <Button
          title={account}
          trailing={(props) => <Icon name="clipboard" {...props} />}
          variant="text"
          color="white"
          style={{ marginRight: 20 }}
          onPress={() => Clipboard.setStringAsync(account)}
        />
      </View>
      <View style={{ gap: 20, alignItems: "center" }}>
        <QRCode
          value={account}
          color="white"
          backgroundColor="transparent"
          size={200}
        />
        <Button
          title="Export Private Key"
          trailing={(props) => <Icon name="eye" {...props} />}
          style={{ backgroundColor: "red" }}
          onPress={() => setIsPrivateKey(true)}
        />
      </View>
      <Button
        title="Done"
        trailing={(props) => <Icon name="check" {...props} />}
        onPress={() => navigation.navigate("Home")}
      />
    </SafeAreaView>
  );
};

export default AccountDetails;
