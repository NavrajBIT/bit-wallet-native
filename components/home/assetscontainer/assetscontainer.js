import { Text, View } from "react-native";
import { useState } from "react";
import Nftcontainer from "./nftcontainer";
import Tokencontainer from "./tokencontainer";

const AssetsContainer = () => {
  const [selectedMenu, setSelectedMenu] = useState("nft");
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          padding: 10,
          justifyContent: "center",
          borderBottomWidth: 1,
          borderBottomColor: "white",
        }}
      >
        <Text
          onPress={() => setSelectedMenu("nft")}
          style={{
            width: "50%",
            color: "white",
            backgroundColor: selectedMenu === "nft" ? "grey" : "transparent",
            textAlign: "center",
            fontSize: 20,
            borderRadius: 10,
            padding: 5,
          }}
        >
          NFTs
        </Text>
        <Text
          onPress={() => setSelectedMenu("asset")}
          style={{
            width: "50%",
            color: "white",
            backgroundColor: selectedMenu === "asset" ? "grey" : "transparent",
            textAlign: "center",
            fontSize: 20,
            borderRadius: 10,
            padding: 5,
          }}
        >
          Assets
        </Text>
      </View>
      <View>
        {selectedMenu === "nft" && <Nftcontainer />}
        {selectedMenu === "asset" && <Tokencontainer />}
      </View>
    </View>
  );
};

export default AssetsContainer;
