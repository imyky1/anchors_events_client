import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./Navbar.css";
import mixpanel from "mixpanel-browser";
import PNGIMG from "../../../../Utils/Images/default_user.png";
import { useNavigate } from "react-router-dom";
import { siteControlContext } from "../../../../Context/SiteControlsState";
import { RiCoinsFill } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import { linkedinContext } from "../../../../Context/LinkedinState";

function Navbar({ ChangeModalState, ModalState, userData, alternateInfo }) {
  const navigate = useNavigate();

  const { shortSidebar } = useContext(siteControlContext);
  const {verifiedData} = useContext(linkedinContext)

  // handles the openeing of the creator modal
  const handleModalOpening = (e) => {
    e?.stopPropagation();
    mixpanel.track("Event Header Profile ");
    ModalState ? ChangeModalState(false) : ChangeModalState(true);
  };

  if (shortSidebar) {
    return null;
  }

  return (
    <>
      <div className="navbar_outside_container">
        {window.screen.width < 600 && (
          <img
            onClick={() => {
              navigate("/");
              mixpanel.track("header logo");
            }}
            src={require("../../../../Utils/Images/logo-invite-only.png")}
            alt=""
            className="logo_sidebar"
          />
        )}

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

        {verifiedData?.planActivated && <>
        <button className="navbar_dashboard_button01"><RiCoinsFill /> {verifiedData?.planActivated?.usageID?.totalAvailableCredits - verifiedData?.planActivated?.usageID?.creditsData?.length} Credits Left</button>

        <button className="navbar_dashboard_button01"><FaRegClock /> {new Date(new Date(verifiedData?.planActivated?.expireAt) - Date.now()).getDate() - 1} days left</button>
        </>}
      </div>
    </>
  );
}

export default Navbar;
