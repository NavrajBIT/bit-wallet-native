import { View, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { Button, TextInput } from "react-native";
import { useRef, useState, useEffect } from "react";
import { Icon, IconButton } from "@react-native-material/core";
import useDB from "../db/db";
import Loading from "../loading/loading";
import { createProvider } from "./provider";

const Browser = ({ navigation }) => {
  const [uri, setUri] = useState("https://google.com/");
  const [enteredURL, setEnteredURL] = useState("");
  const [providerData, setProviderData] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // const createProvider = () => {
  //   return 5;
  // };

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
  }, []);

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
    let myProvider = createProvider(newProviderData);
    setProvider(myProvider);
    setIsLoading(false);
  };

  const handleNavigationStateChange = (newNavState) => {
    ref.current?.injectJavaScript(myFunction);
  };

  const myFunction = `
  alert("Creating provider");  

  const createProvider = async (data) => {
    
    window.ethereum = ${JSON.stringify(provider)};
    alert("Haha");
  };

  createProvider(${JSON.stringify(providerData)});
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
