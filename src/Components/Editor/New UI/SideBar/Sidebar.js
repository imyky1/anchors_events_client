import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import logo from "../Images and svgs/logo.svg";
import Globe from "../Images and svgs/Globe.svg";
import svg1 from "../Images and svgs/dashboard.svg";
import svg2 from "../Images and svgs/Diamond.svg";
import svg3 from "../Images and svgs/Wallet.svg";
import svg4 from "../Images and svgs/copy.svg";
import svg5 from "../Images and svgs/Chart-pie-alt.svg";
import svg6 from "../Images and svgs/copy1.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProfileInfoWarn from "../../../Modals/ServiceSuccess/Modal1";
import mixpanel from "mixpanel-browser";

function Sidebar({ userData, moreInfo, alternateInfo }) {
  const localtion = useLocation();
  const navigate = useNavigate();
  const [showPopup, setshowPopup] = useState(false)    // handle profile warn feature ---------------------

  const handleClickNotFilledInviteCode = () => {
    if (!userData?.inviteCode) {
      setshowPopup(true)
    }
  };


  return (
    <>
      {showPopup && <ProfileInfoWarn toClose={()=>{setshowPopup(false)}} />}
      <div className="sidebar_main_box">
        <img
          onClick={() => {
            navigate("/");
            mixpanel.track("Events header logo")
          }}
          src={logo}
          alt=""
          className="logo_sidebar"
        />
        <div>
          <div>
            <section className="creator_sidebar_details">
              <LazyLoadImage
                className="creator_sidebar_image"
                effect="blur"
                src={
                  alternateInfo?.profile
                    ? alternateInfo?.profile
                    : userData?.photo
                    ? userData?.photo
                    : require("../../../../Utils/Images/default_user.png")
                }
                alt=""
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = require("../../../../Utils/Images/default_user.png");
                }}
              />
              <div>
                <p className="text_sidebar_01">{alternateInfo?.name ?? userData?.name}</p>
                <div className="text_sidebar_02">
                  <span
                    className="reviews_from_sidebar"
                    onClick={() => {
                      navigate("reviews");
                      mixpanel.track("Events dashboard Reviews")
                    }}
                  >
                    {moreInfo?.Reviews} Reviews
                  </span>
                </div>
              </div>
            </section>

            {/* <span
              onClick={() => {
                window.open(`/${userData?.slug}`);
                mixpanel.track("Events Public profile link")
              }}
            >
              <img src={Globe} alt="" />
              &nbsp;&nbsp;Public Profile
            </span> */}
          </div>
          <section
            className="sidebar_navigation"
            onClick={handleClickNotFilledInviteCode}
          >
            <Link
              to=""
              className={`${
                (localtion.pathname === "/dashboard" ||
                  localtion.pathname === "/dashboard/createservice") &&
                "sidebar_navigation_active"
              } sidebar_navigation_normal`}
            >
              <img src={svg1} alt="" />
              Dashboard
            </Link>
            <Link
              to="mycontents"
              className={`${
                localtion.pathname === "/dashboard/mycontents" &&
                "sidebar_navigation_active"
              } sidebar_navigation_normal`}

              onClick={()=>{mixpanel.track("Events My content")}}
              >
              <img src={svg2} alt="" />
              My Events
            </Link>
            <Link
              to="paymentSummary"
              className={`${
                (localtion.pathname === "/dashboard/paymentInfo" || localtion.pathname === "/dashboard/paymentSummary") &&
                "sidebar_navigation_active"
              } sidebar_navigation_normal`}
              onClick={()=>{mixpanel.track("Events Payment")}}
              >
              <img src={svg3} alt="" />
              Payment
            </Link>
            {/* <Link
              to="stats"
              className={`${
                (localtion.pathname === "/dashboard/stats" || localtion.pathname.includes("/dashboard/serviceStats")) &&
                "sidebar_navigation_active"
              } sidebar_navigation_normal`}
            >
              <img src={svg5} alt="" />
              Statistics
            </Link> */}
          </section>
        </div>

        {/* {userData?.inviteCode && (
          <section className="invite_sidebar">
            <h3>INVITE CODE</h3>
            <span>Share & avail EXCLUSIVE <a href="https://go.anchors.in/invite-code-benefit" target="_blank" style={{color:"unset"}}>benefits</a>!*<br/>-limited time offer</span>
            <div
              onClick={() => {
                mixpanel.track("Events copy invite code")
                toast.info("Invite Code Copied Successfully", {
                  position: "top-center",
                  autoClose: 1500,
                });
                navigator.clipboard.writeText(userData?.inviteCode);
              }}
            >
              {userData?.inviteCode}{" "}
              <span>
                <img src={svg6} alt="" />
              </span>
            </div>
          </section>
        )} */}
      </div>
    </>
  );
}

export default Sidebar;
