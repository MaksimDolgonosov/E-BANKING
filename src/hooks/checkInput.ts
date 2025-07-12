export const checkInput = (input: string): string => {
  if (input === "") {
    return "0,00";
  }

  const arr = input.split(".");

  if (arr[1]) {
    return [arr[0], ".", arr[1].substring(0, 2)].join("");
  }

  return arr.join(".");
};
