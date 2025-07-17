import "./issueCard.scss";
import { Link } from "react-router-dom";

const IssueCardPage = () => {
  return (
    <div className="issueCardPage">
      <div className="issueCardPage_wrapper">
        <div className="issueCardPage_wrapper-header">
          <Link to="/accountPage">Назад</Link>
        </div>
      </div>
    </div>
  );
};

export default IssueCardPage;
