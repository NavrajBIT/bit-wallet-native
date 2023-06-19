import { View, ScrollView, Dimensions } from "react-native";
import Nft from "./nft";

const Nftcontainer = () => {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: Dimensions.get("window").width / 3,
        }}
      >
        {new Array(20).fill(0).map((item, index) => (
          <Nft data={{ sno: index }} key={index} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Nftcontainer;
