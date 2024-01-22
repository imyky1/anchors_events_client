import React, { useContext, useEffect, useState } from "react";
import "./ServiceList.css";
import ServiceContext from "../../../../Context/services/serviceContext";
import { SuperSEO } from "react-super-seo";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoadTwo } from "../../../Modals/Loading";
import ChangeStatusModal, {
  ChangeStatus,
} from "../../../Modals/ServiceSuccess/Modal2";
import {
  Button2,
  Button4,
  Button5,
} from "../Create Services/InputComponents/buttons";
import { IoMdAdd } from "react-icons/io";
import { TbCertificate } from "react-icons/tb";
import { FaRegCopy } from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";
import { RiDraftFill } from "react-icons/ri";
import HelpModal from "../../../Modals/ModalType01/HelpModal";
// import { LuCalendarClock } from "react-icons/lu";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import {
  BsFillCalendar3WeekFill,
  BsPersonFill,
  BsLinkedin,
  BsTelegram,
  BsWhatsapp,
  BsArrowLeftShort,
} from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { IoRadioOutline } from "react-icons/io5";
import { GiBackwardTime } from "react-icons/gi";
import mixpanel from "mixpanel-browser";
import { LinkedinShareButton, TelegramShareButton } from "react-share";
import { IoCopy } from "react-icons/io5";
import { Certificate } from "../../../EventCertifcates/SelectCertificate";
import { DeleteModal } from "../../../Modals/Logout_Model";


const CertitficatePreview = ({ certificateData, eventData, onClose }) => {
  return (
    <div className="logout_model_logout">
      <section className="certificate_preview_system">
        <h1 className="text_type01_payment_info">Your Certificate</h1>

        <Certificate
          scale={0.8}
          origin="center"
          data={{ name: certificateData?.name, para: certificateData?.para }}
          background={certificateData?.certificate}
          signURL={certificateData?.sign}
          signStyle={certificateData?.signStyle}
          eventData={eventData}
        />

        <Button4 text="Close" onClick={onClose} />
      </section>
    </div>
  );
};

