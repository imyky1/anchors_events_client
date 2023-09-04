import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./Navbar.css";
import mixpanel from "mixpanel-browser";

function Navbar({ ChangeModalState, ModalState, userData, alternateInfo }) {
  // handles the openeing of the creator modal
  const handleModalOpening = (e) => {
    e?.stopPropagation();
    mixpanel.track("Event Header Profile ");
    ModalState ? ChangeModalState(false) : ChangeModalState(true);
  };

  return (
    <div className="navbar_outside_container">
      <LazyLoadImage
        effect="blur"
        className="creators_navbar_image"
        onClick={handleModalOpening}
        src={
          alternateInfo?.profile
            ? alternateInfo?.profile
            : userData?.photo
            ? userData?.photo
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHaAfOzOEovz1u7rsIMbl_SzAAxk99xlyxAVJ4r3475UvmyHLFVZSZkaGSbLFc5PNRO3A&usqp=CAU"
        }
        alt=""
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = require("../../../../Utils/Images/default_user.png");
        }}
      />

      {/* <span
        className="fancy_navbar_link01"
        onClick={() => {
          mixpanel.track("Events Host your event");
          window.open("https://www.anchors.in/hostevent", "_blank");
        }}
      >
        Host Event
      </span> */}
    </div>
  );
}

export default Navbar;
