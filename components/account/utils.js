function getRandomItemFromArray(array) {
  if (array.length === 0) {
    return null; // Return null if the array is empty
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export const createRandomWallet = () => {
  const hexArray = ["a", "b", "c", "d", "e", "f", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  let privateKey = "0x";

  for (i = 0; i < 64; i++) {
    let randomNum = getRandomItemFromArray(hexArray);
    privateKey = privateKey + randomNum;
  }
  return privateKey;
};
