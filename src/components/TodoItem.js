import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faXmark, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { delData, todoComplete } from "../indexeddb/idb";

function AddTodo(props) {
  const deleteTodoAction = function(id){
    delData(id, 'todo');
    props.setChkIndex(null);
    props.todoUpdateRequest();
  }
  const updateTodoAction = function(id){
    todoComplete(id);
    props.todoUpdateRequest();
  }
  return(
    <div className="chklist">
      <div className="chkbox" onClick={()=>{updateTodoAction(props.id)}}>
        {
          props.complete == 1? <FontAwesomeIcon icon={faSquareCheck} className='cInput checked' />:<FontAwesomeIcon icon={faSquare} className='cInput' />
        }
        <span htmlFor={`chklist_${props.id}`} className={`cLabel${props.complete == 1? ' checked':''}`}>{props.todo}</span>
      </div>
      <div className="date">
        <p>{props.date}</p>
        <div className={`iconGroup${props.chkIndex === props.id? ' on':''}`} >
          {
            props.chkIndex !== props.id && <FontAwesomeIcon icon={faTrash} className='myBtn' onClick={()=>{props.setChkIndex(props.id)}}/>
          }
          <FontAwesomeIcon icon={faCheck} className='myBtn' onClick={()=>{deleteTodoAction(props.id)}}/>
          <FontAwesomeIcon icon={faXmark} className='myBtn' onClick={()=>{props.setChkIndex(null)}}/>
        </div>
      </div>
    </div>
  )
}

export default AddTodo;