const ContentCard = ({
  i,
  _id,
  simg,
  mobileSimg,
  sname,
  downloads,
  date,
  createdOn,
  slug,
  isPaid,
  ssp,
  startDate,
  meetlink,
  time,
  selected,
  registrations,
  eventCode,
  copyURL,
  dummyData,
  setShareModalData,
  stype,
  status,
  setOpenOption,
  setCurrSelected,
  setChangeStatus,
  deleteService,
  setOpenModel,
  OpenOption,
  revArray,
  earning,
  setOpenDeleteModal,
  certificateData,
  setCertificatePreviewData,
  isLatestEvent,
  isLiveEvent
}) => {
  const navigate = useNavigate();
  // State to manage the visibility of the popup
  const [isJoiningLinkPopupVisible, setJoiningLinkPopupVisibility] =
    useState(false);
  const toggleJoiningLinkPopup = () => {
    setJoiningLinkPopupVisibility(!isJoiningLinkPopupVisible);
  };
  const openOptionsPopup = (i) => {
    document.getElementById(`servicelist_options${i}`).style.display = "flex";
    setOpenOption(i);
  };

  const removeOptionPopup = () => {
    if (OpenOption !== 0) {
      revArray.map((elem, i) => {
        return (document.getElementById(
          `servicelist_options${i + 1}`
        ).style.display = "none");
      });
      document.getElementById(
        `servicelist_options${OpenOption}`
      ).style.display = "none";
      setOpenOption(0);
    }
  };

  // const handleCheckClick = async () => {
  //   removeOptionPopup(); // removes popup ------------------------------
  //   if (status === 1) {
  //     // means now it is checked ------------
  //     setChangeStatus(0);
  //     const success = await deleteService(
  //       _id,
  //       0,
  //       selected === "events" ? "event" : "document"
  //     ); // changing status of the service / eevent
  //     if (success) {
  //       setOpenModel(true);
  //       setstatus(0); // manually changing its value--------------
  //     } else {
  //       toast.error("Some error occured", {
  //         position: "top-center",
  //         autoClose: 2000,
  //       });
  //     }
  //   } else {
  //     // means now it is unchecked-----------------
  //     setChangeStatus(1);
  //     const success = await deleteService(
  //       _id,
  //       1,
  //       selected === "events" ? "event" : "document"
  //     );
  //     if (success) {
  //       setOpenModel(true);
  //       setstatus(1); // manually changing its value--------------
  //     } else {
  //       toast.error("Some error occured", {
  //         position: "top-center",
  //         autoClose: 2000,
  //       });
  //     }
  //   }
  // };

  const getDateTime = () => {
    let dateStr = new Date(createdOn);
    return dateStr.toString().slice(0, 16);
  };
  const startd = new Date(startDate);
  startd.setHours(
        time?.startTime?.split(":")[0],
        time?.startTime?.split(":")[1]
      );
  const endd = new Date(startDate);
  endd.setHours(
        time?.endTime?.split(":")[0],
        time?.endTime?.split(":")[1]
      );

  const getEventStatusText = () => {
    const currentDate = new Date();
    if(isLiveEvent){
      return "Live"
    }else if (isLatestEvent) {
      return "Latest Event";
    } else if (status === 3) {
      return "Draft Event";
    } else if (currentDate < startd) {
      return "Upcoming Event";
    } else {
      return "Past Event";
    }
  };
  const getEventIcon = () => {
    const currentDate = new Date();
    if(isLiveEvent){
      return <IoRadioOutline />;
    }else if (isLatestEvent) {
      return <MdDateRange />;
    } else if (status === 3) {
      return <RiDraftFill />;
    } else if (currentDate < startd) {
      return <MdDateRange />;
    } else {
      return <GiBackwardTime />;
    }
  };
  const getBackground = () => {
    const currentDate = new Date();
    if(isLiveEvent){
      return "#FF0000"
    }else if (isLatestEvent) {
      return "#3460DC";
    } else if (status === 3) {
      return "#1E293B";
    } else if (currentDate < startd) {
      return "#047857";
    } else {
      return "#B45309";
    }
  };
  const formatEventDateTime = (inputDate) => {
    const dateOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    };

    const formattedDate = new Date(inputDate).toLocaleString(
      "en-IN",
      dateOptions
    );
    return formattedDate.replace(/,/g, "");
  };

  return (
    <>
      <HelpModal
        open={isJoiningLinkPopupVisible}
        toClose={() => toggleJoiningLinkPopup()}
        content={meetlink}
        type={stype}
      />

      <div className="mycontent_card_for_service">
        <div className="mycontnet_card_header_buttons">
          <div
            style={{ background: getBackground() }}
            className="mycontent_card_flags"
          >
            {getEventIcon()}
            {getEventStatusText()}
          </div>
          <div className="mycontent_card_right_buttons">
            {certificateData
              ? status === 1 && (
                  <Button5
                    onClick={() => {
                      mixpanel.track("Certificate Preview");
                      setCertificatePreviewData({
                        open: true,
                        certificateData,
                        eventData: {
                          sname: sname,
                          date: startDate,
                        },
                      });
                    }}
                    height={"33px"}
                    rightIcon={<TbCertificate />}
                    text={"Certificate Preview"}
                  ></Button5>
                )
              : status === 1 && (
                  <Button5
                    onClick={() => {
                      mixpanel.track("Customise Certificate");
                      navigate(`/dashboard/eventCertificates/${slug}`);
                    }}
                    height={"33px"}
                    rightIcon={<TbCertificate />}
                    text={"Customise Certificate"}
                  ></Button5>
                )}
            {status === 1 && (
              <Button5
                height={"33px"}
                text={copyURL?.slice(0, 18)}
                onClick={() => {
                  mixpanel.track("Tracking Link");
                  toast.info("Copied Link Successfully");
                  navigator.clipboard.writeText(copyURL);
                }}
                icon={<FaRegCopy />}
              ></Button5>
            )}
            <div
              className="mycontent_card_right_joining_buttons"
              style={{ display: isLatestEvent || isLiveEvent ? "flex" : "none" }}
            >
              <Button5
                height={"33px"}
                text={stype === 0 ? "Venue Address" : "Joining Link"}
                onClick={() => toggleJoiningLinkPopup()}
                rightIcon={<IoMdOpen />}
              ></Button5>
            </div>
          </div>
        </div>

        <div className="mycontent_card_content">
          <section className="mycontent_card_content_image">
            <img
              src={mobileSimg ?? simg}
              alt=""
              onClick={() => {
                status === 1
                  ? window.open(`https://www.anchors.in/e/${slug}`)
                  : window.open(
                      `/dashboard/createevent/?eventId=${_id}`,
                      "_blank"
                    );
              }}
            />
            <div
              style={{
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "14.52px",
                color: "#94A3B8",
                cursor: "pointer",
              }}
              onClick={() => {
                mixpanel.track("Analysis");
                !dummyData.EventDummy &&
                  window.open(
                    `/dashboard/serviceStats/${slug}?type=event`,
                    "_blank"
                  );
              }}
            >
              {status === 1 ? (
                <>
                  "Detailed Analysis" <IoMdOpen />
                </>
              ) : (
                ""
              )}
            </div>
          </section>
          <section className="mycontent_card_content_time">
            <div
              onClick={() => {
                status === 1
                  ? window.open(`https://www.anchors.in/e/${slug}`)
                  : window.open(
                      `/dashboard/createevent/?eventId=${_id}`,
                      "_blank"
                    );
              }}
              style={{
                color: "#94A3B8",
                textAlign: "left",
                width: "254px",
                cursor: "pointer",
              }}
            >
              {sname}
            </div>
            {status === 1 && (
              <div
                style={{
                  height: "24px",
                  width: "211px",
                  background: "#262A36",
                  borderRadius: "4px",
                  display: "flex",
                  gap: "8px",
                  color: "#E2E8F0",
                  fontSize: "12px",
                  padding: "4px 8px 4px 8px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MdDateRange />
                {
                  <>
                    {formatEventDateTime(new Date(startDate)).slice(0, 11)} |{" "}
                    {time?.startTime} : {time?.endTime}
                  </>
                }
              </div>
            )}
          </section>
          {status === 1 && (
            <>
              <section className="mycontent_card_content_Registration">
                <h3
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    mixpanel.track("Downloads");
                    selected === "events"
                      ? !dummyData.EventDummy &&
                        registrations !== 0 &&
                        window.open(
                          `/dashboard/viewUserDetails/${slug}?type=event`,
                          "_blank"
                        )
                      : !dummyData.ServiceDummy &&
                        downloads !== 0 &&
                        window.open(
                          `/dashboard/viewUserDetails/${slug}`,
                          "_blank"
                        );
                  }}
                >
                  Registration
                </h3>
                <h1>{registrations}</h1>
              </section>
              <section className="mycontent_card_content_Event Price">
                <h3>Event Price</h3>
                <h1>{ssp}</h1>
              </section>
              <section className="mycontent_card_content_Earning">
                <h3>Earning</h3>
                <h1>{earning}</h1>
              </section>
            </>
          )}
          <section className="mycontent_card_content_Created On">
            <h3>{status === 1 ? "Created On" : "Drafted On"}</h3>
            <h1>{getDateTime()}</h1>
          </section>
        </div>
        {status === 1 ? (
          <>
            <div className="mycontnet_card_footer_buttons">
              <Button5
                onClick={() => {
                  mixpanel.track("Opened Registerd users");
                  !dummyData.EventDummy &&
                    window.open(
                      `/dashboard/viewUserDetails/${slug}?type=event`,
                      "_blank"
                    );
                }}
                height={"33px"}
                text={"Registered Users"}
                icon={<IoMdOpen />}
              ></Button5>
              <Button5
                onClick={() => {
                  mixpanel.track("Opened Abandoned Cart");
                  !dummyData.EventDummy &&
                    window.open(
                      `/dashboard/viewUserDetails/${slug}?type=event&category=Abandoned_Cart`,
                      "_blank"
                    );
                }}
                height={"33px"}
                text={"Abandoned Cart Users"}
                icon={<IoMdOpen />}
              ></Button5>
              <Button5
                height={"33px"}
                onClick={() => {
                  mixpanel.track("Opened Email & WA Triggers");
                  !dummyData.EventDummy &&
                    window.open(
                      `/dashboard/viewUserDetails/${slug}?type=event&category=Activity_Email_WA`,
                      "_blank"
                    );
                }}
                text={"Email & WA Triggers"}
                icon={<IoMdOpen />}
              ></Button5>
              <Button5
                onClick={() => {
                  mixpanel.track("opended graphics template");
                  !dummyData.EventDummy &&
                    window.open(
                      `/dashboard/graphicstemplate/${slug}`,
                      "_blank"
                    );
                }}
                height={"33px"}
                text={"Marketing Graphics"}
                icon={<IoMdOpen />}
              ></Button5>
            </div>{" "}
          </>
        ) : (
          <>
            {" "}
            <div className="mycontnet_card_footer_buttons_2">
              <Button4
                onClick={() => {
                  mixpanel.track("Continue Editing");
                  !dummyData.EventDummy &&
                    window.open(
                      `/dashboard/createevent?draft=${_id}`,
                      "_blank"
                    );
                }}
                height={"33px"}
                text={"Continue Editing"}
                icon={<IoMdOpen />}
              ></Button4>
            </div>{" "}
          </>
        )}
      </div>
    </>
  );
};

