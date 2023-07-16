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
import Enterpin from "./enterpin";

const EnterPassword = ({ back }) => {
  const [status, setStatus] = useState("Enter PIN");
  const db = useDB();

  const submitPassword = async (password) => {
    setStatus("");

    let dbpassword;

    await db.dbRead("account").then((res) => {
      dbpassword = res[0]["password"];
    });

    if (password !== dbpassword) {
      setStatus("Incorrect PIN");
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
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: "blue", fontSize: 50, textAlign: "center" }}></Text>
      <Enterpin heading={status} submit={submitPassword} />
    </SafeAreaView>
  );
};

export default EnterPassword;
