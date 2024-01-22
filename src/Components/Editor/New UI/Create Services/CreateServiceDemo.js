import "../EditProfile/Preview.css";
import "../Sample Page/Event.css";
import { useEffect, useRef, useState } from "react";
import { BsArrowDown } from "react-icons/bs";

import { MdEventSeat } from "react-icons/md";
import PNGIMG from "../../../../Utils/Images/default_user.png";
import {
  IoImageOutline,
  IoLanguageOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { CiCalendarDate } from "react-icons/ci";
import { IoIosArrowRoundForward, IoMdStar } from "react-icons/io";
import { BsQuote } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination } from "swiper/modules";

const SpeakerCard = ({
  name,
  profile,
  optionalProfile,
  designation,
  linkedinLink,
  otherLink,
  sno,
  rating,
  isCreator,
}) => {
  let snoObj = { 1: "1st", 2: "2nd", 3: "#rd" };

  return (
    <div
      className="speaker_card_event_page_wrapper"
      style={{
        padding: "20px 12px",
      }}
    >
      <h3 style={{ fontSize: "16px" }}>{snoObj[sno]} Speaker</h3>

      <section style={{ gap: "16px" }}>
        <img
          src={isCreator ? optionalProfile : profile ?? optionalProfile}
          alt=""
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = PNGIMG;
          }}
          style={{
            borderRadius: "120px",
            height: "120px",
            width: "120px",
          }}
        />

        <span style={{ fontSize: "20px" }}>{name}</span>
      </section>

      <p
        style={{
          fontSize: "12px",
          lineHeight: "18px",
          width: "80%",
          overflowWrap: "break-word",
        }}
      >
        {designation}
      </p>

      {rating && (
        <span>
          <IoMdStar size={16} color="#FFD600" /> {rating}/5
        </span>
      )}

      {/* <div>
        <CiLinkedin />
        <IoLogoInstagram />
      </div> */}
    </div>
  );
};

function getYouTubeVideoId(url) {
  // Regular expression to match YouTube video URL patterns
  const regex = /[?&]v=([^?&]+)/;

  // Extract video ID from the URL using the regular expression
  const match = url.match(regex);

  // Check if a match is found
  if (match && match[1]) {
    return match[1];
  } else {
    // Return null if no match is found
    return null;
  }
}

