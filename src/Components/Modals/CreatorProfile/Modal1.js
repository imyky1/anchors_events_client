import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import "./Modal.css";
import mixpanel from "mixpanel-browser";

function Modal1({
  open,
  toClose,
  userData,
  moreInfo,
  alternateInfo,
  openHelp,
  openFb,
}) {
  const navigate = useNavigate();

  open &&
    document?.addEventListener("click", () => {
      toClose();
    });

  if (!open) {
    return null;
  }

  return (
    <>
      <div
        className="creator_modal_info"
        onClick={(e) => e?.stopPropagation()}
        style={!moreInfo ? { height: "290px" } : {}}
      >
        <section className="profile_section_creator_info">
          <LazyLoadImage
            effect="blur"
            className="profile_section_creator_info_image"
            src={
              alternateInfo?.profile
                ? alternateInfo?.profile
                : userData?.photo
                ? userData?.photo
                : require("../../../Utils/Images/default_user.png")
            }
            alt=""
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = require("../../../Utils/Images/default_user.png");
            }}
          />
          <span>{alternateInfo?.name ?? userData?.name}</span>

          {/* Means is the user is wailtist user or verified user ----------------------------- */}
          {moreInfo && (
            <>
              <div>
                <span
                  className="hover_span_modal_creatorinfo"
                  onClick={() => {
                    toClose();
                    navigate("reviews");
                    mixpanel.track("Events Profile Reviews");
                  }}
                >
                  {moreInfo ? moreInfo?.Reviews : "--"} Reviews
                </span>

                <span
                  className="hover_span_modal_creatorinfo"
                  onClick={() => {
                    toClose();
                    navigate("mycontents");
                    mixpanel.track("Events Profile Services");
                  }}
                >
                  {moreInfo ? moreInfo?.Events : "--"} Events
                </span>
              </div>
              <button
                onClick={() => {
                  navigate("editprofile");
                  toClose();
                  mixpanel.track("Events Profile Edit Profile");
                }}
              >
                Edit Profile
              </button>
            </>
          )}
        </section>

        <section className="options_creator_profile_info">

          {moreInfo && (
            <div
              onClick={() => {
                openFb();
                toClose();
                mixpanel.track("Events Creators Feedback Form");
              }}
              >
              Feedback Form
            </div>
          )}

          <div
            onClick={() => {
              window.open("/pricing");
              mixpanel.track("Events Profile Pricing");
            }}
            >
            Pricing
          </div>
          {/* <div onClick={openHelp}>Help</div> */}
          <div
            onClick={() => {
              window.open(
                "https://api.whatsapp.com/send?phone=918692006538&text=Hey,%20I%20would%20like%20to%20connect%20with%20anchors%20Team"
                );
                mixpanel.track("Events Profile Help ");
                mixpanel.track("Events Continued to whatsapp help")
              }}
              >
            Help
          </div>
        </section>

        <div
          className="logout_button_modal"
          onClick={() => {
            window.open("/logout", "_self");
            mixpanel.track("Events Profile Logout ");
          }}
        >
          <i className="fa-solid fa-right-from-bracket fa-lg"></i>
        </div>
      </div>
    </>
  );
}

export default Modal1;
