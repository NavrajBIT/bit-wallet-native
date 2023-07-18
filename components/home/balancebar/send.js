import { SafeAreaView, View, Text, TextInput } from "react-native";
import { Icon, IconButton, Button } from "@react-native-material/core";
import useDB from "../../db/db";
import { useState, useEffect } from "react";

const Send = ({ navigation }) => {
  const [balance, setBalance] = useState(0);
  const [rpc, setRpc] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const db = useDB();

  const getBalance = () => {
    db.dbRead("networks")
      .then((networks) => {
        networks.map((network) => {
          if (network.isSelected === 1) {
            console.log(network.rpcURL);
            let myAccount = network.account;
            setRpc(network.rpcURL);
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
                console.log("info", info);
                let myBalance = info.result.amount;
                let floatBalance =
                  Math.round(parseFloat(myBalance) / 10 ** 20) / 10000;
                setBalance(floatBalance);
              });
          }
        });
      })
      .catch((err) => alert("Something went wrong while fetching balance."));
  };

  useEffect(() => {
    getBalance();
  }, []);

  const checkAmount = (e) => {
    setEnteredAmount(e.nativeEvent.text);
  };

  const sendNear = async () => {};

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: "blue", fontSize: 30, textAlign: "center" }}>
        Send NEAR
      </Text>
      <View style={{ gap: 20 }}>
        <Text style={{ color: "white", fontSize: 20 }}>Amount: </Text>

        <TextInput
          keyboardType="numeric"
          value={enteredAmount}
          onChange={checkAmount}
          autoFocus
          style={{
            borderWidth: 1,
            borderColor:
              parseFloat(enteredAmount) > parseFloat(balance) ? "red" : "white",
            borderRadius: 10,
            color: "white",
            padding: 10,
          }}
        />
        <Text style={{ color: "white", fontSize: 15 }}>
          Available Balance: {balance} NEAR
        </Text>
        <Text style={{ color: "white", fontSize: 20 }}>Receiver: </Text>
        <TextInput
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.nativeEvent.text)}
          style={{
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 10,
            color: "white",
            padding: 10,
          }}
        />
        {parseFloat(enteredAmount) <= parseFloat(balance) &&
          parseFloat(enteredAmount) > 0 && (
            <Button
              title="Send"
              onPress={sendNear}
              trailing={(props) => <Icon name="send" {...props} />}
            />
          )}
      </View>
      <Button
        title="Cancel X"
        color="red"
        onPress={() => navigation.navigate("Home")}
      />
    </SafeAreaView>
  );
};

export default Send;
