import "./overview.scss";
import image1 from "../../assets/images/overview/1.png"
import image2 from "../../assets/images/overview/2.png"
import image3 from "../../assets/images/overview/3.png"


const Overview = () => {
    return (
        <div className="overview">
            <h4>Здесь вы сможете:</h4>
            <div className="overview_list">
                <div className="overview_list-item">
                    <img src={image1} alt="1" />
                    <h6>Оформить виртуальную карту</h6>
                    <div>Получите виртуальную карту к ващему счету и пользуйтесь данным приложением для учебных целей по web-разработке</div>
                </div>
                <div className="overview_list-item">
                    <img src={image2} alt="2" />
                    <h6>Получить виртуальный кредит</h6>
                    <div>Получите любую сумму на виртуальный расчетный счет, тратьте виртуальные деньги для тестирования возможности данного приложения</div>
                </div>
                <div className="overview_list-item">
                    <img src={image3} alt="3" />
                    <h6>Совершить виртуальные платежи</h6>
                    <div>Вы сможете оплачивать виртуальные услуги и переводить виртуальные деньги пользователям, зарегистрированным в данном приложении</div>
                </div>
            </div>
        </div>

    )
}

export default Overview;