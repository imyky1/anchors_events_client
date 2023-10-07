import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./Navbar.css";
import mixpanel from "mixpanel-browser";
import PNGIMG from "../../../../Utils/Images/default_user.png"

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
            : PNGIMG
        }
        alt=""
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = PNGIMG;
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
