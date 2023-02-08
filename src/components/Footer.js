import { Link } from 'react-router-dom';

function Footer(){
  let footMenu = [
    ['달력','체크리스트','가계부'],
    ['스토어','문의하기','공지사항'],
    ['이용약관']
  ]
  return(
    <>
      <footer className='footer'>
        <h2 className='hide'>전체메뉴, 소개 및 약관</h2>
        <div>
          {
            footMenu.map((item, i)=>(
              <ul className='menu' key={i}>
                {
                  footMenu[i].map((item,i)=>(
                    <li key={i} className="item"><Link paht='/'>{item}</Link></li>
                  ))
                }
              </ul>
            ))
          }
        </div>
        <div className="copyright">
          <p>Copyright (c) Hamker.com All rights reserved.</p>
          <p className="contact">Contact Us, arayng@gmail.com</p>
        </div>
      </footer>
    </>
  )
}

export default Footer