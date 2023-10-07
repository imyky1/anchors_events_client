import React, { useEffect, useState } from "react";
import "./Sample.css";
import "./Event.css";
import { motion } from "framer-motion";

import Banner1 from "./images/Banner1.webp";
import Banner2 from "./images/Banner2.webp";
import Banner3 from "./images/Banner3.webp";
import Banner4 from "./images/Banner4.webp";
import Banner5 from "./images/Banner5.webp";
import mixpanel from "mixpanel-browser";
import { MdEventSeat, MdKeyboardArrowDown } from "react-icons/md";
import { TbMapSearch } from "react-icons/tb";
import MainNewFooter from "../../../Footer/Footer";
import { EventsNavbar } from "../../../Layouts/Navbar Creator/Navbar";
import { ToastContainer } from "react-toastify";

const PersonalizedSection = () => {
  const containerVariant = (index) => {
    let yoffset;
    let xoffset;
    let time;

    switch (index) {
      case 0:
        yoffset = 0;
        xoffset = window.screen.width > 600 ? 140 : 120;
        time = 0.2;
        break;
      case 1:
        yoffset = -40;
        xoffset = window.screen.width > 600 ? 70 : 44;
        time = 0.4;
        break;
      case 2:
        yoffset = -80;
        xoffset = 0;
        time = 0.6;
        break;
      case 3:
        yoffset = -40;
        xoffset = window.screen.width > 600 ? -70 : -44;
        time = 0.4;
        break;
      case 4:
        yoffset = 0;
        xoffset = window.screen.width > 600 ? -140 : -120;
        time = 0.2;
        break;
    }

    return {
      from: {
        opacity: 0,
        y: "300px",
      },
      to: {
        opacity: 1,
        y: yoffset + "px",
        x: xoffset + "px",
        transition: {
          duration: time * 2,
          ease: "easeInOut",
        },
      },
    };
  };

  const imgSrc = [Banner1, Banner2, Banner3, Banner4, Banner5];

  return (
    <section className="personalized_section_sample_page">
      <div>
        {imgSrc?.map((e, i) => {
          return (
            <motion.img
              variants={containerVariant(i)}
              initial="from" // here default type is tween and not spring because it has duration
              whileInView="to"
              viewport={{ once: true }}
              src={e}
              alt=""
              key={i}
            />
          );
        })}
      </div>

      <section>
      <h2 className="header_sample_page01">
        Personalized Invitation Cards: Designed to Impress
      </h2>
      <p className="header_sample_page02" style={{ textAlign: "center" }}>
        Give Your Attendees a Personalized Touch - Shareable Invite Cards They
        Can Proudly Share on Social Platforms!
      </p>
      </section>
      {/* <button
        className="button_sample_page01"
        onClick={() => {
          window.open("https://www.anchors.in/static/success");
          mixpanel.track("Event Page Explore a Sample 3");
        }}
      >
        <TbMapSearch size={32} /> Explore a Sample
      </button> */}
    </section>
  );
};

