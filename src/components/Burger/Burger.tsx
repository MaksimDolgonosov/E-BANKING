import "./burger.scss";
import Accordion from 'react-bootstrap/Accordion';
import { Link } from "react-router-dom";


const Burger: React.FC = () => {
    return (
        <div className="burger__comp">
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Для покупок</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li> <Link to="#"><h4>Сервисы и оплата услуг</h4><div>Необходимые траты</div></Link></li>
                            <li> <Link to="#"><h4>Переводы</h4><div>Получить или отправить деньги</div></Link></li>
                            <li> <Link to="#"><h4>Игры и программы</h4><div>Развлечения и досуг</div></Link></li>
                            <li> <Link to="#"><h4>Карты</h4><div>Платите виртуалкой или пластиком</div></Link></li>
                            <li> <Link to="#"><h4>Сбор денег</h4><div>На ваши желания</div></Link></li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Для бизнеса</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            <li> <Link to="#"><h4>Прием платежей</h4><div>Онлайн-эквайринг для бизнеса</div></Link></li>
                            <li> <Link to="#"><h4>Тарифы</h4><div>Подключение, абоненская плата — 0₽</div></Link></li>
                            <li> <Link to="#"><h4>Самозанятым</h4><div>Прием платежей на счет физлица</div></Link></li>
                            <li> <Link to="#"><h4>Покупки в кредит</h4><div>Продажа товаров и услуг в кредит с простым онлайн-оформлением</div></Link></li>
                            <li> <Link to="#"><h4>Telegram-бот</h4><div>Выставление счетов на оплату в привычном интерфейсе мессенджера Telegram</div></Link></li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default Burger;