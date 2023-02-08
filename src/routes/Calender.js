import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { setDate, getDate} from "../components/getDate"

function Calender(props){
  let nav = useNavigate();
  let [totalDate, setTotalDate] = useState([])
  const day = ['일', '월', '화', '수', '목', '금', '토'];  // eslint-disable-line no-unused-vars
  const dayEN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  let [year, setYear] = useState(0)
  let [month, setMonth] = useState(0)


  useEffect(()=>{
    let date = setDate()
    setYear(date[0])
    setMonth(date[1])
  },[])
  
  useEffect(()=>{
    setTotalDate(getDate(year,month))
  },[year, month])

  const changeMonth = (action) => {
    let remote = null;
    switch (action) {
      case "prev":
        remote = -1;
        break;
      case "next":
        remote = 1;
        break;
      default:
        break;
    }
    if (remote !== null) {
      const check = remote + month;
      if (check >= 13) {
        setYear(year + 1);
        setMonth(1);
      } else if (check <= 0) {
        setYear(year - 1);
        setMonth(12);
      } else {
        setMonth(remote + month);
      }
    }
  };
  
  return(
    <article className="calender">
      <div className="cardUI">
        <div className='title'>
          <FontAwesomeIcon icon={faArrowLeft} className='myBtn' onClick={()=>{nav(-1)}}/>
          <h3>{`${year}년 ${month}월`}</h3>
          <div className="calBtnGroup">
            <FontAwesomeIcon icon={faCaretLeft} className='myBtn' onClick={()=>{changeMonth('prev')}}/>
            <span className='myBtn' style={{fontSize: '18px'}} onClick={()=>{setMonth(props.today.m)}}>오늘</span>
            <FontAwesomeIcon icon={faCaretRight} className='myBtn' onClick={()=>{changeMonth('next')}}/>
          </div>
        </div>
      </div>
      <div className="cardUI full">
        <div className="calDayGroup">
          {
            dayEN.map((item, i)=>(
              <div className="calDay" key={i}>{item}</div>
            ))
          }
        </div>
        <div className="dateGroup">
          {
            totalDate.map((item,i)=>(
              <div
                className={`date${item.class !== 'on'? ` ${item.class}`:
                (
                  year === props.today.y &&
                  month === props.today.m &&
                  item.date === props.today.d
                )? ' today' : ''}`}
                key={i}
                onClick={()=>{changeMonth(item.class)}}
              >
                {item.date}
              </div>
            ))
          }
        </div>
      </div>
    </article>
  )
}

export default Calender;