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
  const [providerData, setProviderData] = useState({ publickey: "" });
  const [provider, setProvider] = useState(null);
  const [connectedProvider, setConnectedProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopup, setIsPopup] = useState(false);

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
      publickey: account[0]["publicKey"],
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
    let myProvider = createProvider(newProviderData, "disconnected");
    let myConnectedProvider = createProvider(newProviderData, "connected");
    setProvider(myProvider);
    setConnectedProvider(myConnectedProvider);
    setIsLoading(false);
  };

  const handleWebViewMessage = (e) => {
    if (e.type === "bitwalletcall") {
      if (
        e.message === "eth_requestAccounts" ||
        e.message === "requestPermissions" ||
        e.message === "wallet_requestPermissions" ||
        e.message === "eth_accounts"
      ) {
        setIsPopup(true);
      } else {
        try {
          if (
            e.message.method === "eth_requestAccounts" ||
            e.message.method === "requestPermissions" ||
            e.message.method === "wallet_requestPermissions" ||
            e.message.method === "eth_accounts"
          ) {
            setIsPopup(true);
          }
        } catch (err) {
          console.log("error");
        }
      }
    }
  };

  const sendConnectionResponse = (message) => {
    let injectString = `window.postMessage(JSON.stringify({type: 'bitresponse', message: "${message}"}));`;
    if (message === "accept") {
      ref.current.injectJavaScript(myConnectedFunction);
    }
    ref.current.injectJavaScript(injectString);
  };

  const myFunction = `  
  window.ethereum = {};
  Object.assign(window.ethereum, ${JSON.stringify(provider)});

  const connectionPromise = new Promise((resolve, reject) => {
    function handleMessage(event) { 
      let data = JSON.parse(event.data);          
      if (data.type === "bitresponse") {        
            if (data.message === "accept") {
            resolve(["${providerData.publickey}"]);
            } else if (data.message === "reject") {
              reject("User denied connection.");
            }
      }       
    };
  window.addEventListener('message', handleMessage);
  }); 

  window.ethereum.send = async (data) => {
    window.ReactNativeWebView.postMessage(JSON.stringify({type: 'bitwalletcall', message: data}));
    return connectionPromise;
  };
  window.ethereum.request = async (data) => {
    window.ReactNativeWebView.postMessage(JSON.stringify({type: 'bitwalletcall', message: data}));
    return connectionPromise;
  };
`;
  const myConnectedFunction = `  
  window.ethereum = {};
  Object.assign(window.ethereum, ${JSON.stringify(connectedProvider)});
   window.ethereum.send = async (data) => {
    window.ReactNativeWebView.postMessage(JSON.stringify({type: 'bitwalletcall', message: data}));
    return connectionPromise;
  };
   window.ethereum.request = async (data) => {
    window.ReactNativeWebView.postMessage(JSON.stringify({type: 'bitwalletcall', message: data}));
    return connectionPromise;
  };
`;

  if (isLoading || providerData === null || providerData === undefined)
    return <Loading text="loading..." />;

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
      <View style={{ flexDirection: "row" }}>
        <IconButton
          icon={(props) => <Icon name="arrow-left" {...props} />}
          onPress={() => {
            ref.current?.goBack();
          }}
        />
        <IconButton
          icon={(props) => <Icon name="reload" {...props} />}
          onPress={() => {
            ref.current?.reload();
          }}
        />
        <TextInput
          style={{
            height: 40,
            flex: 1,
            borderWidth: 1,
            paddingLeft: 10,
            borderRadius: 20,
          }}
          placeholder="Enter URL..."
          onChangeText={(e) => {
            setEnteredURL(e);
          }}
        />
        <IconButton
          icon={(props) => <Icon name="arrow-right" {...props} />}
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
        onMessage={(event) =>
          handleWebViewMessage(JSON.parse(event.nativeEvent.data))
        }
      />
      {isPopup && (
        <View
          style={{
            padding: 10,
            gap: 10,
          }}
        >
          <Button
            style={{ flex: 1 }}
            color={"green"}
            title="Connect"
            onPress={() => {
              sendConnectionResponse("accept");
              setIsPopup(false);
            }}
          />
          <Button
            style={{ flex: 1 }}
            color={"red"}
            title="Reject"
            onPress={() => {
              sendConnectionResponse("reject");
              setIsPopup(false);
            }}
          />
        </View>
      )}

      <IconButton
        style={{ width: "100%" }}
        icon={(props) => <Icon name="wallet" {...props} />}
        onPress={() => navigation.navigate("Home")}
      />
    </SafeAreaView>
  );
};

export default Browser;
