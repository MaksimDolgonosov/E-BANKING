import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

import transferImage from "../../assets/images/portals/transfers.png";
import creditImage from "../../assets/images/portals/credit.png";

interface IPortalEvent {
    mouseEvent: (event: boolean) => void;
}


const BuyingPortal = ({ mouseEvent }: IPortalEvent) => {
//onMouseLeave={() => mouseEvent(false)}


    return (
        <div className="mainPortal_modal">
            <div className="mainPortal_modal__body" >
                <ul className="mainPortal_modal__list">
                    <li>
                        <Link to={"/"}>
                            <h5>Сервисы и оплата услуг</h5>
                            <span>Необходимые траты</span></Link>
                    </li>
                    <li>
                        <Link to={"/"}>
                            <h5>Переводы</h5>
                            <span>Получить или отправить деньги</span>
                        </Link>

                    </li>
                    <li>
                        <Link to={"/"}>
                            <h5>Игры и программы</h5>
                            <span>Покупайте онлайн</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/"}>
                            <h5>Сбор денег</h5>
                            <span>На ваши желания</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/"}>
                            <h5>Сбор денег</h5>
                            <span>На ваши желания</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/"}>
                            <h5>Online lottery</h5>
                            <span>Выигрывайте баллы и тратьте их на покупки</span>
                        </Link>
                    </li>
                </ul>
                <div className="mainPortal_modal__advertising">
                    <Carousel>
                        <Carousel.Item>
                            <h5>Переводы — просто</h5>
                            <span>Отправляйте и получайте деньги, не выходя из дома</span>
                            <img src={transferImage} alt="transfer" />
                            <button className="mainPortal_modal__advertising-det">Хочу перевести</button>
                        </Carousel.Item>
                        <Carousel.Item>
                            <h5>Платежи по кредиту</h5>
                            <span>Оплачивайте кредиты кошельком. Поможем не пропустить платеж</span>
                            <img src={creditImage} alt="credit" />
                            <button className="mainPortal_modal__advertising-det">Подробнее</button>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>

    )
}

export default BuyingPortal;