import { TSystems } from "../types/types";

const cardNumber = (number: string): TSystems => {
  let res: TSystems = null;
  switch (number[0]) {
    case "2":
      res = "МИР";
      break;
    case "4":
      res = "VISA";
      break;
    case "5":
      res = "MasterCard";
      break;
    default:
      "Pay";
  }
  return res;
};

export default cardNumber;