const PopupModal = ({
  slug,
  onClose,
  simg,
  sname,
  link,
  isEvent,
  eventCode,
}) => {
  let message = isEvent
    ? `Greetings! Delighted to announce my event on ${sname}. Join for an unforgettable experience you won't want to miss!`
    : `Greetings! Here's my document on the topic ${sname}, I believe you'll find it highly informative and beneficial.`;

  const handleCopyToClipboard = () => {
    const copyURL = isEvent
      ? eventCode
        ? `https://open.anchors.in/${eventCode}`
        : link
      : link;

    navigator.clipboard
      .writeText(copyURL)
      .then(() => {
        toast.info("Copied link to clipboard", {
          position: "top-center",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.error("Failed to copy link to clipboard:", error);
      });
  };

  return (
    <div className="service_share_link_user_wrapper" onClick={onClose}>
      <div
        className="service_share_link_user_popup"
        onClick={(e) => {
          e?.stopPropagation();
        }}
      >
        <div className="service_share_link_user">
          <div className="service_share_link_user_first_frame">
            <img src={simg} alt="Image" />
            {isEvent ? (
              <div className="service_share_link_user_first_frame_text">
                Greetings! Delighted to announce my event on <b>{sname}</b>.
                Join for an unforgettable experience you won't want to miss!
              </div>
            ) : (
              <div className="service_share_link_user_first_frame_text">
                Greetings! Here's my document on the topic <b>{sname}</b>, I
                believe you'll find it highly informative and beneficial.
              </div>
            )}
            <div className="service_share_link_user_first_frame_close">
              <i className="fa-solid fa-xmark fa-lg" onClick={onClose}></i>
            </div>
          </div>
          <div className="service_share_link_user_second_frame">
            <div
              className="service_share_link_user_second_frame_link"
              onClick={handleCopyToClipboard}
            >
              {isEvent
                ? eventCode
                  ? `https://open.anchors.in/${eventCode}`
                  : link
                : link}
              <IoCopy color="white" />
            </div>
            <div className="service_share_link_user_second_frame_allshare">
              <LinkedinShareButton
                url={
                  isEvent
                    ? eventCode
                      ? `https://open.anchors.in/${eventCode}`
                      : link
                    : link
                }
                title={message}
                onClick={() => {
                  mixpanel.track("Event Shared On Linkedin", {
                    service: slug,
                  });
                }}
              >
                <div className="service_share_link_user_second_frame_allshare_container">
                  {" "}
                  <BsLinkedin color="white" size={20} />
                </div>
              </LinkedinShareButton>
              {/* <WhatsappShareButton
                url={isEvent ? (eventCode ? `https://open.anchors.in/${eventCode}` : link) : link}
                title={message}
                onClick={() => {
                  mixpanel.track("Event Shared On Whatsapp", {
                    event: slug,
                  });
                }}
              > */}
              <div
                className="service_share_link_user_second_frame_allshare_container"
                onClick={() => {
                  mixpanel.track("Event Shared On Whatsapp", { event: slug });
                  window.open(
                    `https://api.whatsapp.com/send?text=${message} at ${
                      isEvent
                        ? eventCode
                          ? `https://open.anchors.in/${eventCode}`
                          : link
                        : link
                    }`
                  );
                }}
              >
                {" "}
                <BsWhatsapp color="white" size={20} />
              </div>
              {/* </WhatsappShareButton> */}
              <TelegramShareButton
                url={
                  isEvent
                    ? eventCode
                      ? `https://open.anchors.in/${eventCode}`
                      : link
                    : link
                }
                title={message}
                onClick={() => {
                  mixpanel.track("Event Shared On Telegram", {
                    event: slug,
                  });
                }}
              >
                <div className="service_share_link_user_second_frame_allshare_container">
                  {" "}
                  <BsTelegram color="white" size={20} />
                </div>
              </TelegramShareButton>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer limit={1} />
    </div>
  );
};

const EventsSectionData = ({ liveData = [{}], upcomingData = [{}] }) => {
  const navigate = useNavigate();

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
    <>
      {(liveData?.length !== 0 || upcomingData?.length !== 0) && (
        <div
          className="user_dashboard_event_data_section_wrapper"
          style={{ marginTop: "20px", background: "unset", padding: "unset" }}
        >
          {liveData?.length !== 0 && (
            <section className="live_events_wrapper_user_dashboard_page">
              {liveData?.map((e, index) => {
                return (
                  <div>
                    <span>&bull; Live</span>

                    <section>
                      <img
                        src={
                          e?.simg ??
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/No_sign.svg/300px-No_sign.svg.png"
                        }
                        alt=""
                      />

                      <div>
                        <span
                          onClick={() => {
                            window.open(`https://www.anchors.in/e/${e?.slug}`);
                          }}
                        >
                          {e?.sname}
                        </span>
                        <button
                          onClick={() => {
                            window.open(e?.meetlink);
                            mixpanel.track("Event Join Now", {
                              slug: e?.slug,
                            });
                          }}
                        >
                          Join Now
                        </button>
                      </div>
                    </section>

                    <div></div>
                  </div>
                );
              })}
            </section>
          )}

          {upcomingData?.length !== 0 && (
            <section
              className="upcoming_events_wrapper_user_dashboard_page"
              style={{ width: "100%" }}
            >
              <div>
                <span>
                  <BsFillCalendar3WeekFill />
                  Upcoming Events
                </span>
              </div>

              <section>
                {upcomingData?.map((e, index) => {
                  return (
                    <div
                      className="upcoming_event_cards_user_dashboard_event_page"
                      key={index}
                    >
                      <img
                        src={
                          e?.simg ??
                          "https://www.pngitem.com/pimgs/m/123-1236078_straight-line-transparent-straight-white-line-no-background.png"
                        }
                        alt=""
                      />
                      <span>{e?.sname}</span>

                      <div>
                        <span>
                          <BsPersonFill />
                          {`${e?.registrations} Registrations`}
                        </span>
                        <span>
                          <AiOutlineCalendar />
                          {getDate(e?.startDate)}
                        </span>
                        <span>
                          <AiOutlineClockCircle />
                          {`${convertTime(e?.time?.startTime)} - ${convertTime(
                            e?.time?.endTime
                          )}`}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          window.open(`https://www.anchors.in/e/${e?.slug}`);
                          mixpanel.track("Upcoming View Event", {
                            slug: e?.slug,
                          });
                        }}
                      >
                        View Event
                      </button>
                    </div>
                  );
                })}
              </section>
            </section>
          )}
        </div>
      )}
    </>
  );
};

