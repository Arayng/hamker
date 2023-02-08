import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import { delData } from "../indexeddb/idb";

function CalcItem(props){


  const deleteCalcAction = (id) => {
    delData(id,'calc')
    props.dbUpdateRequest();
  }
  return(
    <article className={`calcItem ${props.type}`}>
      <div className="text">
        <p className="iDate">
          {props.date}
          <span className="itype">{props.type === 'income'? '수입':'지출'}</span>
        </p>
        <p className="iMoney">{parseInt(props.money).toLocaleString()} 원</p>
      </div>
      <div className="memo">
        <p>{props.memo}</p>
      </div>
      <div className={`iconGroup${props.chkIndex === props.id? ' on':''}`} >
          {
            props.chkIndex !== props.id && <FontAwesomeIcon icon={faTrash} className='myBtn' onClick={()=>{props.setChkIndex(props.id)}}/>
          }
          <FontAwesomeIcon icon={faCheck} className='myBtn' onClick={()=>{deleteCalcAction(props.id)}}/>
          <FontAwesomeIcon icon={faXmark} className='myBtn' onClick={()=>{props.setChkIndex(null)}}/>
        </div>
    </article>
  )
}

export default CalcItem