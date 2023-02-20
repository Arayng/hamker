import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header(props){
  const nav = useNavigate();
  const testColor = function(value){
    setColor(value)
  }
  let [tColor, setColor] = useState();
  return(
    <>
      <header>
        <div className='header'>
          <h1 className='logo' onClick={()=>{nav('/')}}>
            <img src={props.logo} alt="hamker" />
          </h1>
          <div name='testBox' style={{width:'130px', display:'flex'}} >
 
          </div>
          <FontAwesomeIcon icon={faBars} className='myBtn' onClick={()=>{props.setNav(true)}} />
        </div>
      </header>

    </>
  )
}



export default Header;



