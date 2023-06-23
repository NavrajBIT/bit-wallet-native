import { Text, View, Image } from "react-native";
import { Icon, IconButton, Button } from "@react-native-material/core";

const Balancebar = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Button
        title="Send"
        trailing={(props) => <Icon name="send" {...props} />}
      />
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ color: "white", fontSize: 30 }}>0.00 </Text>
        <Text style={{ color: "white", fontSize: 15 }}>Matic</Text>
      </View>
      <Button
        title="Receive"
        trailing={(props) => <Icon name="arrow-down-left" {...props} />}
        onPress={() => navigation.navigate("QRcode")}
      />
    </View>
  );
};

export default Balancebar;
