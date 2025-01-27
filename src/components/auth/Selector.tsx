import { firstSelect, secondSelect, thirdSelect, fourthSelect } from "./../../assets/image/auth";

import "./Selector.css";

const Selector = ({ index = 1 }) => {
  let select;
  switch (index) {
    case 1:
      select = firstSelect;
      break;
    case 2:
      select = secondSelect;
      break;
    case 3:
      select = thirdSelect;
      break;
    case 4:
      select = fourthSelect;
      break;
    default:
      select = firstSelect;
  }

  return (
    <div className="d-flex j-content-center">
      <img className="selector" src={select} alt="select" />
    </div>
  );
};

export default Selector;
