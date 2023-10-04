import React, { useContext, useEffect, useState } from "react";
import "./ServiceList.css";
import ServiceContext from "../../../../Context/services/serviceContext";
import { SuperSEO } from "react-super-seo";
import UserIcon from "./Icons/User.svg";
import ChartIcon from "./Icons/Chart-pie.svg";
import Option from "./Icons/Option.svg";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoadTwo } from "../../../Modals/Loading";
import ChangeStatusModal, {
  ChangeStatus,
} from "../../../Modals/ServiceSuccess/Modal2";
import { Button2 } from "../Create Services/InputComponents/buttons";
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
} from "react-icons/bs";
import {
  BiCoinStack,
  BiDotsVerticalRounded,
  BiRupee,
  BiStats,
} from "react-icons/bi";
import { TbSend } from "react-icons/tb";
import { HiDownload } from "react-icons/hi";
import { MdDateRange } from "react-icons/md";
import mixpanel from "mixpanel-browser";
import {
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import { IoCopyOutline } from "react-icons/io5";

const ContentCard = ({
  i,
  _id,
  simg,
  mobileSimg,
  sname,
  downloads,
  date,
  slug,
  isPaid,
  ssp,
  startDate,
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
}) => {
  const navigate = useNavigate();

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

  const handleCheckClick = async () => {
    setCurrSelected({ copyURL, status });
    removeOptionPopup(); // removes popup ------------------------------
    if (status) {
      // means now it is checked ------------
      setChangeStatus(0);
      const success = await deleteService(
        _id,
        0,
        selected === "events" ? "event" : "document"
      ); // changing status of the service / eevent
      if (success) {
        setOpenModel(true);
        status = false; // manually changing its value--------------
      } else {
        toast.error("Some error occured", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } else {
      // means now it is unchecked-----------------
      setChangeStatus(1);
      const success = await deleteService(
        _id,
        1,
        selected === "events" ? "event" : "document"
      );
      if (success) {
        setOpenModel(true);
        status = true; // manually changing its value--------------
      } else {
        toast.error("Some error occured", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    }
  };

  const getDateTime = () => {
    let dateStr = new Date(selected === "events" ? startDate : date);

    if (selected === "events") {
      let timeStr = time?.startTime?.split(":");
      dateStr.setHours(timeStr && timeStr[0]);
      dateStr.setMinutes(timeStr && timeStr[1]);
    }

    return dateStr.toLocaleString();
  };

  return (
    <div className="mycontent_card_for_service">
      <img
        src={mobileSimg ?? simg}
        alt=""
        onClick={() => {
          selected === "events"
            ? window.open(`/e/${slug}`)
            : window.open(`/s/${slug}`);
        }}
      />
      <section>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <h2
            onClick={() => {
              selected === "events"
                ? window.open(`/e/${slug}`)
                : window.open(`/s/${slug}`);
            }}
          >
            {sname}
          </h2>

          <div className="props_mycontent_card_service">
            <section>
              <p
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
                Sales :
                <span>{selected === "events" ? registrations : downloads}</span>
              </p>
              <p>
                Earnings : <span>{ssp * (downloads ?? registrations)}</span>
              </p>
              <p>
                Created On :<span>{getDateTime()}</span>
              </p>
            </section>

            <div className="buttons_div_section_mycontent_card">
              <button
                onClick={() => {
                  mixpanel.track("Tracking Link");
                  toast.info("Copied Link Successfully");
                  navigator.clipboard.writeText(copyURL);
                }}
              >
                Tracking Link <IoCopyOutline />
              </button>

              <button
                onClick={() => {
                  const pattern = /go\.anchors\.in/;
                  selected === "events"
                    ? setShareModalData({
                        open: true,
                        sname: sname,
                        slug: slug,
                        simg: simg,
                        isEvent: selected === "events",
                        eventCode: eventCode,
                        link: copyURL
                          ? pattern.test(copyURL)
                            ? copyURL
                            : selected === "events"
                            ? `https://www.anchors.in/e/${slug}`
                            : `https://www.anchors.in/s/${slug}`
                          : selected === "events"
                          ? `https://www.anchors.in/e/${slug}`
                          : `https://www.anchors.in/s/${slug}`,
                      })
                    : window.open(`/dashboard/shareTemplate/${slug}`);
                }}
              >
                Sharing Template <TbSend />
              </button>

              <button
                onClick={() => {
                  mixpanel.track("Analysis");
                  selected === "events"
                    ? !dummyData.EventDummy &&
                      window.open(
                        `/dashboard/serviceStats/${slug}?type=event`,
                        "_blank"
                      )
                    : !dummyData.ServiceDummy &&
                      window.open(`/dashboard/serviceStats/${slug}`, "_blank");
                }}
              >
                <BiStats /> Detailed Service Analysis
              </button>
            </div>
          </div>
        </div>

        <BiDotsVerticalRounded
          onClick={() =>
            selected === "events"
              ? !dummyData.EventDummy && openOptionsPopup(i + 1)
              : !dummyData.ServiceDummy && openOptionsPopup(i + 1)
          }
        />

        {/* content card_popup */}
        <div
          className="servicelist_optionspopup"
          id={`servicelist_options${i + 1}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="servicelist_wrap">
            <div className="servicelist_popuptop">
              {(selected !== "events" || new Date(startDate) > new Date()) && (
                <div
                  className="modaloptions_servicelist"
                  onClick={() => {
                    selected === "events"
                      ? navigate(`/dashboard/editevent/${slug}`)
                      : navigate(
                          `/dashboard/editservice/${slug}/${
                            stype === 2
                              ? "video"
                              : stype === 1
                              ? "excel"
                              : "pdf"
                          }`
                        );
                  }}
                >
                  Edit {selected === "events" ? "Event" : "Service"}
                </div>
              )}

              {selected !== "events" && (
                <div
                  className="modaloptions_servicelist"
                  onClick={() => {
                    navigate(
                      `/dashboard/createservice?type=${
                        stype === 2 ? "video" : stype === 1 ? "excel" : "pdf"
                      }&duplicate=${slug}`
                    );
                    mixpanel.track("Duplicate Service", {
                      service: slug,
                    });
                  }}
                >
                  Duplicate Service
                </div>
              )}
              {/* <div
                                  className="modaloptions_servicelist"
                                  onClick={() => {
                                    setCurrSelected(elem);
                                    setOpenModel2(true);
                                  }}
                                >
                                  Notify Users
                                </div> */}
              {selected !== "events" && (
                <div
                  className="modaloptions_servicelist"
                  onClick={() => {
                    selected === "events"
                      ? navigate(`/dashboard/servicereviews/${slug}?type=event`)
                      : navigate(`/dashboard/servicereviews/${slug}`);
                  }}
                >
                  User Reviews
                </div>
              )}
              {/* <div className="modaloptions_servicelist_status">
                Active Status
                <span onClick={() => handleCheckClick()}>
                  <label className="switch_type_01">
                    <input
                      id={`checkbox_${i + 1}`}
                      type="checkbox"
                      checked={status}
                    />
                    <span className="slider_type_01 round_type_01"></span>
                  </label>
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PopupModal = ({ slug, onClose, simg, sname, link }) => {
  let message = `Greetings! Delighted to announce my event on ${sname}. Join for an unforgettable experience you won't want to miss!`;

  const handleCopyToClipboard = () => {
    const copyURL =
      link.length > 7
        ? `https://www.anchors.in/s/${link}`
        : `https://www.anchors.in/s/${link}`;

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
            <div className="service_share_link_user_first_frame_text">
              Greetings! Delighted to announce my event on <b>{sname}</b>. Join
              for an unforgettable experience you won't want to miss!
            </div>
            <div className="service_share_link_user_first_frame_close">
              <i className="fa-solid fa-xmark fa-lg" onClick={onClose}></i>
            </div>
          </div>
          <div className="service_share_link_user_second_frame">
            {/* <div className="service_share_link_user_second_frame_link">
              https://www.anchors.in/s/{link}
              <img src={copy} alt="Copy" onClick={handleCopyToClipboard} />
            </div> */}
            <div className="service_share_link_user_second_frame_allshare">
              <LinkedinShareButton
                url={link}
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
              <WhatsappShareButton
                url={link}
                title={message}
                onClick={() => {
                  mixpanel.track("Event Shared On Whatsapp", {
                    event: slug,
                  });
                }}
              >
                <div className="service_share_link_user_second_frame_allshare_container">
                  {" "}
                  <BsWhatsapp color="white" size={20} />
                </div>
              </WhatsappShareButton>
              <TelegramShareButton
                url={link}
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
      <ToastContainer />
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
    <div className="user_dashboard_event_data_section_wrapper">
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
        <section className="upcoming_events_wrapper_user_dashboard_page">
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
                  <span
                    onClick={() => {
                      window.open(`https://www.anchors.in/e/${e?.slug}`);
                    }}
                  >
                    {e?.sname}
                  </span>

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
                      mixpanel.track("Event Side Upcoming View Event", {
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
  const [shareModalData, setShareModalData] = useState({
    open: false,
    sname: "",
    slug: "",
    link: "",
    simg: "",
  });
  const [dummyData, setdummyData] = useState({
    ServiceDummy: false,
    EventDummy: false,
  });

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
    let list = services?.res;
    if (selected === "pdf") {
      setrevArray(
        list?.filter((e) => {
          return e?.stype === 0;
        })
      );
    } else if (selected === "excel") {
      setrevArray(
        list?.filter((e) => {
          return e?.stype === 1;
        })
      );
    } else if (selected === "video") {
      setrevArray(
        list?.filter((e) => {
          return e?.stype === 2;
        })
      );
    } else if (selected === "events") {
      setrevArray(services?.events);
    } else {
      setrevArray(list);
    }
  }, [services, selected]);

  const [OpenOption, setOpenOption] = useState(0);

  const getDatelist = (date) => {
    let ll = date?.slice(0, date.toString().length - 5);
    const datenew = ll?.split("T");
    if (datenew) {
      return datenew[0];
    }
  };

  const getDatelist2 = (date) => {
    let ll = date?.slice(0, date.toString().length - 5);
    const datenew = ll?.split("T");
    if (datenew) {
      return datenew[1];
    }
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

  const navigate = useNavigate();
  const [openModel, setOpenModel] = useState(false); // change status modal -----------
  const [changeStatus, setChangeStatus] = useState(1); // current status of changed element --------------
  const [currselected, setCurrSelected] = useState(null); // selected options of a which service / event --------------

  const handleCheckClick = async (elem) => {
    setCurrSelected(elem);
    removeOptionPopup(); // removes popup ------------------------------
    props.progress(0);
    if (elem.status) {
      // means now it is checked ------------
      setChangeStatus(0);
      const success = await deleteService(
        elem._id,
        0,
        selected === "events" ? "event" : "document"
      ); // changing status of the service / eevent
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
      const success = await deleteService(
        elem._id,
        1,
        selected === "events" ? "event" : "document"
      );
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

  return (
    <>
      {openLoading && <LoadTwo open={openLoading} />}

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
        <h1 className="headers_section_paymentInfo">My Events</h1>
        <span className="servicelist_wrap_span">Manage all your Events</span>
        <div className="servicelist-categories"></div>

        <EventsSectionData
          liveData={latestEvents?.LiveEvents}
          upcomingData={latestEvents?.UpcomingEvents}
        />

        <section
          className="content_cards_main_wrapper_servicelist"
          onMouseEnter={() => {
            (selected === "events"
              ? dummyData?.EventDummy
              : dummyData?.ServiceDummy) && setIsHoveredTooltip(true);
          }}
          onMouseLeave={() => {
            (selected === "events"
              ? dummyData?.EventDummy
              : dummyData?.ServiceDummy) && setIsHoveredTooltip(false);
          }}
        >
          {revArray?.map((elem, i) => {
            return (
              <ContentCard
                {...elem}
                i={i}
                dummyData={dummyData}
                setShareModalData={setShareModalData}
                selected={selected}
                setOpenOption={setOpenOption}
                setCurrSelected={setCurrSelected}
                setChangeStatus={setChangeStatus}
                deleteService={deleteService}
                setOpenModel={setOpenModel}
                OpenOption={OpenOption}
                revArray={revArray}
              />
            );
          })}

          {(selected === "events"
            ? dummyData?.EventDummy
            : dummyData?.ServiceDummy) &&
            isHoveredTooltip && (
              <div className="opacity-layer-over-table">
                The current table contains sample data, and this is the way in
                which your data will be presented.
              </div>
            )}
        </section>

        <div className="servicelist-table">
          {(selected === "events"
            ? dummyData?.EventDummy
            : dummyData?.ServiceDummy) && (
            <div className="cta_dummy_data">
              {/* <span>
                The current table contains sample data, and this is the way in
                which your data will be presented.
              </span> */}
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

      <SuperSEO title="Anchors - Services" />
    </>
  );
}

export default ServiceDetailPage;
