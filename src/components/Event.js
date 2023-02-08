import { useNavigate } from "react-router-dom";
import banner from "../assets/banner/banner_2x.png"
import link from "../assets/banner/banner-link_2x.png"

function Event(){
  return(
    <>
      <div className="banner">
        <img src={banner} alt="나만의 달력 꾸미기(이벤트 배너)" />
        <a href="#" className="link">
          <img src={link} alt="스토어 바로가기" />
        </a>
      </div>
    </>
  )
}

export default Event;