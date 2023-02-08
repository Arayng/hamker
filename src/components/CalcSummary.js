import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faSadTear, faLaughSquint } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function CalcSummery(props) {
  let [gauge, setGauge] = useState(10)
  let [faceIcon, setFaceIcon] = useState(faSmile);
  let [tip, setTip] = useState('');


  useEffect(() => {
    const r = (props.totalIncome / (props.totalIncome + props.totalExpense)) * 100;
    setGauge(r);

    if (r > 65) {
      setFaceIcon(faLaughSquint);
      setTip("소비를 잘하고 있어요!");
    } else if (r < 35) {
      setFaceIcon(faSadTear);
      setTip("지출이 너무 많아요!");
    } else {
      setFaceIcon(faSmile);
      setTip("");
    }
  }, [props.totalIncome, props.totalExpense])
  

  return (
    <>
      <div className="summary">
        <div className="total">
          <p>수입</p>
          <p className="totalIncome">
            {props.totalIncome.toLocaleString()} 원
          </p>
        </div>
        <div className="total">
          <p>지출</p>
          <p className="totalExpense">
            {props.totalExpense.toLocaleString()} 원
          </p>
        </div>
        <div className="gauge">
          <div className="gaugeIncome" style={{ width: `${gauge}%` }}>
            <div className="face">
              <FontAwesomeIcon icon={faceIcon} className='faceIcon' />
            </div>
          </div>
        </div>
        <h4 className="tip">{tip}</h4>
      </div>
    </>
  )
}
export default CalcSummery;