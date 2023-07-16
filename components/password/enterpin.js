import { View, TouchableOpacity, Text, TextInput } from "react-native";
import { Icon } from "@react-native-material/core";
import { useEffect, useState } from "react";

const Enterpin = ({ submit, heading }) => {
  const [pin, setPin] = useState("");

  const addPin = (number) => {
    if (pin.length === 3) {
      let finalPin = pin + number;
      submit(finalPin);
      setPin("");
    } else {
      setPin((prev) => prev + number);
    }
  };
  const removePin = () => {
    setPin((prev) => prev.slice(0, prev.length - 1));
  };

  const PinRow = ({ numbers }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      {numbers.map((number, index) => (
        <PinButton number={number} key={"pin-row-" + index} />
      ))}
    </View>
  );

  const LastRow = () => (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <PinIcon icon="backspace" onPress={removePin} />
      <PinButton number={0} />
      <PinIcon icon="send" />
    </View>
  );

  const PinButton = ({ number }) => (
    <TouchableOpacity
      onPress={() => addPin(number)}
      style={{
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 50,
      }}
    >
      <Text style={{ color: "white", fontSize: 30 }}>{number}</Text>
    </TouchableOpacity>
  );
  const PinIcon = ({ icon, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 50,
      }}
    >
      <Icon name={icon} style={{ color: "white", fontSize: 30 }} />
    </TouchableOpacity>
  );

  return (
    <View>
      {pin.length > 0 ? (
        <SecureText text={pin} />
      ) : (
        <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
          {heading}
        </Text>
      )}
      <View style={{ width: "100%", gap: 10 }}>
        <PinRow numbers={[1, 2, 3]} />
        <PinRow numbers={[4, 5, 6]} />
        <PinRow numbers={[7, 8, 9]} />
        <LastRow />
      </View>
    </View>
  );
};

export default Enterpin;

const SecureText = ({ text }) => {
  const [noOfDots, setNoOfDots] = useState(0);
  const [lastValue, setLastValue] = useState("");

  useEffect(() => {
    setNoOfDots(text.length - 1);
    setLastValue(text.slice(text.length - 1, text.length));
    const timer = setTimeout(() => {
      setNoOfDots(text.length);
      setLastValue("");
    }, 100);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      {Array.apply(null, Array(noOfDots)).map((_, index) => (
        <Dot key={"display-dot" + index} />
      ))}
      <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
        {lastValue}
      </Text>
    </View>
  );
};

const Dot = () => (
  <View
    style={{
      height: 10,
      width: 10,
      borderRadius: 10,
      backgroundColor: "white",
    }}
  />
);
