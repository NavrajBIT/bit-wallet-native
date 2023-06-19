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

const CreatePassword = ({ navigation }) => {
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const db = useDB();

  const submitPassword = async () => {
    setStatus("");
    if (password !== confirmPassword) {
      setStatus("Passwords do not match");
      return;
    }

    db.dbAdd("account", {
      id: 1,
      password: password,
    })
      .then((res) => navigation.navigate("Home"))
      .catch((err) => console.log(err));
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
        Create Password
      </Text>
      <View style={{ marginTop: 100 }}>
        <Text style={{ color: "white", fontSize: 20, textAlign: "left" }}>
          New Password:
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
          }}
        >
          Confirm Password:
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
          value={confirmPassword}
          secureTextEntry
          onChangeText={(e) => {
            setConfirmPassword(e);
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

export default CreatePassword;
