import "./description.scss";
import people from "../../assets/images/main_page/desrc_people.png";

const Description = () => {
    return (
        <div className="description">
            <div className="description_descr">
                <h4>E-banking - web-приложение, созданное на React+TS+Node.js</h4>
                <div className="description_descr_comment">Здесь представлена работа виртуального банка с виртуальными деньгами и платежами</div>
            </div>
            <div className="description_img">
                <img src={people} alt="people" />
            </div>
        </div>
    )
}

export default Description;