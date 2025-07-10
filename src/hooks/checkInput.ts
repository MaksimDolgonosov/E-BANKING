export const checkInput = (input: string): number => {
  let res = (+input).toFixed(2);
  console.log(res);
  return parseFloat(res);
};
