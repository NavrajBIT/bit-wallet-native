import { SafeAreaView, StyleSheet } from "react-native";
import Navbar from "./navbar/navbar";
import Accountbar from "./accountbar/accountbar";
import Balancebar from "./balancebar/balancebar";
import AssetsContainer from "./assetscontainer/assetscontainer";
import Loading from "../loading/loading";
import EnterPassword from "../password/enterPassword";
import CreatePassword from "../password/createPassword";
import ImportAccount from "../account/importAccount";
import useDB from "../db/db";
import { useEffect, useState } from "react";

const Home = ({ navigation }) => {
  const [password, setPassword] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState(false);
  const [account, setAccount] = useState(false);
  const db = useDB();

  useEffect(() => {
    db.dbRead("account").then((res) => {
      if (
        res.length > 0 &&
        res[0]["password"] != null &&
        res[0]["password"] != undefined
      )
        setPassword(true);
      if (
        res.length > 0 &&
        res[0]["privateKey"] != null &&
        res[0]["privateKey"] != undefined
      )
        setAccount(true);
    });
  }, []);

  if (!password) navigation.navigate("CreatePassword");
  if (!account) navigation.navigate("ImportAccount");
  if (!enteredPassword)
    return <EnterPassword back={() => setEnteredPassword(true)} />;

  return (
    <SafeAreaView style={styles.container}>
      <Navbar navigation={navigation} />
      <Accountbar navigation={navigation} />
      <Balancebar navigation={navigation} />
      <AssetsContainer navigation={navigation} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    // marginTop: 30,
  },
});
