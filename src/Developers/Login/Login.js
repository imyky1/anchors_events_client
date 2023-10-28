import React, {useState } from "react";
import { host, jwtTokenDeveloper } from "../../config/config";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import "./Login.css"
import Navbar from "../../Components/Layouts/Navbar Creator/Navbar";

function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [sentOTP,setsentOTP] = useState(false)

  const [data, setData] = useState({ email: "", password: "", otp:"" });
  

  // 8692006538

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/email/sendMsg?message=Login&number=8692006538&subject=Anchors`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      }
    });
    const json = await response.json();
    if(json?.MessageID){
      setsentOTP(true)
      let otpcode =  parseInt(json?.code - 145626) * 562002;
      setCookie('ccoondfe', otpcode, { maxAge:120 });
    }
  };
  

  const CheckOTP = async () =>{
    let code = cookies?.ccoondfe

    if(data.otp === (parseInt(code)/562002).toString()){
      localStorage.setItem("jwtTokenD",jwtTokenDeveloper);
      localStorage.setItem("isDev", true);
      setCookie('devsession', true , { maxAge:30*24*60*60*1000 });
      navigate("/developer/admin");
    } else {
      alert("Invalid OTP Please Try Again");
    }
  }


  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };



  return (
    <div className="creator_login">

      <Navbar noAccount={true}/>

      <div className="main_page_login">
        <div className="gyan_container">
          Hello, Anchors Builders <br />
          Let's work hard and raise the level of Anchors together.
        </div>
        <div className="login_container_developer" style={{ height: "79vh" }}>
          <h2>Welcome Back Builders</h2>
          
          <button onClick={handleSubmitOTP} className="button_login_dev">{sentOTP ? "OTP Sent" : "Login with OTP"}</button>

          {sentOTP && <div className="otp_modal_developers">
            <input
              className="input_cred"
              type="number"
              name="otp"
              id="otp"
              value={data.otp}
              placeholder="Enter OTP"
              onChange={handleChange}
            />
            
            <button onClick={CheckOTP} className="button_login_dev">Submit</button>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default Login;
