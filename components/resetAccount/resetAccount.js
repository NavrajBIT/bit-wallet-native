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
import { WebView } from "react-native-webview";

const ResetAccount = ({ navigation }) => {
  const db = useDB();
  const [isDeleting, setIsDeleting] = useState(false);
  const [storageCleared, setStorageCleared] = useState(false);

  const clearStorage = () =>
    new Promise((resolve, reject) => {
      const checkStorage = () => {
        console.log("checking...", storageCleared);
        if (storageCleared) {
          console.log("storage clear");
          resolve();
        } else {
          setTimeout(checkStorage, 500);
        }
      };

      checkStorage();
    });

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
          key or mnemonic phrase before resetting account.{" "}
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
      <DeleteWebView setStorageCleared={setStorageCleared} />
    </SafeAreaView>
  );
};

export default ResetAccount;

const DeleteWebView = ({ setStorageCleared }) => {
  const injectFunction = `  
    localStorage.clear();
    window.ReactNativeWebView.postMessage(JSON.stringify({type: 'bitwalletcall', message: "Storage cleared"})); 
  `;

  const handleWebViewMessage = async (e) => {
    if (e.type === "bitwalletcall") {
      console.log(e.message);
      setStorageCleared(true);
    }
  };

  return (
    <View style={{ display: "none" }}>
      <WebView
        source={{
          uri: "https://wallet.near.org/",
        }}
        pullToRefreshEnabled={true}
        injectedJavaScript={injectFunction}
        onMessage={(event) =>
          handleWebViewMessage(JSON.parse(event.nativeEvent.data))
        }
      />
      <WebView
        source={{
          uri: "https://testnet.mynearwallet.com/",
        }}
        pullToRefreshEnabled={true}
        injectedJavaScript={injectFunction}
        onMessage={(event) =>
          handleWebViewMessage(JSON.parse(event.nativeEvent.data))
        }
      />
    </View>
  );
};
