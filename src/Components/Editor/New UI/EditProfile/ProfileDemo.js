import InstagramIcon from "../../../../Utils/Icons/instagram.svg";
import fbIcon from "../../../../Utils/Icons/fb.svg";
import TelgramIcon from "../../../../Utils/Icons/telegram.svg";
import YoutubeIcon from "../../../../Utils/Icons/youtube.svg";
import topmateIcon from "../../../../Utils/Icons/topmate.svg";
import linkedinIcon from "../../../../Utils/Icons/linkedin.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PNGIMG from "../../../../Utils/Images/default_user.png";
import { RiStarSFill } from "react-icons/ri";
import "./ProfilePage.css";

import "./Preview.css";
import { useEffect } from "react";

const PreviewDemo = ({
  profile,
  pageName,
  email,
  name,
  tagLine,
  linkedInLink,
  twitterLink,
  instaLink,
  fbLink,
  ytLink,
  topmateLink,
  teleLink,
  Rating,
  Reviews,
  newImage,
  about,
}) => {
  useEffect(() => {
    let doc = document.querySelector("#about_creator_profile_live_demo");
    if (doc) {
      doc.innerHTML = "";
      doc.innerHTML = about;
    }
  }, [about]);

  return (
    <div className="perview_demo_mobile_view_edit_profile">
      <div>
        {/* Navbar */}
        <section className="live_demo_navbar_section">
          <img
            src={newImage ?? profile}
            alt=""
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = PNGIMG;
            }}
          />

          <button>Login</button>
        </section>

        <section className="live_demo_main_creator_details">
          <LazyLoadImage
            src={newImage ?? profile}
            alt={pageName}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = PNGIMG;
            }}
          />
          <h1
            className="text_creator_profile_page-01"
            style={{ fontSize: "24px" }}
          >
            {pageName}
          </h1>
          <p
            className="text_creator_profile_page-02"
            style={{ fontSize: "15px", width: "100%", wordWrap: "break-word" }}
          >
            {tagLine}
          </p>

          <div>
            {/* {Rating && (
              <span>
                {" "}
                <RiStarSFill
                  rSFill
                  size={18}
                  color="rgba(255, 214, 0, 1)"
                />{" "}
                {Rating}/5
                <span style={{ color: "gray" }}>
                  {Reviews !== 0 && `(${Reviews})`}
                </span>
              </span>
            )} */}
          </div>
        </section>

        {/* Deatils section for mobile --------- */}
        <section>
          <div
            className="social-icons-new-creator-page"
            style={{ gap: "8px", marginTop: "10px" }}
          >
            {linkedInLink?.length !== 0 && (
              <div style={{ height: "32px", padding: "8px", width: "32px" }}>
                <img src={linkedinIcon} alt="" />
              </div>
            )}

            {fbLink?.length !== 0 && (
              <div style={{ height: "32px", padding: "8px", width: "32px" }}>
                <img src={fbIcon} alt="" />
              </div>
            )}

            {instaLink?.length !== 0 && (
              <div style={{ height: "32px", padding: "8px", width: "32px" }}>
                <img src={InstagramIcon} alt="" />
              </div>
            )}

            {/* {twitterLink?.length !== 0 && (
              <div style={{ height: "32px", padding: "8px", width: "32px" }}>
                <img src={InstagramIcon} alt="" />
              </div>
            )} */}

            {teleLink?.length !== 0 && (
              <div style={{ height: "32px", padding: "8px", width: "32px" }}>
                <img src={TelgramIcon} alt="" />
              </div>
            )}

            {ytLink?.length !== 0 && (
              <div style={{ height: "32px", padding: "8px", width: "32px" }}>
                <img src={YoutubeIcon} alt="" />
              </div>
            )}

            {topmateLink?.length !== 0 && (
              <div style={{ height: "32px", padding: "8px", width: "32px" }}>
                <img src={topmateIcon} alt="" />
              </div>
            )}
          </div>

          <button
            className="button01_new_crator_profile"
            style={{
              boxSizing: "border-box",
              fontSize: "16px",
              marginTop: "12px",
              padding: "12px 20px",
              width: "100%",
            }}
          >
            Request Resource
          </button>
        </section>

        {/* About Section ------------- */}
        <section
          className="about_section_new_creator_profile"
          style={{ marginTop: "31px", marginBottom: "120px" }}
        >
          <h2
            className="text_creator_profile_page-03"
            style={{ fontSize: "20px" }}
          >
            About
          </h2>

          <p
            className="text_creator_profile_page-04"
            id="about_creator_profile_live_demo"
            style={{ fontSize: "12px", width: "100%", wordWrap: "break-word" }}
          >
            {about
              ? (document.getElementById(
                  "about_creator_profile_live_demo"
                ).innerHTML = about)
              : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ad beatae obcaecati sed iure, cupiditate ratione culpa, libero ducimus nam fugit quos labore non sint saepe iusto itaque laudantium accusamus."}
          </p>
        </section>
      </div>
    </div>
  );
};

export default PreviewDemo;