function Sample() {
  const [openLoginModalFromOutside, setOpenLoginModalFromOutside] = useState(false)

  useEffect(() => {
    mixpanel.track("Event Page Page Visit");
  }, []);

  const imgVariant = (scale = 1) => {
    return {
      from: {
        opacity: 0,
        scale: 0.8,
      },
      to: {
        opacity: 1,
        scale: scale,
        transition: {
          duration: 2,
        },
      },
    };
  };

  const textVariant01 = (timedelay = 0.85) => {
    return {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
        transition: {
          duration: timedelay,
          // ease: "ease",
        },
      },
    };
  };

  return (
    <div className="sample_page_wrapper">
      {/* Hero Section  */}
      <section
        className="main_header_component_event_page"
        style={{ position: "relative" }}
      >
        <EventsNavbar
          backgroundDark={true}
          openLoginModalValue = {openLoginModalFromOutside}
          setOpenLoginModalFromOutside={setOpenLoginModalFromOutside}
        />

        {/* Main detail of the component */}

        <div className="main_title_event_box">
          <motion.h1
            style={window.screen.width > 600 ? { textTransform: "unset" } : {}}
            initial="from"
            animate="to"
            variants={textVariant01()}
          >
            Supercharge your Event's Success with{" "}
            <span style={{ color: "red" }}>anchors!</span>
          </motion.h1>

          <motion.section
            className="button_event_landing"
            initial="from"
            animate="to"
            variants={textVariant01(1.5)}
          >
            <button
              onClick={() => {
                localStorage.getItem("jwtToken") &&
                localStorage.getItem("isUser") === ""
                  ? window.open("/dashboard", "_self")
                  : setOpenLoginModalFromOutside(true)

                mixpanel.track("Event Page Host Your Event");
              }}
            >
              <MdEventSeat size={32} /> Host Your Event
            </button>

            <span>It takes only 30 sec to create an event</span>
          </motion.section>
        </div>

        <a href="#benefits">
          <MdKeyboardArrowDown className="arrow_button_sample_page" />
        </a>
      </section>

      {/* benefits section ----------- */}

      <section className="benefits_sample_page" id="benefits">
        <h2>
          Your Event, Your Spotlight –{" "}
          <span style={{ color: "red" }}>anchors</span> Takes Care of the Rest!
        </h2>
        <section>
          <div className="left_division_sample_page">
            <h2 className="header_sample_page01">Design Stunning Pages</h2>
            <p className="header_sample_page02">
              Immerse Your Audience in Eye-Catching Event Pages that Make a
              Lasting Impression.
            </p>
           {window.screen.width > 600 && <button
              className="button_sample_page01"
              onClick={() => {
                window.open("https://go.anchors.in/PvlD");
                mixpanel.track("Event Page Explore a Sample 1");
              }}
            >
              <TbMapSearch size={32} /> Explore a Sample
            </button>}
          </div>
          <div className="right_division_sample_page">
            <motion.img
              src={
                "https://anchors-assets.s3.amazonaws.com/1696423005715-Device_-_Macbook_Air_(5)-min.webp"
              }
              alt=""
              variants={imgVariant(1)}
              initial="from" // here default type is tween and not spring because it has duration
              whileInView="to"
              viewport={{ once: true }}
            />
          </div>

          {window.screen.width < 600 && <button
              className="button_sample_page01"
              onClick={() => {
                window.open("https://go.anchors.in/PvlD");
                mixpanel.track("Event Page Explore a Sample 1");
              }}
            >
              <TbMapSearch size={32} /> Explore a Sample
            </button>}
        </section>
      </section>

      <section className="sample_page_divison_section">
        <div className="left_division_sample_page">
          <h2 className="header_sample_page01" style={window.screen.width < 600 ? {width:"75%"} : {}}>
            Boost Your Reach with Our Dynamic Referral Program
          </h2>
          <p className="header_sample_page02" style={window.screen.width < 600 ? {width:"65%"} : {}}>
            Amplify Word-of-Mouth Impact: Reward Top Referrers, Encourage
            Engagement & Friendly Competition!
          </p>
          {window.screen.width > 600 && <button
            className="button_sample_page01"
            onClick={() => {
              window.open("https://www.anchors.in/static/success");
              mixpanel.track("Event Page Explore a Sample 2");
            }}
          >
            <TbMapSearch size={32} /> Explore a Sample
          </button>}
        </div>
        <div className="right_division_sample_page2">
          <motion.img
            src={
              "https://anchors-assets.s3.amazonaws.com/1696349338102-iPhone-14-Pro-Mockup-1-1.webp"
            }
            alt=""
            variants={imgVariant(window.screen.width < 600 ? 1.5 : 1)}
            initial="from" // here default type is tween and not spring because it has duration
            whileInView="to"
            viewport={{ once: true }}
          />
        </div>
        {window.screen.width < 600 && <button
            className="button_sample_page01"
            onClick={() => {
              window.open("https://www.anchors.in/static/success");
              mixpanel.track("Event Page Explore a Sample 2");
            }}
          >
            <TbMapSearch size={32} /> Explore a Sample
          </button>}
      </section>

      {/* Personalized section */}
      <PersonalizedSection />

      <section className="sharing_section_sample_page">
        <div>
          <h2 className="header_sample_page01">Seamless Content Sharing</h2>
          <p className="header_sample_page02">
            Effortless Event Content Sharing: Focus on What Matters, We Handle
            the Rest!
          </p>
          {window.screen.width > 600 && <button
            className="button_sample_page01"
            onClick={() => {
              window.open("https://www.anchors.in/static/success");
              mixpanel.track("Event Page Explore a Sample 4");
            }}
          >
            <TbMapSearch size={32} /> Explore a Sample
          </button>}
        </div>
        <motion.img
          src={
            "https://anchors-assets.s3.amazonaws.com/1696349320488-iPhone-14-Pro-Mockup-1-1-_1_.webp"
          }
          alt=""
          variants={imgVariant(window.screen.width < 600 ? 1.5 : 1)}
          initial="from" // here default type is tween and not spring because it has duration
          whileInView="to"
          viewport={{ once: true }}
        />
        {window.screen.width < 600 && <button
            className="button_sample_page01"
            onClick={() => {
              window.open("https://www.anchors.in/static/success");
              mixpanel.track("Event Page Explore a Sample 4");
            }}
          >
            <TbMapSearch size={32} /> Explore a Sample
          </button>}
      </section>

      <section className="extra_section_sample_page">
        <h3>Ready to Transform Your Event Hosting Experience?</h3>
        <button
          className="button_sample_page01"
          onClick={() => {
            localStorage.getItem("jwtToken") &&
            localStorage.getItem("isUser") === ""
              ? window.open("/dashboard", "_self")
              : setOpenLoginModalFromOutside(true)
            mixpanel.track("Event Page Yes, I'm ready!");
          }}
        >
          Yes, I'm ready!{" "}
        </button>
      </section>

      <MainNewFooter
        onEvents={true}
        footerOptions1={[
          {
            title: "Event Pricing",
            link: "pricing",
          },
          {
            title: "Sample Event Page",
            link: "https://www.anchors.in/e/how-to-become-a-product-manager",
          },
          {
            title: "Sample Referral Page",
            link: "https://www.anchors.in/static/success",
          },
        ]}
        noPrivacyPolicy={false}
        noRefund={false}
        useEventsLogo={true}
      />

      <ToastContainer theme="dark" limit={1}/>
    </div>
  );
}

export default Sample;
