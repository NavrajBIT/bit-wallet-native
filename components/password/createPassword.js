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

const CreatePassword = ({ navigation }) => {
  const [password, setpassword] = useState(null);
  const [status, setStatus] = useState("Create a 4-digit PIN");
  const db = useDB();

  const savePin = async () => {
    db.dbAdd("account", {
      id: 1,
      password: password,
    })
      .then((res) => navigation.navigate("Home"))
      .catch((err) => console.log(err));
  };

  const submit = (pin) => {
    if (password === null) {
      setpassword(pin);
      setStatus("Confirm PIN");
      return;
    } else {
      if (password === pin) {
        savePin();
      } else {
        setStatus("Incorrect PIN. Please create a new 4-digit PIN.");
        setpassword(null);
      }
    }
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
      <View />
      <Enterpin heading={status} submit={submit} />
    </SafeAreaView>
  );
};

export default CreatePassword;