const CreateEventDemo = ({
  sname,
  ldesc,
  benefits,
  smrp,
  ssp,
  paid,
  stype,
  meetlink,
  date,
  startTime,
  endTime,
  cname,
  cprofile,
  crating,
  eventSeatCapacity,
  speakersArray,
  speakersImagesArray,
  scrollToSection,
  imagesArray,
  videoArray,
  titles,
  testimonialArray,
  wants,
}) => {
  const [isVisibleFloater, setIsVisibleFloater] = useState(false); // for floater visibility
  const targetRef = useRef(null);
  const aboutEventPage = useRef();
  const benefitRef = useRef();
  const previewRef = useRef();

  const scrollTriggers = {
    details: "#eventDetails",
    desc: "#aboutEventPageDemo",
    speakers: "#speakersEventPageDemo",
    benefits: "#benefitsEventPage",
    video:"#videoEventPageDemo",
    images:"#imageEventPageDemo",
    testimonial:"#testimonialEventPageDemo",

  };

  useEffect(() => {
    let a = scrollTriggers[scrollToSection];

    if (a) {
      const section = document.querySelector(a);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const section = document.getElementById("topPageEvent");
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollToSection]);

  useEffect(() => {
    if (aboutEventPage.current) {
      if (ldesc) {
        aboutEventPage.current.innerHTML = ldesc;
      }
    } else {
      aboutEventPage.current.innerHTML =
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere fugit nesciunt repudiandae quo ullam aspernatur corrupti, eaque accusantium expedita non reprehenderit voluptatum assumenda laborum aperiam eum laudan";
    }
  }, [ldesc]);

  useEffect(() => {
    if (benefitRef.current) {
      if (benefits) {
        benefitRef.current.innerHTML = benefits;
      }
    } else {
      benefitRef.current.innerHTML =
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere fugit nesciunt repudiandae quo ullam aspernatur corrupti, eaque accusantium expedita non reprehenderit voluptatum assumenda laborum aperiam eum laudan";
    }
  }, [benefits]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = previewRef?.current?.scrollTop;

      // Adjust this value based on the client height where you want to show the component
      const triggerHeight = targetRef?.current?.clientHeight + 300;

      // Check if the scroll position has crossed the trigger height
      setIsVisibleFloater(scrollY > triggerHeight);
    };

    // Attach the event listener when the component mounts
    previewRef?.current?.addEventListener("scroll", handleScroll);

    // Detach the event listener when the component unmounts
    return () => {
      previewRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []); // Run the effect only once when the component mounts

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

    return newDate[1] + " " + newDate[2] + " " + newDate[3];
  };

  return (
    <div
      className="perview_demo_mobile_view_edit_profile"
      style={{
        left: "3px",
        width: "98%",
        borderRadius: "37px",
      }}
    >
      <div
        style={{
          gap: "4px",
        }}
        ref={previewRef}
      >
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
          style={{ paddingBottom: "80px", width: "100%" }}
        >
          {/*  hoc in event page ------------ */}
          <div
            className="hoc1_wrraper_event_page"
            style={{ padding: "20px 4%" }}
            id="topPageEvent"
          >
            <section
              className="main_header_component_event_page"
              style={{
                flexDirection: "column-reverse",
                gap: "20px",
                padding: "initial",
                height: "unset",
              }}
            >
              <section
                style={{
                  alignItems: "center",
                  gap: "20px",
                  textAlign: "center",
                }}
              >
                <div
                  className="text_type01_event_page"
                  style={{
                    fontSize: "40px",
                    lineHeight: "40px",
                    width:'280px',
                    wordWrap:'break-word'
                  }}
                >
                  {sname?.length > 0 ? sname : "Lorem ipsum dolor sit amet."}
                </div>

                <span
                  className="text_type02_event_page"
                  style={{ fontSize: "16px" }}
                >
                  by {cname}
                </span>

                <button
                  className="button_01_event_page"
                  onClick={() => {
                    const section = document.getElementById("eventDetails");
                    section.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    fontSize: "16px",
                    marginBottom: "19vh",
                    marginTop: "14vh",
                    padding: "16px 24px",
                  }}
                >
                  View Event Details
                </button>
              </section>

              {/* <div
                style={{
                  position: "relative",
                  width: "max-content",
                }}
              >
                <span
                  style={{
                    left: "6px",
                    top: "-54px",
                  }}
                ></span>
                <img
                  src={"https://www.anchors.in:5000/api/file/youtube.png"}
                  alt=""
                  style={{
                    width: "260px",
                  }}
                />
                <span
                  style={{
                    right: "39px",
                    bottom: "-40px",
                  }}
                ></span>
              </div> */}

              <BsArrowDown
                color="#94A3B8"
                size={40}
                className="arrow_button_sample_page"
                style={{
                  left: "auto",
                }}
              />
            </section>
          </div>

          {/*  hoc2 in event page ------------ */}
          <div
            className="hoc2_wrraper_event_page"
            ref={targetRef}
            id="eventDetails"
            style={{
              gap: "20px",
              padding: "20px 4%",
            }}
          >
            <section
              className="event_details_section_event_page"
              style={{
                flexDirection: "column",
                gap: "40px",
              }}
            >
              <div
                className="highlights_section_event_page"
                style={{
                  columnGap: "12px",
                  rowGap: "20px",
                  width: "100%",
                }}
              >
                <h3
                  className="text_type07_event_page"
                  style={{ gridArea: "head", fontSize: "20px" }}
                >
                  Event Highlights
                </h3>
                <div
                  className="highlight_card_design_event"
                  style={{ gridArea: "box1", gap: "8px", padding: "8px 12px" }}
                >
                  <IoImageOutline style={{ fontSize: "16px" }} />

                  <section>
                    <span
                      className="text_type03_event_page"
                      style={{ fontSize: "12px" }}
                    >
                      Mode
                    </span>
                    <span
                      className="text_type04_event_page"
                      style={{ fontSize: "14px" }}
                    >
                      {stype}
                    </span>
                  </section>
                </div>
                <div
                  className="highlight_card_design_event"
                  style={{ gridArea: "box2", gap: "8px", padding: "8px 12px" }}
                >
                  <MdEventSeat style={{ fontSize: "16px" }} />

                  <section>
                    <span
                      className="text_type03_event_page"
                      style={{ fontSize: "12px" }}
                    >
                      Seat available
                    </span>
                    <span
                      className="text_type04_event_page"
                      style={{ fontSize: "14px" }}
                    >
                      {eventSeatCapacity ?? "--"}
                    </span>
                  </section>
                </div>
                <div
                  className="highlight_card_design_event"
                  style={{ gridArea: "box3", gap: "8px", padding: "8px 12px" }}
                >
                  <CiCalendarDate style={{ fontSize: "16px" }} />

                  <section>
                    <span
                      className="text_type03_event_page"
                      style={{ fontSize: "12px" }}
                    >
                      Date
                    </span>
                    <span
                      className="text_type04_event_page"
                      style={{ fontSize: "14px" }}
                    >
                      {date ? getDate(date) : getDate(new Date())}
                    </span>
                  </section>
                </div>
                <div
                  className="highlight_card_design_event"
                  style={{ gridArea: "box4", gap: "8px", padding: "8px 12px" }}
                >
                  <GoClock style={{ fontSize: "16px" }} />

                  <section>
                    <span
                      className="text_type03_event_page"
                      style={{ fontSize: "12px" }}
                    >
                      Time
                    </span>
                    <span
                      className="text_type04_event_page"
                      style={{ fontSize: "14px" }}
                    >
                      {startTime ? convertTime(startTime) : "00:00 AM"} To{" "}
                      {endTime ? convertTime(endTime) : "00:00 AM"} (IST)
                    </span>
                  </section>
                </div>
                <div
                  className="highlight_card_design_event"
                  style={{ gridArea: "box5", gap: "8px", padding: "8px 12px" }}
                >
                  <IoLanguageOutline style={{ fontSize: "16px" }} />

                  <section>
                    <span
                      className="text_type03_event_page"
                      style={{ fontSize: "12px" }}
                    >
                      Language
                    </span>
                    <span
                      className="text_type04_event_page"
                      style={{ fontSize: "14px" }}
                    >
                      English, Hindi
                    </span>
                  </section>
                </div>

                {stype === "Offline" && (
                  <div
                    className="highlight_card_design_event"
                    style={{
                      gridArea: "box6",
                      gap: "8px",
                      padding: "8px 12px",
                    }}
                  >
                    <IoLocationOutline />

                    <section>
                      <span
                        className="text_type03_event_page"
                        style={{ fontSize: "12px" }}
                      >
                        Location
                      </span>
                      <span
                        className="text_type04_event_page"
                        style={{ fontSize: "14px",width:'200px',wordWrap:'break-word' }}
                      >
                        {meetlink}
                      </span>
                    </section>
                  </div>
                )}
              </div>

              <div
                className="reserve_event_page_section"
                style={{
                  gap: "20px",
                  width: "100%",
                }}
              >
                <h3
                  className="text_type05_event_page"
                  style={{ fontSize: "20px" }}
                >
                  Reserve your spot
                </h3>
                <span
                  className="text_type06_event_page"
                  style={{ fontSize: "20px" }}
                >
                  {paid === "Paid" ? (
                    <>
                      {" "}
                      ₹{ssp} <span style={{ fontSize: "14px" }}>{smrp}</span>
                    </>
                  ) : (
                    "For Free"
                  )}
                </span>
                <button
                  className="button_02_event_page"
                  style={{ fontSize: "12px", margin: "auto" }}
                >
                  Register for Event
                </button>
              </div>
            </section>
          </div>

          {/*  hoc in event page -----x------ */}
          <div
            className="hoc1_wrraper_event_page"
            style={{ padding: "20px 4%" }}
          >
            <section
              className="description_event_page_wrapper"
              id="aboutEventPageDemo"
            >
              <h3
                className="text_type07_event_page"
                style={{ fontSize: "20px" }}
              >
                Description
              </h3>

              <div
                className="description_event_page_content"
                ref={aboutEventPage}
                style={{
                  fontSize: "14px",
                  wordBreak:'break-word'
                }}
              ></div>
            </section>

            {/* video display section ---------------------------- */}
            {Object.values(videoArray).filter((e) => {
              return e;
            })?.length > 0 && wants?.video && (
              <section className="video_section_event_page_wrapper"  id="videoEventPageDemo">
                <h3 className="text_type07_event_page" style={{ fontSize: "20px" }}>{titles?.video}</h3>

                <div>
                  <Swiper
                    slidesPerView={"auto"}
                    centeredSlides={true}
                    spaceBetween={30}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                  >
                    {Object.values(videoArray)
                      .filter((e) => {
                        return e;
                      })
                      ?.map((video, index) => {
                        return (
                          <SwiperSlide>
                            <div className="video_box_event_page">
                              {video?.includes("youtube") &&
                                <iframe
                                  width={262}
                                  height={160}
                                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                                    video
                                  )}`}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>}
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>
              </section>
            )}
          </div>

          {/*  hoc1 in event page ------------ */}
          {((Object.values(imagesArray).filter((e) => {
            return e;
          })?.length > 0 && wants?.image) ||
            (testimonialArray?.length > 0 && wants?.testimonial))&& (
            <div
              className="hoc2_wrraper_event_page"
              style={{
                gap: "20px",
                padding: "20px 16px",
              }}
            >
              {Object.values(imagesArray).filter((e) => {
                return e;
              })?.length > 0 && wants?.image &&(
                <section className="images_section_event_page_wrapper" id="imageEventPageDemo">
                  <h3 className="text_type07_event_page" style={{ fontSize: "20px" }}>{titles?.image}</h3>

                  <div>
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={30}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination]}
                      className="mySwiper"
                    >
                      {Object.values(imagesArray)
                        .filter((e) => {
                          return e;
                        })
                        ?.map((image, index) => {
                          return (
                            <SwiperSlide key={`imageectra${index}`}>
                              <img
                                src={image ? URL.createObjectURL(image) : ""}
                                alt=""
                                style={{
                                  height: "160px",
                                  width: "261px",
                                }}
                              />
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                  </div>
                </section>
              )}

              {testimonialArray?.length !== 0 && wants?.testimonial && (
                <section className="testimonial_section_event_page_wrapper" id="testimonialEventPageDemo">
                  <h3 className="text_type07_event_page" style={{ fontSize: "20px" }}>{titles?.testimonial}</h3>

                  <div>
                    <Swiper
                       slidesPerView={1}
                      spaceBetween={30}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination]}
                      className="mySwiper"
                    >
                      {testimonialArray
                        ?.filter((e) => {return e?.type})
                        ?.map((data, i) => {
                          return (
                            <SwiperSlide>
                              {data?.type === "Image" ? (
                                <img
                                  src={data?.image instanceof Blob ? URL.createObjectURL(data?.image) : ""}
                                  alt=""
                                  style={{
                                    width:"100%",
                                    height:"160px"
                                  }}
                                />
                              ) : data?.type === "Text" ? (
                                <div className="testimonial_card_wrapper_event_page" style={{
                                  width:"100%",
                                  
                                }}>
                                  <BsQuote />
                                  <p>{data?.title}</p>
                                  <p>{data?.review}</p>

                                  <span>{data?.username}</span>

                                </div>
                              ) : data?.type === "Video" ? 
                                data?.videoLink?.includes("youtube") &&
                                  <iframe
                                    width={250}
                                    height={160}
                                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                                      data?.videoLink
                                    )}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                               : null}
                            </SwiperSlide>
                          );
                        })}
                      )
                    </Swiper>
                  </div>
                </section>
              )}
            </div>
          )}

          {/*  hoc2 in event page ------------ */}
          <div
            className="hoc1_wrraper_event_page"
            style={{
              gap: "20px",
              padding: "20px 4%",
            }}
          >
            <section
              className="speakers_event_page_wrapper"
              id="speakersEventPageDemo"
            >
              <h3
                className="text_type07_event_page"
                style={{ fontSize: "20px" }}
              >
                Event Speakers
              </h3>

              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {speakersArray?.map((speaker, index) => {
                  return (
                    <SpeakerCard
                      {...speaker}
                      profile={
                        speakersImagesArray[index]
                          ? URL.createObjectURL(speakersImagesArray[index])
                          : speaker?.isCreator
                          ? cprofile
                          : PNGIMG
                      }
                      optionalProfile={cprofile}
                      rating={speaker?.isCreator && crating}
                      key={index}
                      sno={index + 1}
                    />
                  );
                })}
              </div>
            </section>
          </div>

          <div
            className="hoc2_wrraper_event_page"
            style={{
              gap: "20px",
              padding: "20px 16px",
            }}
          >
            <section
              className="benefits_event_page_wrapper"
              style={{
                padding: "16px",
                width: "294px",
                marginBottom: "250px",
              }}
              id="benefitsEventPage"
            >
              <h3
                className="text_type07_event_page"
                style={{ fontSize: "20px" }}
              >
                Unlock Exciting Benefits!
              </h3>
              <span
                className="text_type08_event_page"
                style={{ fontSize: "14px" }}
              >
                Register & unlock your Unique Referral Code to avail AMAZING
                perks.
              </span>

              <p
                className="text_type09_event_page"
                style={{ fontSize: "16px" }}
              >
                Check out the perks:
              </p>

              <div
                className="benefits_div_event_page"
                style={{
                  fontSize: "12px",
                  marginBottom: "0",
                }}
                ref={benefitRef}
              ></div>

              <button
                className="button_02_event_page"
                style={{
                  fontSize: "12px",
                  margin: "auto",
                }}
              >
                Register to Participate
              </button>
            </section>
          </div>

          {/* desktop Floater ------------------ */}

          {isVisibleFloater && (
            <section
              className="desktop_floater_event_page"
              style={{
                bottom: "20px",
                padding: "20px 16px",
                width: "292px",
              }}
            >
              <span style={{ fontSize: "16px" }}>Register for Event</span>
              <div style={{ fontSize: "12px" }}>
                {paid === "Paid" ? (
                  <>
                    ₹{ssp} <span style={{ fontSize: "12px" }}>{smrp}</span>
                  </>
                ) : (
                  "For Free"
                )}
                <IoIosArrowRoundForward size={12} />
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateEventDemo;
