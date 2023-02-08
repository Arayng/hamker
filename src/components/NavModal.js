import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCalculator, faCalendar, faStore, faClipboard, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

function NavModal(props){
  let navItem = [
      {
        icon: faClipboardList,
        text:'체크리스트',
        path: '/todo'
      },
      {
        icon: faCalculator,
        text:'가계부',
        path: '/calc'
      },
      {
        icon: faCalendar,
        text:'달력',
        path: '/calender'
      },
      {
        icon: faStore,
        text:'스토어',
        path: '/2'
      },
      {
        icon: faClipboard,
        text:'공지사항',
        path: '/3'
      } 
    ]
  const [transition, setTransition] = useState('transition')
  useEffect(()=>{
    setTransition('')
  },[props.navModal])

  const offModal = ()=>{
    setTransition('transition')
    setTimeout(()=> {
      props.navOff(false)
    }, 200);
  }
  return(
    <nav className='nav' onClick={()=>{offModal()}}>
      <h2 className='hide'>주요 메뉴</h2>
      <div className={`bg ${transition}`} onClick={(e)=>{e.stopPropagation()}}>
        <ul className='menu'>
          {
            navItem.map((item, i)=>(
              <li key={i} className='item'><NavLink onClick={()=>{offModal()}} to={item.path} 
              ><FontAwesomeIcon icon={item.icon} className='navIcon' />{item.text}</NavLink></li>
            ))
          }
        </ul>
        <FontAwesomeIcon icon={faXmark} className='myBtn closeBtn' onClick={()=>{offModal()}
        }/>
      </div>
    </nav>
  )
}

export default NavModal;