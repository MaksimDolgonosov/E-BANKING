import { Dropdown } from "react-bootstrap";
import { TCurrency, TSystems } from "../../types/types";

interface TDropdownCurrencyProps {
  currency: TCurrency;
  onChangeCurrency: (curr: TCurrency) => void;
}
interface TDropdownSystemProps {
  system: TSystems;
  onChangeSystem: (sys: TSystems) => void;
}

const DropdownCurrency = ({ onChangeCurrency, currency }: TDropdownCurrencyProps) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        style={{ backgroundColor: "white", color: "black", marginLeft: "10px" }}
      >
        {currency}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onChangeCurrency("BYN")}>BYN</Dropdown.Item>
        <Dropdown.Item onClick={() => onChangeCurrency("RUB")}>RUB</Dropdown.Item>
        <Dropdown.Item onClick={() => onChangeCurrency("USD")}>USD</Dropdown.Item>
        <Dropdown.Item onClick={() => onChangeCurrency("EUR")}>EUR</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const DropdownSystem = ({ onChangeSystem, system }: TDropdownSystemProps) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        style={{ backgroundColor: "white", color: "black", marginLeft: "10px" }}
      >
        {system}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onChangeSystem("VISA")}>VISA</Dropdown.Item>
        <Dropdown.Item onClick={() => onChangeSystem("MasterCard")}>MasterCard</Dropdown.Item>
        <Dropdown.Item onClick={() => onChangeSystem("МИР")}>МИР</Dropdown.Item>
        <Dropdown.Item onClick={() => onChangeSystem("UPay")}>UnionPay</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownCurrency;
