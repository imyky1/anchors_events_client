import { LazyLoadImage } from "react-lazy-load-image-component";
import "../EditProfile/Preview.css";
import "../Sample Page/Event.css"
import "../Sample Page/Sample.css"
import { useEffect } from "react";

import ExcelIcon from "../../../../Utils/Icons/excel-service.svg";
import VideoIcon from "../../../../Utils/Icons/video-service.svg";
import DocIcon from "../../../../Utils/Icons/doc-service.svg";
import TrendIcon from "../../../../Utils/Icons/trend-service.svg";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RiStarSFill } from "react-icons/ri";
import PNGIMG from "../../../../Utils/Images/default_user.png";


const spanStyle = {
  color: "#f1f5f9",
  fontFamily: "Gilroy-Regular, sans-serif",
  fontSize: "16px",
  fontStyle: "normal",
  lineHeight: "normal",
  textAlign: "center",
};

const CreateEventDemo = ({
  sname,
  ldesc,
  smrp,
  ssp,
  paid,
  stype,
  date,
  startTime,
  endTime,
  cname,
  cprofile,
  crating,
  ctagline,
  seatCapacity,
  eventSeatCapacity,
  speakersArray,
  speakersImagesArray
}) => {

  useEffect(() => {
    let doc = document.querySelector("#content_event_html");
    if (ldesc) {
      if (doc) {
        doc.innerHTML = "";
        doc.innerHTML = ldesc;
      }
    } else {
      doc.innerHTML =
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, facilis!";
    }
  }, [ldesc]);

  const convertTime = (inputTime) => {
    if (inputTime) {
      var timeParts = inputTime?.split(":");
      var hours = parseInt(timeParts[0]);
      var minutes = parseInt(timeParts[1]);

      var period = hours >= 12 ? "PM" : "AM";
      hours = hours > 12 ? hours - 12 : hours;

      var convertedTime =
        hours.toString().padStart(2, "0") +
        ":" +
        minutes.toString().padStart(2, "0") +
        " " +
        period;

      return convertedTime;
    }
  };

  const getDate = (date) => {
    let d = new Date(date);

    let newDate = d.toDateString().split(" ");

    return (
      newDate[0] + " | " + newDate[1] + " " + newDate[2] + " " + newDate[3]
    );
  };

  return (
    <div className="perview_demo_mobile_view_edit_profile">
      <div>
        {/* Navbar */}
        <section className="live_demo_navbar_section">
          <img
            src={require("../../../../Utils/Images/logo-invite-only.png")}
            alt=""
          />

          <button>Sign Up</button>
        </section>

        <div
          className="event_page_outside_wrapper"
          style={{ width: "100%", height: "100%" }}
        >
          <section
            className="main_header_component_event_page"
            style={{ justifyContent: "center", height: "100%" }}
          >
            {/* Main detail of the component */}
            <div className="main_title_event_box" style={{ gap: "40px" }}>
              <h1
                style={{ fontSize: "40px", width: "80%", lineHeight: "50px" }}
              >
                {sname?.length > 0 ? sname : "Lorem ipsum dolor sit amet."}
              </h1>
              <span style={{ fontSize: "16px" }}>by {cname}</span>

              <button
                style={{ fontSize: "16px", padding: "16px 20px" }}
                onClick={() => {
                  const section = document.getElementById("eventDetails");
                  section.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Event Details
              </button>
            </div>

            <a href="#eventDetails">
              <MdKeyboardArrowDown className="arrow_button_sample_page" />
            </a>
          </section>

          <section
            className="desc_mobile_view_event"
            id="eventDetails"
            style={{
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              justifyContent: "center",
              minHeight: "100%",
              padding: "20px 16px",
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
              width: "100%",
            }}
          >
            <h2
              style={{
                color: "#fff",
                fontFamily: "Gilroy-Bold,sans-serif",
                fontSize: "40px",
                fontStyle: "normal",
                lineHeight: "normal",
              }}
            >
              About
            </h2>
            <p
              className="description-event-page"
              id="content_event_html"
              style={{
                color: "#e2e8f0",
                fontFamily: "Gilroy-Regular,sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "normal",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            ></p>
          </section>

          <section
            className="event_desc_screen"
            style={{
              alignItems: "center",
              flexDirection: "column-reverse",
              padding: "initial",
              width: "100%",
            }}
          >
            <div
              className="left_side_scrollable"
              style={{
                width: "100%",
                zIndex: "99",
              }}
            >
              <section
                className="scrollable_section_event"
                id="eventDetails"
                style={{ alignItems: "center" }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: "35px",
                  }}
                >
                  <section
                    style={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      justifyContent: "center",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "24px",
                        textAlign: "center",
                      }}
                    >
                      Mode
                    </h2>
                    <span style={spanStyle}>
                      {stype !== "Online" ? "Offline" : "Online"}
                    </span>
                  </section>
                  <section
                    style={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      justifyContent: "center",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "24px",
                        textAlign: "center",
                      }}
                    >
                      Date
                    </h2>
                    <span style={spanStyle}>
                      {date ? getDate(date) : getDate(new Date())}
                    </span>
                  </section>
                  <section
                    style={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      justifyContent: "center",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "24px",
                        textAlign: "center",
                      }}
                    >
                      Time
                    </h2>
                    <span style={spanStyle}>
                      {startTime ? convertTime(startTime) : "00:00 AM"} To{" "}
                      {endTime ? convertTime(endTime) : "00:00 AM"}
                    </span>
                  </section>
                  <section
                    style={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      justifyContent: "center",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "24px",
                        textAlign: "center",
                      }}
                    >
                      {seatCapacity === "Enter Manally"
                        ? "Spots available"
                        : "Spots are available"}
                    </h2>
                    <span style={spanStyle}>
                      {seatCapacity === "Enter Manually"
                        ? eventSeatCapacity
                        : ""}
                    </span>
                  </section>
                </div>
              </section>
              {(speakersArray[0]?.name) ? (
                <section className="scrollable_section_event" style={{alignItems:"center"}}>
                  <section
                    className="right_stable_side_top"
                    style={{ width: "62%", gap: "30px",
                    // display: "flex",
                    // alignItems: "center",
                    // justifyContent: "center",
                    // flexDirection: "column",
                    left:"unset"
                  }}
                  >
                    {speakersArray?.map((speaker, index) => (
                      <div className="right_stable_side_image" key={index} style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        gap:"8px",
                        overflow:"hidden"
                      }}>
                        <img
                          src={
                            speakersImagesArray[index] ? URL.createObjectURL(speakersImagesArray[index]) :
                            (speaker?.isCreator
                              ? cprofile
                              : PNGIMG)
                          }
                          alt=""
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = PNGIMG;
                          }}
                        />
                        <div className="right_stable_side_image_desc">
                          <span>{speaker?.name}</span>
                          <p style={{width:"90%"}}>{speaker?.designation}</p>
                        </div>
                      </div>
                    ))}
                  </section>
                </section>
              ) : (
                <section
                  className="scrollable_section_event"
                  style={{ alignItems: "center" }}
                >
                  <section className="right_side_creator_profile_event_page">
                    <img
                      src={cprofile}
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = PNGIMG;
                      }}
                    />
                    <span>{cname}</span>
                    <p>{ctagline}</p>
                    <div>
                      <RiStarSFill size={16} /> {crating}/5
                    </div>
                  </section>
                </section>
              )}

              <section
                className="scrollable_section_event"
                id="reserveSeat"
                style={{ alignItems: "center" }}
              >
                <h2
                  style={{
                    fontSize: "22px",
                    textAlign: "center",
                  }}
                >
                  Reserve your spot
                </h2>
                <span style={{ fontSize: "22px" }}>
                  {paid === "Paid" ? (
                    <>
                      ₹{ssp} <span style={{ fontSize: "14px" }}>{smrp}</span>
                    </>
                  ) : (
                    "For Free"
                  )}
                </span>
                <button
                  style={{
                    fontSize: "14px",
                    marginTop: "0",
                    padding: "12px 18px",
                  }}
                >
                  Register for Event
                </button>
              </section>
            </div>

            <div
              className="right_stable_side"
              style={{
                height: "100%",
                right: "50%",
                top: "8%",
                width: "100%",
              }}
            >
              <img
                src={require("../../../../Utils/Images/mobile-screen.png")}
                alt=""
                style={{
                  height: "80%",
                  width: "78%",
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};


export default CreateEventDemo;