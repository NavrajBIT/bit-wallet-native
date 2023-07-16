import "node-libs-react-native/globals.js";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { generateSecureRandom } from "react-native-securerandom";

import { registerRootComponent } from "expo";

// import registerRootComponent from "expo/build/launch/registerRootComponent";

// import App from "../../App";

import App from "./App";

if (window.crypto == null) window.crypto = {};
window.crypto.getRandomValues = function (array) {
  //   const random = generateSecureRandom(array.length);
  //   console.log(random);
  for (let i = 0; i < array.length; i++) {
    // array[i] = random[i];
    array[i] = i;
  }
  console.log(array);
};

registerRootComponent(App);
