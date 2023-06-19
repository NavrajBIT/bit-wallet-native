import { Text, View, Image } from "react-native";
import { Icon, IconButton, Button } from "@react-native-material/core";

const Accountbar = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        padding: 10,
        justifyContent: "center",
      }}
    >
      <Button
        title="Account Number"
        trailing={(props) => <Icon name="clipboard" {...props} />}
        variant="text"
        color="white"
      />
    </View>
  );
};

export default Accountbar;
