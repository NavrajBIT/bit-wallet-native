import { Text, View, Image, ClipboardStatic } from "react-native";
import { Icon, IconButton, Button } from "@react-native-material/core";
import { useState, useEffect } from "react";
import useDB from "../../db/db";
import * as Clipboard from "expo-clipboard";

const Accountbar = () => {
  const [account, setAccount] = useState("");
  const [shortAccount, setShortAccount] = useState("");
  const db = useDB();

  const shortenAccount = (accString) => {
    var firstFour = accString.slice(0, 4);
    var lastFour = accString.slice(-4);
    return firstFour + "..." + lastFour;
  };

  useEffect(() => {
    db.dbRead("account")
      .then((res) => {
        let key = res[0].publicKey;
        setAccount(key);
        setShortAccount(shortenAccount(key));
      })
      .catch((err) => console.log(err));
    db.dbRead("networks")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <View
      style={{
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        padding: 10,
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Account</Text>
      <Button
        title={shortAccount}
        trailing={(props) => <Icon name="clipboard" {...props} />}
        variant="text"
        color="white"
        uppercase={false}
        onPress={() => Clipboard.setStringAsync(account)}
      />
    </View>
  );
};

export default Accountbar;
