import { SafeAreaView, StyleSheet } from "react-native";
import Navbar from "./navbar/navbar";
import Accountbar from "./accountbar/accountbar";
import Balancebar from "./balancebar/balancebar";
import AssetsContainer from "./assetscontainer/assetscontainer";
import Loading from "../loading/loading";
import EnterPassword from "../password/enterPassword";
import useDB from "../db/db";
import { useEffect, useState } from "react";

const Home = ({ navigation }) => {
  const [enteredPassword, setEnteredPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const db = useDB();

  useEffect(() => {
    const handleNavigation = navigation.addListener("focus", () => {
      checkDB();
    });

    return () => {
      handleNavigation.remove();
    };
  }, [navigation]);

  const checkDB = () => {
    setIsLoading(true);
    db.dbRead("account").then((res) => {
      if (
        res.length === 0 ||
        res[0]["password"] == null ||
        res[0]["password"] == undefined
      ) {
        navigation.navigate("CreatePassword");
        return;
      }
      if (res[0]["privateKey"] == null || res[0]["privateKey"] == undefined) {
        navigation.navigate("NewAccount");
        return;
      }
      setIsLoading(false);
    });
  };

  if (!enteredPassword)
    return <EnterPassword back={() => setEnteredPassword(true)} />;
  if (isLoading) return <Loading text="loading..." />;

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
