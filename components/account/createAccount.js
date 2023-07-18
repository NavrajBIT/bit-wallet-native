import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Icon, IconButton, Button } from "@react-native-material/core";
import useDB from "../db/db";
import { WebView } from "react-native-webview";

const CreateAccount = ({
  selectedOption,
  setSelectedOption,
  navigation,
  selectedNetwork,
}) => {
  const db = useDB();

  function extractPrivateKey(inputString) {
    const prefix = "ed25519:";
    const startIndex = inputString.indexOf(prefix) + prefix.length;

    if (startIndex >= prefix.length) {
      return inputString.substring(startIndex);
    } else {
      return "";
    }
  }

  const handleWebViewMessage = async (e) => {
    if (e.type === "bitwalletcall") {
      if (e.message.privatekey !== undefined && e.message.privatekey !== null) {
        console.log(e.message.privatekey);
        console.log(e.message.account);
        let publicKey = e.message.account;
        let privateKey = extractPrivateKey(e.message.privatekey);

        await db.dbUpdate(
          "networks",
          {
            account: publicKey,
            privateKey: privateKey,
          },
          `id = ${selectedNetwork.id}`,
          []
        );
        navigation.navigate("Home");
      }
    }
  };

  const injectFunction = `
  const myInterval = setInterval(() => {
    let data = {
      languageCode: localStorage.getItem("languageCode"),
      "near-wallet-selector:recentlySignedInWallets": localStorage.getItem("near-wallet-selector:recentlySignedInWallets"),
      "wallet.releaseNotesModal:v0.01.2:closed": localStorage.getItem("wallet.releaseNotesModal:v0.01.2:closed"),
      "_4:wallet:active_account_id_v2": localStorage.getItem("_4:wallet:active_account_id_v2"),
      "_4:wallet:accounts_v2": localStorage.getItem("_4:wallet:accounts_v2"),
      "near-wallet-selector:recentlySignedInWallets": localStorage.getItem("near-wallet-selector:recentlySignedInWallets"),
    }

    if (data["_4:wallet:active_account_id_v2"] !== null) {
      let account = data["_4:wallet:active_account_id_v2"];
      let keyword = "nearlib:keystore:" + account + ":default";
      data[keyword] = localStorage.getItem(keyword);
      data["account"] = account;
      data["privatekey"] = localStorage.getItem(keyword);
    }
    window.ReactNativeWebView.postMessage(JSON.stringify({type: 'bitwalletcall', message: data}));
  }, 1000);
  `;

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
      <WebView
        source={{
          uri:
            selectedOption === "createAccount"
              ? selectedNetwork.name === "Mainnet"
                ? "https://wallet.near.org/setup-passphrase-new-account"
                : "https://testnet.mynearwallet.com/create"
              : selectedNetwork.name === "Mainnet"
              ? "https://wallet.near.org/recover-seed-phrase"
              : "https://testnet.mynearwallet.com/recover-seed-phrase",
        }}
        pullToRefreshEnabled={true}
        injectedJavaScript={injectFunction}
        onMessage={(event) =>
          handleWebViewMessage(JSON.parse(event.nativeEvent.data))
        }
      />
      <Button title="<< Back" onPress={() => setSelectedOption("")} />
    </SafeAreaView>
  );
};

export default CreateAccount;
