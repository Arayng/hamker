import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus, faChevronDown, faTrash, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState} from "react";
import { writeDB, delData } from "../indexeddb/idb";
import TodoItem from '../components/TodoItem';

function Todo(props){
  let nav = useNavigate();
  let [onOff, setSwitch] = useState(false)
  let [fade, setFade] = useState(false)
  let [date, setDate] = useState(`${props.today.y}-${props.today.m}-${props.today.d}`)
  let [todo, setTodo] = useState();
  let [chkIndex, setChkIndex] = useState(null); 
  const pastData = [];
  useEffect(()=>{
    if(onOff === true){
      setTimeout(()=>{
        setFade(true)
      },200)
    }else{
      setFade(false)
    }
    return ()=>{
      setFade(false)
    }
  },[onOff])
  const addTodoAction = function(t, d){
    if(!t || !d){
      alert('내용을 입력해주세요')
      return false;
    }
    let result = {
      todo: t,
      date: d,
      complete: 0
    };
    writeDB(result,'todo');
    setTodo('');
    setDate(`${props.today.y}-${props.today.m}-${props.today.d}`);
    props.todoUpdate();
  }
  const todoUpdateRequest = function(){
    props.todoUpdate();
  }
  const pastTodoClear = function(pastData){
    for(const i of pastData){
      delData(i,'todo')
    }
    props.todoUpdate();
  }
  return(
    <article className="todo">
      <div className="cardUI">
        <div className={`title ${onOff ? 'active':''}`}>
          <FontAwesomeIcon icon={faArrowLeft} className='myBtn' onClick={()=>{nav(-1)}}/>
          <h3>{`${props.today.y}년 ${props.today.m}월 ${props.today.d}일`}</h3>
          <FontAwesomeIcon icon={onOff? faChevronDown:faPlus} className={`myBtn ${onOff ? 'toggle':''}`} onClick={()=>{setSwitch(!onOff)}}/>
          {
            onOff && 
            <div className={`todoInput${fade ? ' active':''} myForm`}>
              <label className="inputDesign">
                <input type="text" className="text" placeholder="할 일 추가" onChange={(e)=>{setTodo(e.target.value)}} onFocus={()=>{setTodo('')}} value={todo||''}/>
                <i className="line"></i>
              </label>
              <label className="inputDesign">
                <div className="flexbox dateView">
                  <p className="placeholder">{date}</p>
                  <FontAwesomeIcon icon={faCalendarDays} className='myBtn'/>
                </div>
                <input type="date" className="date" onChange={(e)=>{setDate(e.target.value)}} value={date||''} data-date={date}/>
                <i className="line"></i>
              </label>
              <button className="submit" onClick={()=>{addTodoAction(todo,date)}}>추가</button>
            </div>
          }
        </div>
        <div className="content">
          
          {
            props.placholder?
            <div className='placeholder'>일정이 없습니다. 일정을 추가 해보세요</div> :
            !props.todoData? 'Loading....' :
            props.todoData.map((item)=>{
              let today = new Date().setHours(0, 0, 0, 0);
              let target = new Date(item.date).setHours(0, 0, 0, 0);
              if(target >= today){
              return (
                  <TodoItem
                    key={item.id}
                    id={item.id}
                    todo={item.todo}
                    date={item.date}
                    complete={item.complete}
                    chkIndex={chkIndex}
                    setChkIndex={setChkIndex}
                    todoUpdateRequest={todoUpdateRequest}
                  />
                )}
               return false;
            })
          }
        </div>
      </div>
      <div className="cardUI">
          <div className="title">
            <h3 className="past">지난 일정</h3>
            <FontAwesomeIcon icon={faTrash} className='myBtn' style={{fontSize: '24px'}} onClick={()=>{pastTodoClear(pastData)}} />
          </div>
          <div className="content" name="pastTodo">
            {
              !props.todoData? 'Loading....' :
              props.todoData.map((item)=>{
                let today = new Date().setHours(0, 0, 0, 0);
                let target = new Date(item.date).setHours(0, 0, 0, 0);
                if(target < today){
                pastData.push(item.id)
                return (
                  <TodoItem
                    key={item.id}
                    id={item.id}
                    todo={item.todo}
                    date={item.date}
                    complete={item.complete}
                    chkIndex={chkIndex}
                    setChkIndex={setChkIndex}
                    todoUpdateRequest={todoUpdateRequest}
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

export default Todo;