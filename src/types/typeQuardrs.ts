import { ICardProps, TAnonymusCard } from "./types";

export function isNamedCard(card: ICardProps | {}): card is ICardProps {
  return (card as ICardProps).name !== undefined;
}

export default isNamedCard;
