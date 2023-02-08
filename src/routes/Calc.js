import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus, faCalendar, faCalendarDays, faCaretLeft, faCaretRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import Item from '../components/CalcItem';
import CalcSummery from "../components/CalcSummary";

// idb //
import { writeDB } from "../indexeddb/idb";

function Calc(props){
  let nav = useNavigate();
  let [year, setYear] = useState(props.today.y);
  let [month, setMonth] = useState(props.today.m);
  let [toggle, setToggle] = useState(false);
  let [chkIndex, setChkIndex] = useState(null); 
  const moneyInput = useRef();
  const changeMonth = (action) => {
    let remote = null;
    if(action !== 'on') {
      remote = (action === 'prev')? -1 : 1;
      let check = remote + parseInt(month);
      check = check < 10? '0'+check:check;
      if(check >= 13){
        setYear(year + 1);
        setMonth('0'+1);
      } else if (check <= 0){
        setYear(year - 1)
        setMonth(12)
      } else {
        setMonth(check)
      }
    }
  }
  const datePicker = (input)=>{
    if(input){
      let date = new Date(input)
      let y, m = 0;
      y = date.getFullYear();
      m = date.getMonth()+1 < 10? '0'+(date.getMonth()+1) : date.getMonth()+1;
      setYear(y)
      setMonth(m)
    }
  }
  // cacl data object //
  let [money, setMoney] = useState(0);
  let [date, setDate] = useState(`${props.today.y}-${props.today.m}-${props.today.d}`);
  let [type, setType] = useState('income');
  let [memo, setMemo] = useState('');
  
  useEffect(()=>{
    let newFilter = {
      m: parseInt(month),
      y: year
    }
    props.setFilter(newFilter)
  },[year,month])
  const addCalcAction = function(money, date, type, memo){
    if(!money || !date || !type ){
      alert('내용을 입력해주세요');
      return false;
    } else if(isNaN(money)){
      alert('금액을 정확히 입력해주세요');
      moneyInput.current.focus();
      return false;
    }
    let result = {
      money : money,
      date : date,
      type : type,
      memo : memo
    }
    writeDB(result, 'calc');
    setMoney(0)
    setDate(`${props.today.y}-${props.today.m}-${props.today.d}`)
    setType('income')
    setMemo('')
    setToggle(false)
    props.calcUpdate()
  }
  const dbUpdateRequest = function(){
    props.calcUpdate();
  }
  return(
    <article className="calcurator">
      <div className={`cardUI${toggle? ' on':''}`}>
        <div className='title'>
          <FontAwesomeIcon icon={faArrowLeft} className='myBtn' onClick={()=>{nav(-1)}}/>
          <div className="flexbox">
            <h3>{`${year}년 ${month}월`}</h3>
            <div className="calBtnGroup">
              <FontAwesomeIcon icon={faCaretLeft} className='myBtn' onClick={()=>{changeMonth('prev')}}/>
              <div className="monthSelect">
                <FontAwesomeIcon icon={faCalendar} />
                <input type="month" onChange={(e)=>{datePicker(e.target.value)}} defaultValue={`${year}-${month}`}/>
              </div>
              <FontAwesomeIcon icon={faCaretRight} className='myBtn' onClick={()=>{changeMonth('next')}}/>
            </div>
          </div>
          <FontAwesomeIcon icon={toggle? faChevronDown:faPlus} className={`myBtn${toggle ? ' toggle':''}`} onClick={()=>{setToggle(!toggle)}}/>
        </div>
        <div className="content">
          <div className="myForm flexbox column">
            <label className="inputDesign">
              <input type="text" ref={moneyInput} className="text" placeholder="금액" onChange={(e)=>{setMoney(e.target.value)}} value={money||''} style={{textAlign:'right'}}/>
              <i className="line"></i>
            </label>
            <label className="inputDesign">
                <div className="flexbox dateView" style={{width:'180px'}}>
                  <p className="placeholder">{date}</p>
                  <FontAwesomeIcon icon={faCalendarDays} className='myBtn' style={{opacity:'1', paddingRight:'5px'}}/>
                </div>
                <input type="date" className="date" onChange={(e)=>{setDate(e.target.value)}} value={date||''} data-date={date}/>
            </label>
            <div className="radioGroup">
              <input type="radio" name="type" id="income" value="income" onChange={(e)=>{setType(e.target.value)}} checked={type === 'income'} />
              <label htmlFor="income">수입</label>
              <input type="radio" name="type" id="expense" value="expense" onChange={(e)=>{setType(e.target.value)}} checked={type === 'expense'}/>
              <label htmlFor="expense">지출</label>
            </div>
            <label className="inputDesign">
              <input type="text" className="text memo" placeholder="메모" onChange={(e)=>{setMemo(e.target.value)}} value={memo||''}/>
              <i className="line"></i>
            </label>
            <button className="submit" onClick={()=>{addCalcAction(money,date,type,memo)}}>추가하기</button>
          </div>
        </div>
      </div>
      <div className="cardUI">
          <CalcSummery totalIncome={props.totalIncome} totalExpense={props.totalExpense} className="cardUI" />
          <div style={{marginTop: '40px'}}>
            {
              !props.calcData? 'Loading....' :
              props.calcData.map((item)=>{
              let target = new Date(item.date);
              let filter = new Date(`${year}-${month}`);
              target = target.getFullYear().toString() + target.getMonth()
              filter = filter.getFullYear().toString() + filter.getMonth();
              if(target == filter){
              return (
                <Item 
                  key={item.id}
                  id={item.id}
                  date={item.date} 
                  money={item.money}
                  type={item.type}
                  memo={item.memo}
                  chkIndex={chkIndex}
                  setChkIndex={setChkIndex}
                  dbUpdateRequest={dbUpdateRequest}
                />
              )}
               return false;
            })
            }
          </div>
      </div>
    </article>
  )
}
export default Calc;