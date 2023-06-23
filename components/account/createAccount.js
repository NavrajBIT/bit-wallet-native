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
import { generateSecureRandom } from "react-native-securerandom";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import * as Clipboard from "expo-clipboard";
import EnterPhrase from "./enterPhrase";

const CreateAccount = ({ setSelectedOption, navigation }) => {
  const [mnemonic, setMnemonic] = useState("loading");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [isEnteringPhrase, setIsEnteringPhrase] = useState(false);

  if (window.crypto == null) {
    window.crypto = {};
  }

  useEffect(() => {
    try {
      let wallet = ethers.Wallet.createRandom();
      let walletMnemonic = wallet.mnemonic.phrase;
      setMnemonic(walletMnemonic);
      setPrivateKey(wallet.privateKey);
      setPublicKey(wallet.publicKey);
    } catch (err) {
      console.log(err);
      setSelectedOption("");
    }
  }, []);

  if (isEnteringPhrase)
    return (
      <EnterPhrase
        mnemonic={mnemonic}
        privateKey={privateKey}
        publicKey={publicKey}
        setIsEnteringPhrase={setIsEnteringPhrase}
      />
    );

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
        Create Account
      </Text>
      <View style={{ marginTop: 100 }}>
        <Text style={{ color: "white", fontSize: 20, textAlign: "left" }}>
          Secret Phrase:
        </Text>
        <TouchableOpacity
          onPress={() => Clipboard.setStringAsync(mnemonic)}
          style={{
            borderColor: "red",
            borderWidth: 1,
            height: 300,
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
            {mnemonic}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            textAlign: "left",
          }}
        >
          (Click to copy)
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            textAlign: "left",
          }}
        >
          Copy the above secret phrase and keep it safe. It will be required in
          the next step.
        </Text>

        <Button
          title="Next >"
          style={{ backgroundColor: "grey", width: 100, marginTop: 10 }}
          onPress={() => setIsEnteringPhrase(true)}
        />
      </View>
      <Button title="< Back" onPress={() => setSelectedOption("")} />
    </SafeAreaView>
  );
};

export default CreateAccount;
