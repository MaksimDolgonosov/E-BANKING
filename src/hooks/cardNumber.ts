import { TSystems } from "../types/types";

const cardNumber = (number: string): TSystems => {
  let res: TSystems = null;
  switch (number[0]) {
    case "4":
      res = "VISA";
      break;
    case "5":
      res = "MasterCard";
      break;
    default:
      res = "МИР";
      break;
  }
  return res;
};

export default cardNumber;
