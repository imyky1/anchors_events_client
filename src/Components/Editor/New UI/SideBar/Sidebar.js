import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../../../../Utils/Images/logo-events.png";
import Globe from "../Images and svgs/Globe.svg";
import svg1 from "../Images and svgs/dashboard.svg";
import svg2 from "../Images and svgs/Diamond.svg";
import svg3 from "../Images and svgs/Wallet.svg";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProfileInfoWarn from "../../../Modals/ServiceSuccess/Modal1";
import mixpanel from "mixpanel-browser";
import PNGIMG from "../../../../Utils/Images/default_user.png";

function Sidebar({ userData, moreInfo, alternateInfo }) {
  const localtion = useLocation();
  const navigate = useNavigate();
  const [showPopup, setshowPopup] = useState(false); // handle profile warn feature ---------------------

  const handleClickNotFilledInviteCode = () => {
    if (!userData?.inviteCode) {
      setshowPopup(true);
    }
  };

  return (
    <>
      {showPopup && (
        <ProfileInfoWarn
          toClose={() => {
            setshowPopup(false);
          }}
        />
      )}
      <div className="sidebar_main_box">
        <img
          onClick={() => {
            navigate("/");
            mixpanel.track("header logo");
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
                onClick={() => {
                  window.open(`/${userData?.slug}`);
                }}
                src={
                  alternateInfo?.profile
                    ? alternateInfo?.profile
                    : userData?.photo
                    ? userData?.photo
                    :  PNGIMG
                }
                alt=""
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = PNGIMG
                }}
              />
              <div>
                <p className="text_sidebar_01">
                  {alternateInfo?.name ?? userData?.name}
                </p>
                <div className="text_sidebar_02">
                  {moreInfo?.Rating !== 0 && (
                    <span style={{ marginRight: "12px" }}>
                      <i className="fa-solid fa-star"></i> {moreInfo?.Rating}
                    </span>
                  )}
                  <span
                    className="reviews_from_sidebar"
                    onClick={() => {
                      navigate("reviews");
                      mixpanel.track("dashboard Reviews");
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
                mixpanel.track("Public profile link");
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
              onClick={() => {
                mixpanel.track("My content");
              }}
            >
              <img src={svg2} alt="" />
              My Content
            </Link>
            <Link
              to="paymentSummary"
              className={`${
                (localtion.pathname === "/dashboard/paymentInfo" ||
                  localtion.pathname === "/dashboard/paymentSummary") &&
                "sidebar_navigation_active"
              } sidebar_navigation_normal`}
              onClick={() => {
                mixpanel.track("Payment");
              }}
            >
              <img src={svg3} alt="" />
              Payment
            </Link>
            {/* <Link
              to="requests"
              className={`${
                localtion.pathname === "/dashboard/requests" &&
                "sidebar_navigation_active"
              } sidebar_navigation_normal`}
              onClick={() => {
                mixpanel.track("Requests");
              }}
            >
              <img src={svg4} alt="" />
              Requests
            </Link>
            <Link
              to="stats"
              className={`${
                (localtion.pathname === "/dashboard/stats" ||
                  localtion.pathname.includes("/dashboard/serviceStats")) &&
                "sidebar_navigation_active"
              } sidebar_navigation_normal`}
            >
              <img src={svg5} alt="" />
              Statistics
            </Link> */}
          </section>
        </div>

      </div>
    </>
  );
}

export default Sidebar;
