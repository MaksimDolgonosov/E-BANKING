import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

const BuyingPortal = () => {
    return (
        <div className="mainPortal_modal">
            <div className="mainPortal_modal__body">
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
                            <ExampleCarouselImage text="First slide" />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <ExampleCarouselImage text="Second slide" />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>

    )
}

export default BuyingPortal;