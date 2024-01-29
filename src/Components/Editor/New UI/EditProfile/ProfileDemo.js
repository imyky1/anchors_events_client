import InstagramIcon from "../../../../Utils/Icons/instagram.svg";
import YoutubeIcon from "../../../../Utils/Icons/youtube.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PNGIMG from "../../../../Utils/Images/default_user.png";
import { RiTelegramLine } from "react-icons/ri";
import { CiFacebook } from "react-icons/ci";
import { IoIosGlobe } from "react-icons/io";
import { TbBrandLinkedin } from "react-icons/tb";
import TwitterIcon from "../../../../Utils/Icons/twitter.svg";
import {
  AiOutlineArrowRight,
  AiOutlineClockCircle,
  AiOutlineDown,
  AiOutlineUp,
} from "react-icons/ai";

import "./ProfilePage.css";

import "./Preview.css";
import { useEffect } from "react";
const ExtraCard = ({ data, type }) => {
  return (
    <div className="host_extra_card_new_profile_page">
      <div className="host_extra_card_profile_details">
        <LazyLoadImage src={require("./image 42.png")} alt="" />

        <section>
          <h2>{"Women’s Health Issues: Reason & Remedies"}</h2>
          <div>
            <span>
              <AiOutlineClockCircle color="#94A3B8" size={14} />
              21 Jul | 08:00-09:00 PM
            </span>
          </div>
        </section>
        <span>
          <AiOutlineArrowRight />
        </span>
      </div>
    </div>
  );
};

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
  websiteLink,
  Rating,
  Reviews,
  newImage,
  about,
  style,
}) => {
  useEffect(() => {
    let doc = document.querySelector("#about_creator_profile");
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <img
              src={newImage ?? profile}
              alt=""
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = PNGIMG;
              }}
            />{" "}
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                fontFamily: style || "Inter",
                color: "#E2E8F0",
              }}
            >
              {pageName ? pageName : ""}
            </div>
          </div>

          <button>Login</button>
        </section>
        <div className="host_outerframe_new_creator_page">
          {/* main details sections ---------------- */}
          <section className="host_main_creator_details_creator_page">
            <div
              style={{
                paddingTop: "20px",
                width: "100%",
                background:
                  "linear-gradient(180deg, #3E3E3E 0%, rgba(18, 18, 18, 0) 100%)",
              }}
            >
              <LazyLoadImage
                src={profile}
                alt={name}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = PNGIMG;
                }}
              />
            </div>
            <div>
              <h1
                style={{ fontFamily: style }}
                className="host_text_creator_profile_page-01"
              >
                {pageName}
              </h1>

              <p
                style={{ fontFamily: style }}
                className="host_text_creator_profile_page-02"
              >
                {tagLine}
              </p>
              {window.screen.width > 600 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      width: "max-content",
                      gap: "20px",
                    }}
                  >
                    <div className="host_social-icons-new-creator-page">
                      {linkedInLink?.length !== 0 && (
                        <div>
                          <TbBrandLinkedin size={24} color="#94A3B8" />
                        </div>
                      )}

                      {fbLink?.length !== 0 && (
                        <div>
                          <CiFacebook size={24} color="#94A3B8" />
                        </div>
                      )}

                      {instaLink?.length !== 0 && (
                        <div>
                          <img src={InstagramIcon} alt="" />
                        </div>
                      )}

                      {teleLink?.length !== 0 && (
                        <div>
                          <RiTelegramLine size={24} color="#94A3B8" />
                        </div>
                      )}

                      {ytLink?.length !== 0 && (
                        <div>
                          <img src={YoutubeIcon} alt="" />
                        </div>
                      )}

                      {twitterLink?.length !== 0 && (
                        <div>
                          <img src={TwitterIcon} alt="" />
                        </div>
                      )}
                      {websiteLink?.length !== 0 && (
                        <div>
                          <IoIosGlobe size={24} color="#94A3B8" />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
          {/* Deatils section for mobile --------- */}
          {window.screen.width < 600 && (
            <section style={{ width: "100%" }}>
              <div className="host_social-icons-new-creator-page">
                {linkedInLink?.length !== 0 && (
                  <div>
                    <TbBrandLinkedin size={24} color="#94A3B8" />
                  </div>
                )}

                {fbLink?.length !== 0 && (
                  <div>
                    <CiFacebook size={24} color="#94A3B8" />
                  </div>
                )}

                {instaLink?.length !== 0 && (
                  <div>
                    <img src={InstagramIcon} alt="" />
                  </div>
                )}

                {teleLink?.length !== 0 && (
                  <div>
                    <RiTelegramLine size={24} color="#94A3B8" />
                  </div>
                )}

                {ytLink?.length !== 0 && (
                  <div>
                    <img src={YoutubeIcon} alt="" />
                  </div>
                )}

                {twitterLink?.length !== 0 && (
                  <div>
                    <img src={TwitterIcon} alt="" />
                  </div>
                )}
                {websiteLink?.length !== 0 && (
                  <div>
                    <IoIosGlobe size={24} color="#94A3B8" />
                  </div>
                )}
              </div>
            </section>
          )}
          {/* About Section ------------- */}
          <section className="host_about_section_new_creator_profile">
            <h2
              style={{ fontFamily: style }}
              className="host_text_creator_profile_page-03"
            >
              About
            </h2>

            <p
              style={{ fontFamily: style }}
              className="host_text_creator_profile_page-04"
              id="about_creator_profile"
            ></p>
          </section>

          {/* past and upcoming events section */}
          <section className="host_past_and_upcoming_section_profile">
            <button style={{ fontFamily: style }} className={"selected"}>
              Upcoming Event
            </button>
            <button style={{ fontFamily: style }}>Past Event</button>
          </section>
          <section
            style={{
              marginTop:'80px',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="host_extra_cards_section_new_creator_profile"
          >
            {/* <ExtraCard/>; */}
            <div
              style={{
                color: "white",
                fontFamily: style || "Inter",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "19px",
                color: "#94A3B8",
              }}
            >
              There no event yet
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PreviewDemo;
