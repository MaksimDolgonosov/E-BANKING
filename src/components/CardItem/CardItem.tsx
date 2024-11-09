import "./cardItem.scss";
import RUB from "../../assets/icons/currency/ruble2.png";
import USD from "../../assets/icons/currency/dollar2.png";
import EUR from "../../assets/icons/currency/euro2.webp";
import BYN from "../../assets/icons/currency/byn2.png";
import { ICardProps } from "../../types/types";
import { TCurrency } from "../../types/types";

type TCurrencyProps = Pick<ICardProps, "currency">;

export const getSymbol = (curency: TCurrency) => {
    switch (curency) {
        case "USD":
            return <span>&#36;</span>
        case "EUR":
            return <span>&euro;</span>
        case "RUB":
            return <span>&#8381;</span>
        case "BYN":
            return <span>Br</span>
        default:
            return ""
    }
}



const CardItem = ({ currency, amount, number, style, system, user_id, id }: ICardProps) => {
    return (
        <div className="cardItem">
            <div className="cardItem_img">
                <Currency currency={currency} />
            </div>
            <div className="cardItem_wrapper">
                <div className="cardItem_ammount">{amount!.toFixed(2)} {getSymbol(currency)} </div>
                <div className="cardItem_style">{style}</div>
                <div className={`cardItem_card ${style}`}>
                    <div className="cardItem_card-number">{number!.slice(-4)}</div>
                    <div className="cardItem_card-system">{system}</div>
                </div>
            </div>
            <div className="cardItem_cashBack">
                <div className="cardItem_cashBack-img"> <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fillRule="evenodd" clipRule="evenodd" d="M12.667 11.167 8 2 5.398 7.112 1 4.444l2.087 6.123c.07.204.155.398.255.582l-.009.018C3.682 12.262 4.66 13 5.761 13h6.322l.584-1.833Z" fill="currentColor"></path><path opacity=".65" fillRule="evenodd" clipRule="evenodd" d="m10.602 7.112 2.065 4.055L12.083 13 15 4.444l-4.398 2.668ZM5.762 13c-.187 0-.37-.021-.547-.062.144.04.296.062.452.062h.094Z" fill="currentColor"></path></svg></div>
                <div className="cardItem_cashBack-money">0 {getSymbol(currency)}</div>
            </div>

        </div>
    )
}


export const Currency = ({ currency }: TCurrencyProps) => {
    switch (currency) {
        case "USD":
            return (<img src={USD} />)
        case "EUR":
            return (<img src={EUR} />)
        case "RUB":
            return (<img src={RUB} />)
        case "BYN":
            return (<img src={BYN} />)
        default: return null
    }

}

export default CardItem; 