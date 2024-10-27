
interface ICurrencyProps {
    name: string,
    rate: number
}

const Currency = ({ name, rate }: ICurrencyProps) => {
    return (
        <div className="accountPage_main_currencies_wrapper">
            <div className="accountPage_main_currencies_item" style={name === "RUB" ? { height: "30px", paddingTop: "20px" }:{}}>
                <div className="accountPage_main_currencies_item_name">{name}</div>
                <div className="accountPage_main_currencies_item_rates"><span>{rate - 0.02}</span> <span>{rate + 0.02}</span></div>
            </div >
            {name === "RUB" ? <div className="accountPage_main_currencies_item_rubs"><span>(за 100 RUB)</span> <span>(за 100 RUB)</span></div> : null}
        </div >
    )
}

export default Currency;