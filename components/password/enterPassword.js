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

const EnterPassword = ({ back }) => {
  const [password, setpassword] = useState("");

  const [status, setStatus] = useState("");
  const db = useDB();

  const submitPassword = async () => {
    setStatus("");

    let dbpassword;

    await db.dbRead("account").then((res) => {
      dbpassword = res[0]["password"];
    });

    if (password !== dbpassword) {
      setStatus("Incorrect Password.");
      return;
    }

    back();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        padding: 10,
      }}
    >
      <Text style={{ color: "blue", fontSize: 50, textAlign: "center" }}>
        Enter Password
      </Text>
      <View style={{ marginTop: 100 }}>
        <Text style={{ color: "white", fontSize: 20, textAlign: "left" }}>
          Enter Password:
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
          placeholder="Enter Password"
          value={password}
          secureTextEntry
          onChangeText={(e) => {
            setpassword(e);
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
          onPress={submitPassword}
        />
      </View>
    </SafeAreaView>
  );
};

export default EnterPassword;
