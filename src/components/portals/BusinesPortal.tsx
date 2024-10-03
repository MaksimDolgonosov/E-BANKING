import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import businesImage from "../../assets/images/portals/busines.png";

interface IPortalEvent {
    mouseEvent: (event: boolean) => void;
    activeHeader: (event: boolean) => void;
    activeBusines: (event: boolean) => void;
}


const BusinesPortal = ({ mouseEvent, activeHeader, activeBusines }: IPortalEvent) => {
    //onMouseLeave={() => mouseEvent(false)}


    return (
        <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }} className="mainPortal_modal">
            <div className="mainPortal_modal__body busines"
                onMouseEnter={() => {
                    activeHeader(true)
                    activeBusines(true)
                }}
                onMouseLeave={() => {
                    mouseEvent(false)
                    activeHeader(false)
                    activeBusines(false)
                }
                }
            >
                <ul className="mainPortal_modal__list">
                    <li>
                        <Link to={"/"}>
                            <h5>Приём платежей</h5>
                            <span>Онлайн-эквайринг для бизнеса</span></Link>
                    </li>
                    <li>
                        <Link to={"/"}>
                            <h5>Тарифы</h5>
                            <span>Подключение, абоненская плата — 0₽</span>
                        </Link>

                    </li>
                    <li>
                        <Link to={"/"}>
                            <h5>Самозанятым</h5>
                            <span>Приём платежей на счёт физлица</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/"}>
                            <h5>Покупки в кредит</h5>
                            <span>Продажа товаров и услуг в кредит с простым онлайн-оформлением</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/"}>
                            <h5>Telegram-бот</h5>
                            <span>Выставление счетов на оплату в привычном интерфейсе мессенджера Telegram</span>
                        </Link>
                    </li>
                </ul>
                <div className="mainPortal_modal__advertising">

                    <h5><Link to={"/"}>Интернет Kassa за 1 ₽</Link></h5>
                    <img src={businesImage} alt="transfer" />

                </div>
            </div>
        </motion.div>

    )
}

export default BusinesPortal;