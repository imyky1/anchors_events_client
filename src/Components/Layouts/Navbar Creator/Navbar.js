import React from "react";
import "./Navbar.css";
import mixpanel from "mixpanel-browser";
import { useNavigate } from "react-router-dom";
import { IoIosCall } from "react-icons/io";

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
          src={
            whiteTheme
              ? require("../../../Utils/Images/logo-beta-black.png")
              : require("../../../Utils/Images/logo-events.png")
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
  position="unset"
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
            ? { background: "white" , position:position }
            : backgroundDark
            ? { background: "#121212" , position:position }
            : {position:position}
        }
      >
        <img
          src={
            whiteTheme
              ? require("../../../Utils/Images/logo-beta-black.png")
              : require("../../../Utils/Images/logo-events.png")
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
                  window.open("https://www.anchors.in/eventpricing")
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
                  !localStorage.getItem("jwtToken") ? navigate("/login") : navigate("/dashboard")
                }}
              >
                {localStorage.getItem("jwtToken")
                  ? "My Account"
                  : "Get Started"}
              </button>
            )}
          </section>
          
        </div>
      </section>
    </>
  );
}

export default Navbar;
