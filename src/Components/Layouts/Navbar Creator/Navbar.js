import React, { useEffect, useState } from "react";
import "./Navbar.css";
import mixpanel from "mixpanel-browser";
import { useNavigate } from "react-router-dom";
import { IoIosCall } from "react-icons/io";
import {AiOutlineArrowRight} from "react-icons/ai"
import LoginModal from "../../Modals/LoginModal/LoginModal";

function Navbar({
  noAccount = false,
  whiteTheme = false,
  requestCallBack = false,
  backgroundDark = false,
  setOpenCallbackModel,
  newfeature = false,
}) {
  const navigate = useNavigate();

  // Functions --------------------
  const handleLogoClick = () => {
    mixpanel.track("header logo");
    navigate(`/`);
  };

  return (
    <>
      <section
        className="navbar_creator_wrapper01"
        style={
          whiteTheme
            ? { background: "white" }
            : backgroundDark
            ? { background: "black" }
            : {}
        }
      >
        <img
          src={require("../../../Utils/Images/logo-events.png")}
          alt=""
          onClick={handleLogoClick}
        />

        <div>

          {/* new features ------------ */}
          <div>
          {newfeature && <button
            className="new_feature_button"
            onClick={() => {
              mixpanel.track("EPA header button");
              navigate("/earning-predictor");
            }}
          >
            {" "}
            <span>
              New
            </span>
            {window.screen.width > 650 ? "Earning Potential Analyzer" : "EPA"}
          </button>}
          </div>



          {/* Normal use buttons */}
          <section>
            {requestCallBack && (
              <button
                onClick={() => {
                  mixpanel.track("Request a call back header button");
                  setOpenCallbackModel(true);
                }}
              >
                {" "}
                <IoIosCall /> Request a call back
              </button>
            )}

            {!noAccount && (
              <button
                onClick={() => {
                  mixpanel.track(
                    `${
                      localStorage.getItem("jwtToken")
                        ? "My Account"
                        : "Clicked Creator Login on Navbar"
                    }`
                  );
                  localStorage.getItem("jwtToken") &&
                  localStorage.getItem("isUser") === ""
                    ? window.open("/dashboard", "_self")
                    : localStorage.getItem("jwtToken") &&
                      localStorage.getItem("isUser") !== ""
                    ? window.open(localStorage.getItem("url"), "_self")
                    : window.open("/login/creators", "_self");
                }}
              >
                {localStorage.getItem("jwtToken")
                  ? "My Account"
                  : "Creator's Login"}
              </button>
            )}
            
          </section>
          
        </div>
      </section>
    </>
  );
}


export function EventsNavbar({
  noAccount = false,
  whiteTheme = false,
  backgroundDark = false,
  newfeature = false,
  showPricingButton = true,
  position="unset",
  openLoginModalValue = false,
  setOpenLoginModalFromOutside
}) {
  const navigate = useNavigate();

  const [openLoginModal, setOpenLoginModal] = useState(false)

  // Functions --------------------
  const handleLogoClick = () => {
    mixpanel.track("header logo");
    navigate(`/`);
  };

  useEffect(() => {
    setOpenLoginModal(openLoginModalValue)
  }, [openLoginModalValue])


  // open login directly -------------------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("openLogin")) {
      setOpenLoginModal(true)
    }

  }, [])
  

  return (
    <>
    {openLoginModal&& <LoginModal open={openLoginModal} toClose={()=>{setOpenLoginModal(false);setOpenLoginModalFromOutside(false)}} ModalType="login"/>}

      <section
        className="navbar_creator_wrapper01"
        style={
          whiteTheme
            ? { background: "white" , position:position }
            : backgroundDark
            ? { background: "#121212" , position:position }
            : {position:position}
        }
      >
        <img
          src={require("../../../Utils/Images/logo-events.png")
          }
          alt=""
          onClick={handleLogoClick}
        />

        <div>

          {/* new features ------------ */}
          <div>
          {newfeature && <button
            className="new_feature_button"
            onClick={() => {
              mixpanel.track("EPA header button");
              navigate("/earning-predictor");
            }}
          >
            {" "}
            <span>
              New
            </span>
            {window.screen.width > 650 ? "Earning Potential Analyzer" : "EPA"}
          </button>}
          </div>



          {/* Normal use buttons */}
          <section>
            {showPricingButton && (
              <button
                onClick={() => {
                  mixpanel.track("Events side pricing button header");
                  window.open("https://events.anchors.in/pricing")
                }}
              > Pricing
              </button>
            )}

            {!noAccount && (
              <button
                onClick={() => {
                  mixpanel.track(
                    `${
                      localStorage.getItem("jwtToken")
                        ? "Event Side My Account"
                        : "Event Side Clicked Get Started on Navbar"
                    }`
                  );
                  !localStorage.getItem("jwtToken") ? setOpenLoginModal(true) : navigate("/dashboard")
                }}
              >
                {localStorage.getItem("jwtToken")
                  ? "My Account"
                  : "Get Started Free"}
                  <AiOutlineArrowRight size={window.screen.width > 600 ? 16 : 12}/>
              </button>
            )}
          </section>
          
        </div>
      </section>
    </>
  );
}

export default Navbar;
