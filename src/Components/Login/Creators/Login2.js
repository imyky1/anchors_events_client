import mixpanel from "mixpanel-browser";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SuperSEO } from "react-super-seo";
import { host } from "../../../config/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { FcGoogle } from "react-icons/fc";
import { ImLinkedin2 } from "react-icons/im";
import "../../Signup/Signup.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { EventsNavbar } from "../../Layouts/Navbar Creator/Navbar";

function Login2() {
  // Visited page mix panel
  useEffect(() => {
    mixpanel.track("Visited Login Page");
  }, []);

  const handleGoogle = async () => {
    mixpanel.track("Login using Google");
    localStorage.setItem("isUser", "");
    localStorage.setItem("from", "google");
    localStorage.setItem("authFor", "login"); // to know if the page is login or signup
    window.open(`${host}/google/auth`, "_self");
  };

  const handlelinkedin = async () => {
    mixpanel.track("Login using Linkedin");
    localStorage.setItem("isUser", "");
    localStorage.setItem("from", "linkedin");
    localStorage.setItem("authFor", "login");
    window.open(`${host}/login/auth/linkedin`, "_self");
  };

  if (
    localStorage.getItem("jwtToken") &&
    localStorage.getItem("isUser") === ""
  ) {
    window.open("/dashboard", "_self");
    return null;
  }

  return (
    <>
      <EventsNavbar noAccount={true} showPricingButton={false} position="absolute" />
      <div className="signup_page">
        <div className="left_signup_side">
        <h2 className="login_page_text_header_01">Why anchors events?</h2>
          <Swiper
            spaceBetween={10}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              // el: `swiper-container swiper-container-testClass`,
              bulletClass: `swiper-pagination-bullet swiper-pagination-testClass`,
            }}
            style={{ width: "100%" }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >

            <SwiperSlide>
              <section className="sliding_section_login_events">
                <img
                  className="signup_img1"
                  src={require("../../../Utils/Images/loginback1.png")}
                  alt=""
                />
                <span>Increase registration by 1.5x</span>
              </section>
            </SwiperSlide>
            <SwiperSlide>
              <section className="sliding_section_login_events">
                <img
                  className="signup_img1"
                  src={require("../../../Utils/Images/loginback2.png")}
                  alt=""
                />
                <span>Increase your event reach by referral program</span>
              </section>
            </SwiperSlide>
            <SwiperSlide>
              <section className="sliding_section_login_events">
                <img
                  className="signup_img1"
                  src={require("../../../Utils/Images/loginback3.png")}
                  alt=""
                />
                <span>Personal touch for your attendee</span>
              </section>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="right_signup_side">
          <h2>Host Your Event</h2>
          <p>
            Welcome to anchors! Host exceptional events and create unforgettable
            moments. Join us now.
          </p>
          <div className="signup_buttons">
            <button onClick={handleGoogle}>
              <FcGoogle /> Continue with Google
            </button>
            <button onClick={handlelinkedin}>
              <ImLinkedin2 style={{ color: "#2867B2" }} /> Continue with
              LinkedIn
            </button>
          </div>
        </div>
      </div>
      <SuperSEO title="Anchors - Login Creators" />
    </>
  );
}

export default Login2;
