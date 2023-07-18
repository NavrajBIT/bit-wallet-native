import { ethers } from "ethers";
import Home from "./components/home/home";
import Sidebar from "./components/sidebar/sidebar";
import Browser from "./components/browser/browser";
import Loading from "./components/loading/loading";
import CreatePassword from "./components/password/createPassword";
import Qrcode from "./components/home/balancebar/qrcode";
import Send from "./components/home/balancebar/send";
import AccountDetails from "./components/accountDetails/accountDetails";
import ResetAccount from "./components/resetAccount/resetAccount";
import NewAccount from "./components/account/newAccount";
import Networkselector from "./components/home/navbar/networkselector";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useDB from "./components/db/db";
import { useState, useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const db = useDB();
  const [loading, setLoading] = useState(true);
  const [loadingtext, setLoadingText] = useState("Initiating wallet...");

  useEffect(() => {
    db.dbInit()
      .then((res) => checkDB())
      .catch((err) => console.log(err));
  }, []);

  const checkDB = async () => {
    setLoadingText("Logging in...");
    await db
      .dbRead("account")
      .then((res) => console.log(res))
      .catch((err) => {
        setLoading(true);
        setLoadingText("Error. Please restart the app.");
      });
    await db
      .dbRead("networks")
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(true);
        setLoadingText("Error. Please restart the app.");
      });
  };

  if (loading) return <Loading text={loadingtext} />;

  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="QRcode"
            component={Qrcode}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="Send"
            component={Send}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="AccountDetails"
            component={AccountDetails}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="ResetAccount"
            component={ResetAccount}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="Sidebar"
            component={Sidebar}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_left",
            }}
          />
          <Stack.Screen
            name="Browser"
            component={Browser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreatePassword"
            component={CreatePassword}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="NewAccount"
            component={NewAccount}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="Network"
            component={Networkselector}
            options={{
              headerShown: false,
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_bottom",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </IconComponentProvider>
  );
}
