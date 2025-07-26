import "./bigCardForIssue.scss";
import { ICardProps } from "../../types/types";
import payWave from "../../assets/icons/card/payWave.svg";
import chip from "../../assets/icons/card/chip-2.png";
import masterCardIcon from "../../assets/icons/masterCard.png";
import { transliterate as tr, slugify } from "transliteration";
import addZero from "../../hooks/addZero";

const BigCardForIssue = ({
  name,
  style,
  currency,
  system,
}: Pick<ICardProps, "name" | "style" | "currency" | "system">) => {
  const cardName = tr(name!.toUpperCase());
  const month = addZero(new Date().getMonth() + 1);
  const year = new Date().getFullYear() + 5;
  return (
    <div className="bigCardForIssue_wrapper">
      <div className={`bigCardForIssue ${style}`}>
        <div className="bigCardForIssue_header">
          <h4>E-banking</h4>
          <img src={payWave} alt="payWave" />
        </div>
        <img src={chip} alt="chip" id="chip" />
        <div className="bigCardForIssue_number">**** **** **** ****</div>
        <div className="bigCardForIssue_footer">
          <div className="bigCardForIssue_footer-info">
            <div className="bigCardForIssue_footer-info-valid">
              <div className="bigCardForIssue_footer-info-valid-text">VALID THRU</div>
              <div className="bigCardForIssue_footer-info-valid-date">
                {month}/{year}
              </div>
            </div>
            <div className="bigCardForIssue_footer-info-name">{cardName}</div>
            <div className="bigCardForIssue_footer-info-currency">{currency}</div>
          </div>
          <div className="bigCardForIssue_footer-system">
            {system === "MasterCard" ? (
              <img className="cardItem_mini_card-system-img" src={masterCardIcon}></img>
            ) : (
              system
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigCardForIssue;
