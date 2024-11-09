import "./depositCardPortal.scss";
import { useAppSelector, useAppDispatch } from "../../hooks/hook"
import { motion } from "framer-motion";
import CardItemMini from "../CardItem/CardItemMini";
import { depositCard } from "../../reducers/cardReducer";

import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from "react";

interface IDepositCardProps {
    setDepositPortal: (state: boolean) => void
}



const DepositCard = ({ setDepositPortal }: IDepositCardProps) => {
    const cards = useAppSelector(state => state.cards);
    const [cardState, setCardState] = useState(<CardItemDefalt />)
    const [deposit, setDeposit] = useState<number>(0);
    const [user_id, setUser_id] = useState<number | null>(null);
    const [id, setId] = useState<number | null>(null);
    const dispatch = useAppDispatch();

    const onSubmitDepositForm = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(depositCard({ id, user_id, deposit }))

    }

    return (
        <motion.div className="depositCard_wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <form onSubmit={onSubmitDepositForm}>
                <div className="depositCard">
                    <h4>Введите сумму:</h4>
                    <input type="number" min="1" max="100000000" step="any" placeholder="0" required value={deposit} onChange={(e) => setDeposit((Number(e.target.value)))} />
                    <Dropdown>
                        <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ width: "376px", height: "55px" }}>{cardState}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {cards.map(item =>
                                <Dropdown.Item
                                    onClick={() => {
                                        setId(item.id);
                                        setUser_id(item.user_id);
                                        setCardState(<CardItemMini key={item.number} currency={item.currency} amount={item.amount} number={item.number} style={item.style} system={item.system} user_id={item.user_id} id={item.id} />)
                                    }}
                                    className={`depositCard_option ${item.style}`} key={item.number}><CardItemMini key={item.number} currency={item.currency} amount={item.amount} number={item.number} style={item.style} system={item.system} user_id={item.user_id} id={item.id} /> </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <button className="depositCard_submit" type="submit">Пополнить</button>

                    <div className="depositCard_close" onClick={() => setDepositPortal(false)}></div>
                </div>
            </form>

        </motion.div >
    )
}
const CardItemDefalt = () => {
    return (
        <div>Выберете карту</div>
    )
}
export default DepositCard;