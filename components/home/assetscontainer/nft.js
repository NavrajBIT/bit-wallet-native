import { Image, View, Dimensions, ScrollView } from "react-native";

const Nft = ({ data }) => {
  const imageSize = Dimensions.get("window").width / 3;

  return (
    <View
      style={{
        width: imageSize,
        height: imageSize,

        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../../assets/icon.png")}
        style={{
          width: imageSize - 10,
          height: imageSize - 10,
          borderColor: "white",
          borderWidth: 1,
          borderRadius: 10,
          resizeMode: "cover",
        }}
      />
    </View>
  );
};

export default Nft;
