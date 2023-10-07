import React, { useState } from "react";
import "./Footer.css";
import "./Main.css";
import { Link, useNavigate } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import HelpModal from "../Modals/ModalType01/HelpModal";
import nine from "./nine.webp";
import tenth from "./tenth.webp";
import anchor from "../../Utils/Images/logo-invite-only.png";
import anchorEvents from "../../Utils/Images/logo-events.png";
import { MdEventSeat } from "react-icons/md";


const MainNewFooter = ({
  handleButton,
  footerOptions1,
  noPrivacyPolicy = true,
  noRefund = true,
  onEvents = false, //
  useEventsLogo = false,
  hostEventButton = false,
}) => {
  return (
    <>
      <div
        className="home_page_outer_first_body3"
        style={{
          backgroundImage: `url(${
            window.screen.width > 600 && !onEvents ? nine : tenth
          })`,
        }}
      >
        <div className="home_page_outer_nine_body_020">anchors</div>
        {hostEventButton && <button
          onClick={() => {
            window.open("/hostevent", "_self");
            mixpanel.track("Host Your Own Event footer");
          }}
        >
          <MdEventSeat /> Host Your Own Event
        </button>}
        <div className="home_page_outer_nine_body_0201">
          {!footerOptions1 ? (
            <div className="home_page_outer_nine_body_021">
              <div
                className="home_page_outer_nine_body_021_individual"
                onClick={() => {
                  window.open("https://events.anchors.in/");
                }}
              >
                Events
              </div>
              <div
                className="home_page_outer_nine_body_021_individual"
                onClick={() => {
                  window.open("/earning-predictor");
                }}
              >
                EPA
              </div>
              {window.location.pathname !== "/pricing" && (
                <div
                  className="home_page_outer_nine_body_021_individual"
                  onClick={() => {
                    window.open("/pricing");
                  }}
                >
                  Pricing
                </div>
              )}
            </div>
          ) : (
            <div className="home_page_outer_nine_body_021">
              {footerOptions1?.map((e, i) => {
                return (
                  <div
                    className="home_page_outer_nine_body_021_individual"
                    onClick={() => {
                      window.open(e?.link);
                    }}
                  >
                    {e?.title}
                  </div>
                );
              })}
            </div>
          )}

          <div className="home_page_outer_nine_body_022">
            {noPrivacyPolicy &&
              window.location.pathname !== "/privacy-policy" && (
                <div
                  className="home_page_outer_nine_body_0212_individual"
                  onClick={() => {
                    window.open("https://www.anchors.in/privacy-policy");
                  }}
                >
                  Privacy Policy
                </div>
              )}
            {window.location.pathname !== "/termsConditions" && (
              <div
                className="home_page_outer_nine_body_0212_individual"
                onClick={() => {
                  window.open("https://www.anchors.in/termsConditions");
                }}
              >
                Terms & Conditions
              </div>
            )}
            {window.location.pathname !== "/aboutUs" && (
              <div
                className="home_page_outer_nine_body_0212_individual"
                onClick={() => {
                  window.open("https://www.anchors.in/aboutUs");
                }}
              >
                About Us
              </div>
            )}
            {window.location.pathname !== "/contactUs" && (
              <div
                className="home_page_outer_nine_body_0212_individual"
                onClick={() => {
                  window.open("https://www.anchors.in/contactUs");
                }}
              >
                Contact Us
              </div>
            )}
            {noRefund && window.location.pathname !== "/refundPolicy" && (
              <div
                className="home_page_outer_nine_body_0212_individual"
                onClick={() => {
                  window.open("https://www.anchors.in/refundPolicy");
                }}
              >
                Refund Policy
              </div>
            )}
          </div>
          {handleButton && (
            <button
              className="home_page_outer_fifth_body_03_middle_down_button"
              onClick={() => {
                handleButton();
                mixpanel.track("join anchors footer");
              }}
            >
              Join Our Exclusive Community
            </button>
          )}
          <img
            src={useEventsLogo ? anchorEvents : anchor}
            style={{
              width: window.screen.width > 600 ? "161.464px" : "81px",
              margin: "0 auto",
              marginTop: window.screen.width > 600 ? "40px" : "10px",
              cursor: "pointer",
              height: window.screen.width > 600 ? "44px" : "24px",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default MainNewFooter;
