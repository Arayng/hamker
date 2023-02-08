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
            <input type="text" style={{width: '75px', height: '30px', padding: '6px', boxSizing:'border-box', marginRight:'5px'}} onChange={(e)=>{testColor(e.target.value)}}/>
            <button type='button' style={{width: '50px', height: '30px'}} onClick={()=>{props.setTheme(tColor)}}>설정</button>
          </div>
          <FontAwesomeIcon icon={faBars} className='myBtn' onClick={()=>{props.setNav(true)}} />
        </div>
      </header>

    </>
  )
}



export default Header;



