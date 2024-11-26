import Currency from "./Currency";
import { useAppSelector } from "../../hooks/hook";

const CurrencyList = () => {
    console.log("Currency");
    const currencies = useAppSelector(state => state.currencies);
    return (

        currencies.map(currency => {
            return <Currency key={currency.Cur_OfficialRate} name={currency.Cur_Abbreviation} rate={currency.Cur_OfficialRate} />
        })

    )
}

export default CurrencyList;