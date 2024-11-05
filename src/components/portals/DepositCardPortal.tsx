import "./depositCardPortal.scss";

import { useAppSelector } from "../../hooks/hook"

import { motion } from "framer-motion";
import Form from 'react-bootstrap/Form';
import CardItemMini from "../CardItem/CardItemMini";


import Dropdown from 'react-bootstrap/Dropdown';
import { ReactNode, useState } from "react";


interface IDepositCardProps {
    setDepositPortal: (state: boolean) => void
}

const DepositCard = ({ setDepositPortal }: IDepositCardProps) => {
    const cards = useAppSelector(state => state.cards);
    const [cardState, setCardState] = useState<JSX.Element>(<div>Выберете карту</div>)

    return (
        <motion.div className="depositCard_wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="depositCard">
                <Dropdown>
                    <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ width: "368px", height: "55px" }}>
                        {cardState}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {cards.map(item =>

                            <Dropdown.Item onClick={(e: React.MouseEvent) => setCardState(e.target)} className={`depositCard_option ${item.style}`} key={item.number}><CardItemMini key={item.number} currency={item.currency} amount={item.amount} number={item.number} style={item.style} system={item.system} /> </Dropdown.Item>
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