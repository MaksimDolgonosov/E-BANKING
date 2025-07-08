import { ICardProps, TAnonymusCard } from "./types";

export function isNamedCard(card: ICardProps | {} | TAnonymusCard): card is ICardProps {
  return (card as ICardProps).name !== undefined;
}

export function isAnonymusCard(card: ICardProps | {} | TAnonymusCard): card is TAnonymusCard {
  return "number" in card && !("name" in card);
}
