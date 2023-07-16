import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { Button, Icon } from "@react-native-material/core";
import { useEffect, useState } from "react";
import useDB from "../../db/db";

const Networkselector = ({ navigation }) => {
  const [networkList, setNetworkList] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState({});

  const db = useDB();

  useEffect(() => {
    db.dbRead("networks")
      .then((res) => {
        setNetworkList(res);
        res.map((network) => {
          if (network.isSelected === 1) {
            setSelectedNetwork(network);
          }
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const selectNetwork = async (selectedNetwork) => {
    await Promise.all(
      networkList.map(async (network) => {
        await db.dbUpdate(
          "networks",
          { isSelected: network.id === selectedNetwork.id ? 1 : 0 },
          `id = ${network.id}`,
          []
        );
      })
    );

    navigation.navigate("Home");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: "black",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text
          style={{
            color: "blue",
            fontSize: 40,
            padding: 10,
            textAlign: "center",
          }}
        >
          Select Network
        </Text>
        {networkList.map((network) => (
          <TouchableOpacity
            key={network.id}
            onPress={() => selectNetwork(network)}
            style={{
              color: "white",
              fontSize: 20,
              borderBottomColor: "white",
              borderBottomWidth: 1,
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
              }}
            >
              {network.name}
            </Text>
            {network.id === selectedNetwork.id && (
              <Icon
                name="check"
                style={{
                  color: "white",
                  fontSize: 20,
                  padding: 10,
                }}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Cancel" onPress={() => navigation.navigate("Home")} />
    </SafeAreaView>
  );
};

export default Networkselector;
