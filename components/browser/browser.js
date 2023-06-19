import { View, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { Button, TextInput } from "react-native";
import { useRef, useState, useEffect } from "react";
import { Icon, IconButton } from "@react-native-material/core";
import useDB from "../db/db";
import Loading from "../loading/loading";

const Browser = ({ navigation }) => {
  const [uri, setUri] = useState("https://google.com/");
  const [enteredURL, setEnteredURL] = useState("");
  const [providerData, setProviderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const ref = useRef(null);

  function convertToValidURL(text) {
    let url = text.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }

    return url;
  }

  useEffect(() => {
    poppulateProviderData();
  });

  const poppulateProviderData = async () => {
    setIsLoading(true);
    const db = useDB();
    let account = await db.dbRead("account");
    let networks = await db.dbRead("networks");
    let newProviderData = {
      publicKey: account[0]["publicKey"],
    };
    networks.map((network) => {
      if (network.isSelected === 1) {
        newProviderData["network"] = {
          rpc: network.rpcURL,
          chain: network.chainId,
          chainHexId: network.chainIdHex,
        };
      }
    });
    setProviderData(newProviderData);
    setIsLoading(false);
  };

  const handleNavigationStateChange = (newNavState) => {
    ref.current?.injectJavaScript(myFunction);
  };

  const myFunction = `
    import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.5.4.esm.min.js";

const sendMessage = () => alert("Requested!");

 const createProvider = async (data) => {
  const provider = new ethers.providers.JsonRpcProvider(data.network.rpc);
  provider.chainId = data.network.chainHexId;
  provider.isMetaMask = true;
  provider.networkVersion = data.network.chain;
  provider.selectedAddress = data.publickey;
  provider._state = {
    accounts: data.publickey === "" ? [] : [data.publickey],
    initialized: true,
    isConnected: true,
    isPermanentlyDisconnected: false,
    isUnlocked: true,
  };
  provider.send = (args, kwargs) => {
    if (
      args.method === "eth_requestAccounts" ||
      args.method === "requestPermissions" ||
      args.method === "wallet_requestPermissions" ||
      args.method === "eth_accounts"
    ) {
      console.log("Connection requested...");
      sendMessage("connectionRequest", null);
      return connectionRequest;
    }
  };
  provider.request = (args) => {
    if (
      args.method === "eth_requestAccounts" ||
      args.method === "requestPermissions" ||
      args.method === "wallet_requestPermissions" ||
      args.method === "eth_accounts"
    ) {
      sendMessage("connectionRequest", null);
      return connectionRequest;
    }
  };
  window.ethereum = provider;
};
    createProvider(${providerData});
  `;

  if (isLoading || providerData === null || providerData === undefined)
    return <Loading text="loading..." />;

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
      <View style={{ flexDirection: "row" }}>
        <Button
          title="W"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
        <Button
          title="<"
          onPress={() => {
            ref.current?.goBack();
          }}
        />
        <Button
          title="R"
          onPress={() => {
            ref.current?.reload();
          }}
        />
        <TextInput
          style={{ height: 40, flex: 1, borderWidth: 1, paddingLeft: 10 }}
          placeholder="Enter URL..."
          onChangeText={(e) => {
            setEnteredURL(e);
          }}
        />
        <Button
          title=">"
          onPress={() => {
            let url = convertToValidURL(enteredURL);
            setUri(url);
          }}
        />
      </View>
      <WebView
        ref={ref}
        source={{ uri: uri }}
        pullToRefreshEnabled={true}
        injectedJavaScript={myFunction}
        // onNavigationStateChange={handleNavigationStateChange}
      />
    </SafeAreaView>
  );
};

export default Browser;
