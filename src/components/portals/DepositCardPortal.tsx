import "./depositCardPortal.scss";

import { useAppSelector } from "../../hooks/hook"
import { Currency } from "../CardItem/CardItem";
import { motion } from "framer-motion";
import Form from 'react-bootstrap/Form';
import CardItem from "../CardItem/CardItem";

import RUB from "../../assets/icons/currency/ruble2.png";
import USD from "../../assets/icons/currency/dollar2.png";
import EUR from "../../assets/icons/currency/euro2.webp";
import BYN from "../../assets/icons/currency/byn2.png";



interface IDepositCardProps {
    setDepositPortal: (state: boolean) => void
}

const DepositCard = ({ setDepositPortal }: IDepositCardProps) => {
    const cards = useAppSelector(state => state.cards);

    return (
        <motion.div className="depositCard_wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="depositCard">
                <Form.Select aria-label="Default select example">
                    <option>Выберете карту</option>
                    {cards.map(item =>
                    <CardItem key={item.number} currency={item.currency} amount={item.amount} number={item.number} style={item.style} system={item.system} />
                        // <option style={{ backgroundImage: "../../assets/icons/currency/byn2.png" }} className="depositCard" key={card.number}>{card.amount}{card.currency}</option>
                    )
                    }
                    {/* <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option> */}
                </Form.Select>



                <input type="number" />
                <div className="depositCard_close" onClick={() => setDepositPortal(false)}></div>
            </div>

            {/* <img className="depositCard_close"><MdClose /></img> */}
        </motion.div >
    )
}

export default DepositCard;