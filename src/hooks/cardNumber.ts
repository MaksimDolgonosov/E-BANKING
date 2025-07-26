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

export const createNumber = (system: TSystems) => {
  switch (system) {
    case "VISA":
      return (
        "4" +
        `${Math.floor(Math.random() * 10000)}`.slice(0, 3) +
        " " +
        `${Math.floor(Math.random() * 10000)}`.slice(0, 4) +
        " " +
        `${Math.floor(Math.random() * 10000)}`.slice(0, 4) +
        " " +
        `${Math.floor(Math.random() * 10000)}`.slice(0, 4)
      );
    case "MasterCard":
      return (
        "5" +
        `${Math.floor(Math.random() * 10000)}`.slice(0, 3) +
        " " +
        `${Math.floor(Math.random() * 10000)}`.slice(0, 4) +
        " " +
        `${Math.floor(Math.random() * 10000)}`.slice(0, 4) +
        " " +
        `${Math.floor(Math.random() * 10000)}`.slice(0, 4)
      );
    default:
      return (
        `${Math.floor(Math.random() * 10000)}`.slice(0, 4) +
        " " +
        `${Math.floor(Math.random() * 10000)}`.slice(0, 4) +
        " " +
        `${Math.floor(Math.random() * 10000)}`.slice(0, 4) +
        " " +
        `${Math.floor(Math.random() * 10000)}`.slice(0, 4)
      );
  }
};

export default cardNumber;
