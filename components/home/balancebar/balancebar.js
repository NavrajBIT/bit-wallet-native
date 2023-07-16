import { Text, View, Image } from "react-native";
import { Icon, IconButton, Button } from "@react-native-material/core";
import useDB from "../../db/db";
import { useEffect, useState } from "react";

const Balancebar = ({ navigation }) => {
  const [balance, setBalance] = useState(0);
  const db = useDB();

  const getBalance = () => {
    db.dbRead("networks")
      .then((networks) => {
        networks.map((network) => {
          if (network.isSelected === 1) {
            console.log(network.rpcURL);
            db.dbRead("account").then((accounts) => {
              let myAccount = accounts[0]["publicKey"];
              fetch(network.rpcURL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  jsonrpc: "2.0",
                  id: "dontcare",
                  method: "query",
                  params: {
                    request_type: "view_account",
                    finality: "final",
                    account_id: myAccount,
                  },
                }),
              })
                .then((res) => res.json())
                .then((info) => {
                  let myBalance = info.result.amount;
                  let floatBalance =
                    Math.round(parseFloat(myBalance) / 10 ** 22) / 100;
                  setBalance(floatBalance);
                })
                .catch((err) => console.log(err));
            });
          }
        });
      })
      .catch((err) => alert("Something went wrong while fetching balance."));
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Button
        title="Send"
        trailing={(props) => <Icon name="send" {...props} />}
        style={{ width: "30%" }}
      />
      <View style={{ flex: 1, alignItems: "center", width: "30%" }}>
        <Text style={{ color: "white", fontSize: 30 }}>{balance}</Text>
        <Text style={{ color: "white", fontSize: 15 }}>NEAR</Text>
      </View>
      <Button
        title="Receive"
        trailing={(props) => <Icon name="arrow-down-left" {...props} />}
        onPress={() => navigation.navigate("QRcode")}
        style={{ width: "30%" }}
      />
    </View>
  );
};

export default Balancebar;
