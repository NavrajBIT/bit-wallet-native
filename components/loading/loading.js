import { View, SafeAreaView, Text, Image } from "react-native";

const Loading = ({ text }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../assets/icon.png")}
        style={{ width: 150, height: 200, resizeMode: "stretch" }}
      />
      <Text style={{ color: "blue", fontSize: 50, textAlign: "center" }}>
        {text}
      </Text>
    </SafeAreaView>
  );
};

export default Loading;
