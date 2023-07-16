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

const EnterPhrase = ({
  mnemonic,
  privateKey,
  publicKey,
  setIsEnteringPhrase,
}) => {
  const [unSelectedArray, setUnSelectedArray] = useState([]);
  const [selectedArray, setSelectedArray] = useState([]);

  useEffect(() => {
    setUnSelectedArray(mnemonic.split(" "));
  }, []);

  const shuffle = (array) => {
    let shuffledArray = [];
    while (shuffledArray.length < array.length) {
      let randomIndex = Math.floor(Math.random() * 100) % array.length;
      if (!shuffledArray.includes(array[randomIndex])) {
        shuffledArray.push(array[randomIndex]);
      }
    }
    return shuffledArray;
  };

  const excludeSelectedString = (array, selectedString) => {
    return array.filter((item) => item !== selectedString);
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
      <Text style={{ color: "blue", fontSize: 30, textAlign: "center" }}>
        Enter Secret Phrase
      </Text>
      <Text style={{ color: "white", fontSize: 30, textAlign: "center" }}>
        Select the words in order of the secret phrase
      </Text>

      <View>
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          Select words:
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            padding: 10,
            justifyContent: "center",
            borderWidth: 1,
            borderColor: unSelectedArray.length > 0 ? "blue" : "transparent",
            borderRadius: 10,
          }}
        >
          {unSelectedArray.length > 0 &&
            shuffle(unSelectedArray).map((word, index) => {
              return (
                <Button
                  key={"shuffled-array" + index}
                  title={word}
                  onPress={() => {
                    let newArray = excludeSelectedString(unSelectedArray, word);
                    setUnSelectedArray([...newArray]);
                    selectedArray.push(word);
                  }}
                />
              );
            })}
        </View>
      </View>
      <View>
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          Selected words:
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            padding: 10,
            justifyContent: "center",
            borderWidth: 1,
            borderColor: selectedArray.length > 0 ? "blue" : "transparent",
            borderRadius: 10,
          }}
        >
          {selectedArray.length > 0 &&
            selectedArray.map((word, index) => {
              return (
                <Button
                  key={"selected-array" + index}
                  title={word}
                  onPress={() => {
                    let newArray = excludeSelectedString(selectedArray, word);
                    setSelectedArray([...newArray]);
                    unSelectedArray.push(word);
                  }}
                />
              );
            })}
        </View>
      </View>

      <Button
        title="< Back"
        trailing={(props) => <Icon name="wallet" {...props} />}
        onPress={() => setIsEnteringPhrase(false)}
      />
    </SafeAreaView>
  );
};

export default EnterPhrase;
