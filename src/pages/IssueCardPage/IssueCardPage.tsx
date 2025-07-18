import "./issueCard.scss";
import AccauntUser from "../../components/AccauntUser/AccauntUser";
import { useAppSelector } from "../../hooks/hook";
import { Link } from "react-router-dom";
import { transliterate as tr, slugify } from "transliteration";
import CardCarousel from "../../components/CardCarousel/CardCarousel";

const IssueCardPage = () => {
  const userName = useAppSelector((state) => state.user.name);
  const userSurname = useAppSelector((state) => state.user.surname);

  return (
    <div className="issueCardPage">
      <div className="issueCardPage_wrapper">
        <div className="issueCardPage_wrapper-header">
          <Link to="/accountPage">&#9668; Назад</Link>
          <div className="accountPage_header-account">
            <AccauntUser userName={userName} />
          </div>
        </div>

        <h3>Выберете стиль карты:</h3>
        <CardCarousel />
      </div>
    </div>
  );
};

export default IssueCardPage;
