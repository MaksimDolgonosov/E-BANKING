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
import Dropdown from 'react-bootstrap/Dropdown';


interface IDepositCardProps {
    setDepositPortal: (state: boolean) => void
}

const DepositCard = ({ setDepositPortal }: IDepositCardProps) => {
    const cards = useAppSelector(state => state.cards);

    return (
        <motion.div className="depositCard_wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="depositCard">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {cards.map(item =>
                            
                            <Dropdown.Item className={`depositCard_option ${item.style}`} key={item.number}><CardItem key={item.number} currency={item.currency} amount={item.amount} number={item.number} style={item.style} system={item.system} /> </Dropdown.Item>
                        )
                        }
                        {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
                    </Dropdown.Menu>
                </Dropdown>





                <input type="number" />
                <div className="depositCard_close" onClick={() => setDepositPortal(false)}></div>
            </div>

            {/* <img className="depositCard_close"><MdClose /></img> */}
        </motion.div >
    )
}

/* <Form.Select aria-label="Default select example">
    <option>Выберете карту</option>
    {cards.map(item =>
        // <CardItem key={item.number} currency={item.currency} amount={item.amount} number={item.number} style={item.style} system={item.system} />
        <option className={`depositCard_option ${item.style}`} key={item.number}>{item.amount} {item.currency} </option>
    )
    }
    {/* <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option> */


export default DepositCard;