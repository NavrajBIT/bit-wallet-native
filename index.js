import "node-libs-react-native/globals.js";
import "react-native-get-random-values";
import "@ethersproject/shims";

import { registerRootComponent } from "expo";

// import registerRootComponent from "expo/build/launch/registerRootComponent";

// import App from "../../App";

import App from "./App";

registerRootComponent(App);
