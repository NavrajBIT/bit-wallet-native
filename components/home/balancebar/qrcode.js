import { SafeAreaView, View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { Icon, IconButton, Button } from "@react-native-material/core";
import useDB from "../../db/db";
import { useState, useEffect } from "react";

const Qrcode = ({ navigation }) => {
  const [account, setAccount] = useState("account");
  const db = useDB();

  useEffect(() => {
    db.dbRead("account")
      .then((res) => {
        let key = res[0].publicKey;
        setAccount(key);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <Text style={{ color: "white", fontSize: 15 }}>
        Scan the QR code to receive assets.
      </Text>
      <QRCode
        value={account}
        color="white"
        backgroundColor="transparent"
        size={300}
      />
      <Button
        title="Done"
        trailing={(props) => <Icon name="check" {...props} />}
        onPress={() => navigation.navigate("Home")}
      />
    </SafeAreaView>
  );
};

export default Qrcode;
