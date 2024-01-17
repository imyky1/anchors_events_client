import React, { useContext, useState } from "react";
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
import { TooltipBox } from "../Create Services/InputComponents/fields_Labels";
import { siteControlContext } from "../../../../Context/SiteControlsState";
import { MdOutlineUpgrade } from "react-icons/md";
import { linkedinContext } from "../../../../Context/LinkedinState";

function Sidebar({ userData, moreInfo, alternateInfo }) {
  const localtion = useLocation();
  const navigate = useNavigate();
  const { shortSidebar } = useContext(siteControlContext);
  const {verifiedData} = useContext(linkedinContext)

  const [showPopup, setshowPopup] = useState(false); // handle profile warn feature ---------------------

  const handleClickNotFilledInviteCode = () => {
    if (!userData?.inviteCode) {
      setshowPopup(true);
    }
  };

  if (shortSidebar) {
    return <SidebarShort />;
  } else {
    return (
      <>
        {showPopup && (
          <ProfileInfoWarn
            toClose={() => {
              setshowPopup(false);
            }}
          />
        )}

        {window.screen.width > 600 ? (
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
                        : PNGIMG
                    }
                    alt=""
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = PNGIMG;
                    }}
                  />
                  <div>
                    <p className="text_sidebar_01">
                      {alternateInfo?.name ?? userData?.name}
                    </p>
                    <div className="text_sidebar_02">
                      {moreInfo?.Rating !== 0 && (
                        <span style={{ marginRight: "12px" }}>
                          <i className="fa-solid fa-star"></i>{" "}
                          {moreInfo?.Rating}
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
               {verifiedData?.planActivated && <p>Plan : {verifiedData?.planActivated?.planID?.name}</p>}

                {/* <button onClick={()=>{navigate("/pricing"); mixpanel.track("Upgrade")}}>
                <MdOutlineUpgrade />Upgrade
                </button> */}
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
                    mixpanel.track("My events");
                  }}
                >
                  <img src={svg2} alt="" />
                  My Events
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
        ) : (
          //  mobile ui for sidebar ------------
          <div className="sidebar_main_box">
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
                  mixpanel.track("My events");
                }}
              >
                <img src={svg2} alt="" />
                My Events
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
        )}
      </>
    );
  }
}

function SidebarShort({ setShortSidebar }) {
  const localtion = useLocation();
  const navigate = useNavigate();

  const [tooltips, setTooltips] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  });

  return (
    <div className="sidebar2_main_box">
      <div>
        {/* <IoMenu size={24} color="#EEEEEE" style={{ cursor: "pointer" }} /> */}
        <img src={require("../../../../Utils/Images/logo.png")} alt="anchors" />
        <section className="sidebar2_navigation">
          <Link
            to=""
            className={`${
              (localtion.pathname === "/dashboard" ||
                localtion.pathname === "/dashboard/createservice") &&
              "sidebar2_navigation_active"
            } sidebar2_navigation_normal`}
            onMouseOver={() => {
              setTooltips({ ...tooltips, one: true });
            }}
            onMouseLeave={() => {
              setTooltips({ ...tooltips, one: false });
            }}
          >
            <img src={svg1} alt="" />
            {tooltips?.one && (
              <TooltipBox text="Dashboard" top="unset" left="84px" />
            )}
          </Link>

          <Link
            to="mycontents"
            className={`${
              localtion.pathname === "/dashboard/mycontents" &&
              "sidebar2_navigation_active"
            } sidebar2_navigation_normal`}
            onClick={() => {
              mixpanel.track("My Events");
            }}
            onMouseOver={() => {
              setTooltips({ ...tooltips, two: true });
            }}
            onMouseLeave={() => {
              setTooltips({ ...tooltips, two: false });
            }}
          >
            <img src={svg2} alt="" />
            {tooltips?.two && (
              <TooltipBox text="My Events" top="unset" left="90px" />
            )}
          </Link>
          <Link
            to="paymentSummary"
            className={`${
              (localtion.pathname === "/dashboard/paymentInfo" ||
                localtion.pathname === "/dashboard/paymentSummary") &&
              "sidebar2_navigation_active"
            } sidebar2_navigation_normal`}
            onClick={() => {
              mixpanel.track("Payment");
            }}
            onMouseOver={() => {
              setTooltips({ ...tooltips, three: true });
            }}
            onMouseLeave={() => {
              setTooltips({ ...tooltips, three: false });
            }}
          >
            <img src={svg3} alt="" />
            {tooltips?.three && (
              <TooltipBox text="Payment" top="unset" left="84px" />
            )}
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Sidebar;
