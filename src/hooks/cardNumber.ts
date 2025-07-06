import { useAppDispatch } from "./hook";
import { checkCard } from "../reducers/cardReducer";

const useCardNumber = () => {
  const dispatch = useAppDispatch();

  const fetchCard = (cardNumber: string) => {
    return dispatch(checkCard(cardNumber));
  };

  return fetchCard;
};

export default useCardNumber;
