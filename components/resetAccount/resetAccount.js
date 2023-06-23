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

const ResetAccount = ({ navigation }) => {
  const db = useDB();
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
        Account Reset
      </Text>
      <View>
        <Text style={{ color: "red", fontSize: 30, textAlign: "left" }}>
          Warning!
        </Text>
        <Text style={{ color: "red", fontSize: 20, textAlign: "left" }}>
          All your account data will be deleted and cannot be retrieved in the
          future without the private key. Make sure you have copied your private
          key or mnemonic phrase before resetting account.
        </Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <Button
          title="Reset Account"
          color="red"
          tintColor="white"
          style={{ width: "50%" }}
          trailing={(props) => <Icon name="reload" {...props} />}
          onPress={async () => {
            await db.dbReset();
            await db.dbInit();
            navigation.navigate("Home");
          }}
        />
      </View>

      <Button
        title="Cancel"
        trailing={(props) => <Icon name="close" {...props} />}
        onPress={() => navigation.navigate("Home")}
      />
    </SafeAreaView>
  );
};

export default ResetAccount;