function ServiceDetailPage(props) {
  const [openLoading, setOpenLoading] = useState(false);
  const {
    services,
    getallservices,
    deleteService,
    getalleventsLiveandUpcoming,
    latestEvents,
  } = useContext(ServiceContext);

  const [revArray, setrevArray] = useState([]);
  const [selected, setSelected] = useState("events");
  const [isHoveredTooltip, setIsHoveredTooltip] = useState(false);
  const [ServicesEarningData, setServicesEarningData] = useState({});
  const [shareModalData, setShareModalData] = useState({
    open: false,
    sname: "",
    slug: "",
    link: "",
    simg: "",
  });

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [certificatePreviewData, setCertificatePreviewData] = useState({
    open: false,
  });
  const [dummyData, setdummyData] = useState({
    ServiceDummy: false,
    EventDummy: false,
  });

  const navigate = useNavigate();
  const [openModel, setOpenModel] = useState(false);
  const [changeStatus, setChangeStatus] = useState(1);
  const [currselected, setCurrSelected] = useState(null);
  const [PastEvents, SetPastEvents] = useState(null);
  const [DraftEvents, setDraftEvents] = useState(null);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    setOpenLoading(true);

    getalleventsLiveandUpcoming().then(() => {});

    getallservices().then(() => {
      setOpenLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  // no need of reversing the array of serices it is inverted from backend
  useEffect(() => {
    setdummyData({
      ServiceDummy: services?.Servicedummy,
      EventDummy: services?.Eventdummy,
    });
    setServicesEarningData({ ...services?.ServicesEarning });

    let list = services?.res;
    setrevArray(services?.events);
  }, [services]);

  const [OpenOption, setOpenOption] = useState(0);

  const removeOptionPopup = () => {
    if (OpenOption !== 0) {
      revArray.map((elem, i) => {
        return (document.getElementById(
          `servicelist_options${i + 1}`
        ).style.display = "none");
      });
      document.getElementById(
        `servicelist_options${OpenOption}`
      ).style.display = "none";
      setOpenOption(0);
    }
  };

  const earliestEvent = latestEvents?.UpcomingEvents?.reduce(
    (earliest, current) => {
      const earliestStartDate = new Date(earliest.startDate);
      earliestStartDate.setHours(
       earliest?.time?.startTime?.split(":")[0],
        earliest?.time?.startTime?.split(":")[1]
      );
      const currentStartDate = new Date(current.startDate);
      currentStartDate.setHours(
        current?.time?.startTime?.split(":")[0],
         current?.time?.startTime?.split(":")[1]
       ); 
      return currentStartDate < earliestStartDate ? current : earliest;
    },
    latestEvents?.UpcomingEvents[0]
  );
  

 
  useEffect(() => {
    const past = revArray?.filter((item) => {
      const d = new Date(item?.startDate);
      d.setHours(
        item?.time?.startTime?.split(":")[0],
        item?.time?.startTime?.split(":")[1]
      );
      return item?.status ===1 && item?._id !== latestEvents?.LiveEvents?.[0]?._id  && d < new Date();
    });
    SetPastEvents(past);
    const draft = revArray?.filter((item) => item?.status === 3);
    setDraftEvents(draft);
  }, [revArray]);

  const handleCategory = (category) => {
    setCategory(category);
  };

  const handleCheckClick = async (elem) => {
    setCurrSelected(elem);
    removeOptionPopup(); // removes popup ------------------------------
    props.progress(0);
    if (elem?.status) {
      // means now it is checked ------------
      setChangeStatus(0);
      const success = await deleteService(elem?._id, 0, "event"); // changing status of the service / eevent
      if (success) {
        setOpenModel(true);
        props.progress(100);
        elem.status = false; // manually changing its value--------------
      } else {
        toast.error("Some error occured", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } else {
      // means now it is unchecked-----------------
      setChangeStatus(1);
      const success = await deleteService(elem?._id, 1, "event");
      if (success) {
        setOpenModel(true);
        props.progress(100);
        elem.status = true; // manually changing its value--------------
      } else {
        toast.error("Some error occured", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    }
  };

  const getRenderArray = () => {
    switch (category) {
      case "All":
        return services?.events?.sort(function (a, b) {
          return new Date(b?.startDate) - new Date(a?.startDate);
        });
      case "Upcoming":
        return latestEvents?.UpcomingEvents?.sort(function (a, b) {
          return new Date(a?.startDate) - new Date(b?.startDate);
        });
      case "Past":
        return PastEvents;
      case "Draft":
        // Logic to filter and return draft events/services
        return DraftEvents;
      default:
        return revArray;
    }
  };

  const renderArray = getRenderArray();
  // console.log(PastEvents);
  // console.log(DraftEvents);
  // console.log(latestEvents?.LiveEvents)
  // console.log(earliestEvent)
  return (
    <>
      {openDeleteModal && (
        <DeleteModal
          onClose={() => {
            setOpenDeleteModal(false);
          }}
          data={currselected}
        />
      )}

      {openLoading && <LoadTwo open={openLoading} />}

      {certificatePreviewData?.open && (
        <CertitficatePreview
          {...certificatePreviewData}
          onClose={() => {
            setCertificatePreviewData({
              ...certificatePreviewData,
              open: false,
            });
          }}
        />
      )}

      {/* Change Status Modal ----------------------------------------- */}

      {shareModalData?.open && (
        <PopupModal
          {...shareModalData}
          onClose={() => {
            setShareModalData({ ...shareModalData, open: false });
          }}
        />
      )}

      {openModel && (
        <ChangeStatus
          toClose={() => {
            setOpenModel(false);
          }}
          url={currselected?.copyURL}
          ChangeStatusTo={changeStatus}
        />
      )}

      <div className="servicelist-wrapper" onClick={() => removeOptionPopup()}>
        {/* MObile ui navbar ---------------- */}
        {window.screen.width < 600 && (
          <section className="navbar_ui_covering_section_mobile_active">
            <BsArrowLeftShort
              size={22}
              onClick={() => {
                navigate(-1);
              }}
            />
            My Events
          </section>
        )}

        {window.screen.width > 600 && (
          <>
            <div className="servicelist-headers_section">
              <h1 className="headers_section_paymentInfo">My Events</h1>
              <span className="servicelist_wrap_create_button">
                <Button5
                  onClick={() => {
                    navigate("/dashboard/createevent");
                  }}
                  height={"44px"}
                  text={"Create New Event"}
                  rightIcon={<IoMdAdd />}
                >
                  <IoMdAdd />
                </Button5>
              </span>
              <div className="servicelist-categories"></div>
            </div>
          </>
        )}
        <section className="content_cards_selection_button">
          <button
            className={category === "All" ? "Selected" : ""}
            onClick={() => {
              handleCategory("All");
            }}
          >{`ALL(${
            services?.events?.[0] !== null ? services?.events?.length : 0
          })`}</button>
          <button
            className={category === "Upcoming" ? "Selected" : ""}
            onClick={() => {
              handleCategory("Upcoming");
            }}
          >{`Upcoming(${latestEvents?.UpcomingEvents?.length})`}</button>
          <button
            className={category === "Past" ? "Selected" : ""}
            onClick={() => {
              handleCategory("Past");
            }}
          >{`Past(${PastEvents?.length})`}</button>
          <button
            className={category === "Draft" ? "Selected" : ""}
            onClick={() => {
              handleCategory("Draft");
            }}
          >{`Draft(${DraftEvents?.length})`}</button>
        </section>
        <div className="content_cards_breaker"></div>
        <section
          className="content_cards_main_wrapper_servicelist"
          onMouseEnter={() => {
            dummyData?.EventDummy && setIsHoveredTooltip(true);
          }}
          onMouseLeave={() => {
            dummyData?.EventDummy && setIsHoveredTooltip(false);
          }}
        >
          {renderArray !== PastEvents &&
            renderArray !== DraftEvents && latestEvents?.LiveEvents?.map((elem,i)=>{
                return <ContentCard 
                {...elem} 
                 i={i}
                 dummyData={dummyData}
                 // setShareModalData={setShareModalData}
                 setOpenOption={setOpenOption}
                 setCurrSelected={setCurrSelected}
                 setChangeStatus={setChangeStatus}
                 deleteService={deleteService}
                 setOpenModel={setOpenModel}
                 OpenOption={OpenOption}
                 revArray={revArray}
                 earning={ServicesEarningData[elem?._id] ?? 0}
                 setOpenDeleteModal={setOpenDeleteModal}
                 setCertificatePreviewData={setCertificatePreviewData}
                 isLatestEvent={false}
                 isLiveEvent={true}
               />
              })     
          }
          {renderArray !== PastEvents &&
            renderArray !== DraftEvents &&
            earliestEvent && (
              <ContentCard
                {...earliestEvent}
                i={-1}
                dummyData={dummyData}
                // setShareModalData={setShareModalData}
                setOpenOption={setOpenOption}
                setCurrSelected={setCurrSelected}
                setChangeStatus={setChangeStatus}
                deleteService={deleteService}
                setOpenModel={setOpenModel}
                OpenOption={OpenOption}
                revArray={revArray}
                earning={ServicesEarningData[earliestEvent?._id] ?? 0}
                setOpenDeleteModal={setOpenDeleteModal}
                setCertificatePreviewData={setCertificatePreviewData}
                isLatestEvent={true}
                isLiveEvent={false}
              />
            )}
          {renderArray?.map((elem, i) => {
            return (
              (earliestEvent?._id !== elem?._id) && (elem?._id !== latestEvents?.LiveEvents?.[0]?._id) && (
                <ContentCard
                  {...elem}
                  i={i}
                  dummyData={dummyData}
                  // setShareModalData={setShareModalData}
                  setOpenOption={setOpenOption}
                  setCurrSelected={setCurrSelected}
                  setChangeStatus={setChangeStatus}
                  deleteService={deleteService}
                  setOpenModel={setOpenModel}
                  OpenOption={OpenOption}
                  revArray={revArray}
                  earning={ServicesEarningData[elem?._id] ?? 0}
                  setOpenDeleteModal={setOpenDeleteModal}
                  setCertificatePreviewData={setCertificatePreviewData}
                  isLatestEvent={false}
                  isLiveEvent={false}
                />
              )
            );
          })}

          {dummyData?.EventDummy && isHoveredTooltip && (
            <div className="opacity-layer-over-table">
              The current table contains sample data, and this is the way in
              which your data will be presented.
            </div>
          )}
        </section>

        <div className="servicelist-table">
          {dummyData?.EventDummy && (
            <div className="cta_dummy_data">
              <Button2
                text={
                  selected === "events"
                    ? "Create your First Event"
                    : "Create your First Service"
                }
                icon={<AiOutlinePlus size={18} width={30} />}
                onClick={() => {
                  navigate("/dashboard");
                }}
              />
            </div>
          )}
        </div>
      </div>
      <ToastContainer />

      <SuperSEO title="Anchors - Events" />
    </>
  );
}

export default ServiceDetailPage;
