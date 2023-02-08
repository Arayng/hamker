import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Event from '../components/Event';
import CalcSummery from '../components/CalcSummary';
import AddTodo from '../components/TodoItem';


function Home(props){
  const nav = useNavigate()
  // eslint-disable-next-line
  let [chkIndex, setChkIndex] = useState(null); 
  const todoUpdateRequest = function(){
    props.todoUpdate();
  }
  return(
    <>
      <article className='home'>
        <div className='cardUI'>
          <h3 className='title'>
            오늘의 할 일
            <span className='more myBtn' onClick={()=>{nav('/todo')}}>
              <b>더보기</b> <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </h3>
          <div className='content'>
              {
                props.placholder?
                <div className='placeholder'>일정이 없습니다. 일정을 추가 해보세요</div> :
                !props.todoData? 'Loading....' :
                props.todoData.map((item)=>{
                  let today = new Date().setHours(0, 0, 0, 0);
                  let target = new Date(item.date).setHours(0, 0, 0, 0);
                  if(target >= today){
                    return (
                      <AddTodo
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
        <div className='cardUI'>
          <h3 className='title'>
            가계부 요약
            <span className='more myBtn' onClick={()=>{nav('/calc')}}>
              <b>바로가기</b> <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </h3>
          <CalcSummery totalIncome={props.totalIncome} totalExpense={props.totalExpense}/>
        </div>
        <Event />
      </article>
    </>
  )
}

export default Home;



