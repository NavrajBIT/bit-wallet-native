import Home from "./components/home/home";
import Sidebar from "./components/sidebar/sidebar";
import Browser from "./components/browser/browser";
import Loading from "./components/loading/loading";
import CreatePassword from "./components/password/createPassword";
import ImportAccount from "./components/account/importAccount";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useDB from "./components/db/db";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const db = useDB();
  const [loading, setLoading] = useState(true);
  const [loadingtext, setLoadingText] = useState("Initiating wallet...");

  useEffect(() => {
    db.dbInit()
      .then(() => {
        checkDB();
      })
      .catch((err) => setLoadingText("Error. Please restart the app."));
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
    console.log("checking networks");
    await db
      .dbRead("networks")
      .then((res) => setLoading(false))
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
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Sidebar"
            component={Sidebar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Browser"
            component={Browser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreatePassword"
            component={CreatePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ImportAccount"
            component={ImportAccount}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </IconComponentProvider>
  );
}
