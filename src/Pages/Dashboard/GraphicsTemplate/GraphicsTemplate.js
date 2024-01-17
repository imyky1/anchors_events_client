import React, { useState, useRef,useEffect,useContext } from "react";
import * as htmlToImage from "html-to-image";
import { useParams,useNavigate } from 'react-router-dom';
import download from "downloadjs";
import "./GraphicsTemplate.css";
import Loader from "../../../Developers/Poster Generator/components/Loader";
import { FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { host } from "../../../config/config";
import { IoReload } from "react-icons/io5";
import Image1 from "../../../Developers/Poster Generator/components/Image1";
import Image2 from "../../../Developers/Poster Generator/components/Image2";
import Image3 from "../../../Developers/Poster Generator/components/Image3";
import Image4 from "../../../Developers/Poster Generator/components/Image4";
import Image5 from "../../../Developers/Poster Generator/components/Image5";
import ServiceContext from "../../../Context/services/serviceContext";
import mixpanel from "mixpanel-browser";

const GraphicsTemplate = (props) => {
  const [eventName, setEventName] = useState("LinkedIn Profile Optimization & Content Strategy");
  const WAref = useRef(null);
  const IgRef = useRef(null);
  const Linkedin = useRef(null);
  const WAmssg = useRef(null);
  const Igmssg = useRef(null);
  const [eventType, setEventType] = useState("WEBINAR");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [speakerName, setSpeakerName] = useState(null);
  const [speakerRole, setSpeakerRole] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null); 
  const [color1, setColor1] = useState(null); 
  const [color2, setColor2] = useState(null); 
  const [TextColor, setTextColor] = useState("#FFFFFF"); 
  const [TextColor1, setTextColor1] = useState("#FFFFFF"); 
  const [TextColor2, setTextColor2] = useState("#FFFFFF"); 
  const [selectedButton, setSelectedButton] = useState("WhatsApp");
  const [Loading,SetLoading] = useState(false)
  const [selectedDownloadButton, setSelectedDownloadButton] = useState(null);

  const { slug } = useParams(); 
  const navigate = useNavigate();

  const { geteventinfo, compareJWT, eventInfo } = useContext(ServiceContext);

  console.log(eventInfo)

  useEffect(() => {
    mixpanel.track("Page Visit");
    props.progress(0);
    geteventinfo(slug).then((e) => {
      compareJWT(e[0]?._id).then((result) => {
        if (result) {
          console.log(result)
          props.progress(100);
        } else {
          navigate("/dashboard/mycontents");
        }
      });
    });
  }, []);
  
  useEffect(()=>{
    setEventName(eventInfo.event?.sname)
    setStartTime(eventInfo.event?.time?.startTime)
    setEndTime(eventInfo.event?.time?.endTime)
    setSpeakerName(eventInfo.event?.speakerDetails[0]?.name)
    setSpeakerRole(eventInfo.event?.speakerDetails[0]?.designation)
    console.log(eventInfo.event?.startDate)
    if(eventInfo.event?.startDate){
      const date = new Date(eventInfo?.event?.startDate)
      console.log(date)
      setSelectedDate(date)
    }
    const dataURI = eventInfo?.event?.speakerDetails[0]?.profile ? `${host}/api/file/proxyImage?imageUrl=${eventInfo?.event?.speakerDetails[0]?.profile}` : ""
    setSelectedFile(dataURI)
  },[eventInfo])

  const handleColorChange = (color) => {
    setSelectedColor(color);
    // Check color brightness
    const brightness = calculateBrightness(color);
    // Set text color based on brightness
    const textColor = brightness < 128 ? "#FFFFFF" : "#212121";
    setTextColor(textColor);
  };

  const handleColorChange1 = (color) => {
    setColor1(color);
    // Check color brightness
    const brightness = calculateBrightness(color);
    // Set text color based on brightness
    const textColor1 = brightness < 128 ? "#FFFFFF" : "#212121";
    setTextColor1(textColor1);
  };
  const handleSelectedButton = (value) => {
    setSelectedButton(value);
  };
  const getMonthName = (date) => {
    // const date = new Date(date);
    return new Intl.DateTimeFormat("en-US", { month: "short" })
      .format(date)
      .toUpperCase();
  };

  const getDayName = (date) => {
    // const date = new Date(date);
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  };

  const calculateBrightness = (hexColor) => {
    const color = hexColor.substring(1); // Remove #
    const r = parseInt(color.substring(0, 2), 16); // Red value
    const g = parseInt(color.substring(2, 4), 16); // Green value
    const b = parseInt(color.substring(4, 6), 16); // Blue value
    // Calculate brightness using a standard formula
    return (r * 299 + g * 587 + b * 114) / 1000;
  };
  const handleDownload = async (reference,platform) => {
    setSelectedDownloadButton(platform); // Set the selected download button
    SetLoading(true)
    const dataURL = await htmlToImage.toJpeg(reference.current);
    download(dataURL, `${platform}_poster.jpeg`, "image/png");
    SetLoading(false)
    setSelectedDownloadButton(null); // Reset the selected download button
  };
  const handleReload = (e) => {
    e.preventDefault();
    setSelectedColor("linear-gradient(180deg, #373737 0%, #0E001C 100%)")
    setTextColor("#FFFFFF")
    setTextColor1("#FFFFFF")
    setTextColor2("#FFFFFF")
    setColor1("#FF5C5C")
    setColor2("#121212")
  };
  const WA_poster = (
    <div className="WAposter-container">
      <h1>WhatsApp Story</h1>
      <div
        className="Whatsapp_poster"
        ref={WAref}
        style={{
          background:
            selectedColor || "linear-gradient(180deg, #373737 0%, #0E001C 100%",
        }}
      >
        <div className="imgComponentContainer">
          <Image1 textcolor={TextColor} />
          <Image2 textcolor={TextColor} />
          {/* <img className="imgComponent2" src="/Group 177.png" alt="" /> */}
          <Image3 textcolor={TextColor} />
          {/* <img className="imgComponent3" src="/Group 147.png" alt="" /> */}
        </div>
        <div style={{ marginRight: "80px" }}>
          <Image4 textcolor={TextColor} />
          {/* <img className="imgComponent4" src="/Group 152.png" alt="" /> */}
        </div>
        <h2 style={{ color: TextColor }} className="event_type">
          {eventType}
        </h2>
        <h1 style={{ color: TextColor }}>{eventName}</h1>
        <div className="date_time">
          <div className="date_container">
            <div
              style={{ background: color1 || "#ff5c5c", color: TextColor1 }}
              id="Month"
            >
              {getMonthName(selectedDate)}
            </div>
            <div
              style={{ background: color2 || "#121212", color: TextColor2 }}
              id="date"
            >
              {selectedDate?.getDate()}
            </div>
          </div>
          <div className="time_container">
            <div style={{ color: TextColor }} className="day">
              {getDayName(selectedDate)}
            </div>
            <div style={{ color: TextColor }} className="time">
              {startTime} to {endTime}
            </div>
          </div>
        </div>
        <div style={{ background: color1 || "#ff5c5c" }} className="few_seats">
          <Image5 textcolor={TextColor1} />
          {/* <img style={{color:textColor}} className="imgComponent5" src="/mdi_hot.png" alt="" /> */}

          <div
            style={{
              width: "336px",
              marginTop: "2.93px",
              opacity: "0.95",
              textAlign: "center",
              marginLeft: "40px",
              color: TextColor1,
            }}
          >
            ONLY FEW SEATS AVAILABLE
          </div>
        </div>
        <div className="speaker_container">
          <div className="image_container">
            <img
              src={selectedFile}
              alt=""
            />
          </div>

          <div className="H6" style={{ color: TextColor }}>
            SPEAKER
          </div>
          <h3 style={{ color: TextColor }}>{speakerName}</h3>
          <h4 style={{ color: TextColor }}>{speakerRole}</h4>
        </div>
      </div>
      <button
        onClick={() => {
          handleDownload(WAref,"WhatsApp");
        }}
      >
        Download
        {selectedDownloadButton === "WhatsApp" ? <Loader /> : ""}
      </button>
    </div>
  );
  const IG_poster = (
    <div className="IG_poster-container">
      <h1>Instagram Story</h1>
    <div
      className="Instagram_poster"
      ref={IgRef}
      style={{
        background:
          selectedColor || "linear-gradient(180deg, #373737 0%, #0E001C 100%)",
      }}
    >
      <div className="imgComponentContainer">
        {/* <img className="imgComponent1" src="/Group 151.png" alt="" /> */}
        <Image1 textcolor={TextColor} />
        {/* <img className="imgComponent2" src="/Group 177.png" alt="" /> */}
        <Image2 textcolor={TextColor} />
        {/* <img className="imgComponent3" src="/Group 147.png" alt="" /> */}
        <Image3 textcolor={TextColor} />
      </div>
      <div style={{ marginRight: "80px" }}>
        {/* <img className="imgComponent4" src="/Group 152.png" alt="" /> */}
        <Image4 textcolor={TextColor} />
      </div>
      <h2 style={{ color: TextColor }} className="event_type">
        {eventType}
      </h2>
      <h1 style={{ color: TextColor }}>{eventName}</h1>
      <div className="date_time">
        <div className="date_container">
          <div
            style={{ background: color1 || "#ff5c5c", color: TextColor1 }}
            id="Month"
          >
            {getMonthName(selectedDate)}
          </div>
          <div
            style={{ background: color2 || "#121212", color: TextColor2 }}
            id="date"
          >
            {selectedDate?.getDate()}
          </div>
        </div>
        <div className="time_container">
          <div style={{ color: TextColor }} className="day">
            {getDayName(selectedDate)}
          </div>
          <div style={{ color: TextColor }} className="time">
            {startTime} to {endTime}
          </div>
        </div>
      </div>
      <div style={{ background: color1 || "#ff5c5c" }} className="few_seats">
        <Image5 textcolor={TextColor1} />
        {/* <img className="imgComponent5" src="/mdi_hot.png" alt="" /> */}

        <div style={{ marginLeft: "50px", opacity: "0.95", color: TextColor1 }}>
          ONLY FEW SEATS AVAILABLE
        </div>
      </div>
      <div className="speaker_container">
        <div className="image_container">
          <img src={selectedFile} alt="" />
        </div>

        <h6 style={{ color: TextColor }}>SPEAKER</h6>
        <h3 style={{ color: TextColor }}>{speakerName}</h3>
        <h4 style={{ color: TextColor }}> {speakerRole}</h4>
      </div>
      
    </div>
    <button
        onClick={() => {
          handleDownload(IgRef,"Instagram");
        }}
      >
        Download
        {selectedDownloadButton === "Instagram" ? <Loader /> : ""}
      </button>
    </div>
  );
  const WA_message_poster = (
    <div className="WA_message_poster-container">
      <h1>WhatsApp</h1>
    <div
      className="Whastsapp_mssg_poster"
      ref={WAmssg}
      style={{
        background:
          selectedColor || "linear-gradient(180deg, #373737 0%, #0E001C 100%)",
      }}
    >
      <div className="imgComponentContainer">
        {/* <img className="imgComponent1" src="/Group 151.png" alt="" /> */}
        <Image1 textcolor={TextColor} />
        {/* <img className="imgComponent2" src="/Group 177.png" alt="" /> */}
        <Image2 textcolor={TextColor} />
        {/* <img className="imgComponent3" src="/Group 151.png" alt="" /> */}
        <div className="imgComponent3">
          <Image1 textcolor={TextColor} />
        </div>
      </div>
      <div style={{ marginRight: "80px" }}>
        {/* <img className="imgComponent4" src="/Group 152.png" alt="" /> */}
        <Image4 textcolor={TextColor} />
      </div>
      <h2 style={{ color: TextColor }} className="event_type">
        {eventType}
      </h2>
      <h1 style={{ color: TextColor }}>{eventName}</h1>
      <div style={{ background: color1 || "#ff5c5c" }} className="few_seats">
        {/* <img className="imgComponent5" src="/mdi_hot.png" alt="" /> */}
        <Image5 textcolor={TextColor1} />

        <div
          style={{ marginTop: "2px", marginLeft: "30px", color: TextColor1 }}
        >
          ONLY FEW SEATS AVAILABLE
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="date_time">
          <div className="date_container">
            <div
              style={{ background: color1 || "#ff5c5c", color: TextColor1 }}
              id="Month"
            >
              {getMonthName(selectedDate)}
            </div>
            <div
              style={{ background: color2 || "#121212", color: TextColor2 }}
              id="date"
            >
              {selectedDate?.getDate()}
            </div>
          </div>
          <div className="time_container">
            <div style={{ color: TextColor }} className="day">
              {getDayName(selectedDate)}
            </div>
            <div style={{ color: TextColor }} className="time">
              {startTime} to {endTime}
            </div>
          </div>
        </div>

        <div className="speaker_container">
          <div className="image_container">
            <img
              src={selectedFile}
              alt=""
            />
          </div>

          <h6 style={{ color: TextColor }}>SPEAKER</h6>
          <h3 style={{ color: TextColor }}>{speakerName}</h3>
          <h4 style={{ color: TextColor }}>{speakerRole}</h4>
        </div>
      </div>
    </div>
    <button
        onClick={() => {
          handleDownload(WAmssg,"WhatsApp_Messsage");
        }}
      >
        Download
        {selectedDownloadButton === "WhatsApp_Messsage" ? <Loader /> : ""}
      </button>
    </div>
  );
  const Linkedin_poster = (
    <div className="Linkedin_poster_container">
      <h1>LinkedIn</h1>
    <div
      className="Linkedin"
      ref={Linkedin}
      style={{
        background:
          selectedColor || "linear-gradient(180deg, #373737 0%, #0E001C 100%)",
      }}
    >
      <div className="imgComponentContainer">
        {/* <img className="imgComponent1" src="/Group 151.png" alt="" /> */}
        <Image1 textcolor={TextColor} />
        {/* <img className="imgComponent2" src="/Group 177.png" alt="" /> */}
        <Image2 textcolor={TextColor} />
        {/* <img className="imgComponent3" src="/Group 151.png" alt="" /> */}
        <div className="imgComponent3">
          <Image1 textcolor={TextColor} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ marginRight: "80px" }}>
            {/* <img className="imgComponent4" src="/Group 152.png" alt="" /> */}
            <Image4 textcolor={TextColor} />
          </div>
          <h2 style={{ color: TextColor }} className="event_type">
            {eventType}
          </h2>
          <h1 style={{ color: TextColor }}>{eventName}</h1>
          <div
            style={{ background: color1 || "#ff5c5c" }}
            className="few_seats"
          >
            {/* <img className="imgComponent5" src="/mdi_hot.png" alt="" /> */}
            <Image5 textcolor={TextColor1} />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "50px",
                marginTop: "1px",
                color: TextColor1,
              }}
            >
              ONLY FEW SEATS AVAILABLE
            </div>
          </div>
        </div>
        <div style={{ display: "block", marginRight: "70px" }}>
          <div className="date_time">
            <div className="time_container">
              <div style={{ color: TextColor }} className="day">
                {getDayName(selectedDate)}
              </div>
              <div style={{ color: TextColor }} className="time">
                {startTime} to {endTime}
              </div>
            </div>
            <div className="date_container">
              <div
                style={{
                  background: color1 || "#ff5c5c",
                  color: TextColor1,
                }}
                id="Month"
              >
                {getMonthName(selectedDate)}
              </div>
              <div
                style={{
                  background: color2 || "#121212",
                  color: TextColor2,
                }}
                id="date"
              >
                {selectedDate?.getDate()}
              </div>
            </div>
          </div>

          <div className="speaker_container">
            <div className="image_container">
              <img
                src={selectedFile}
                alt=""
              />
            </div>

            <h6 style={{ color: TextColor }}>SPEAKER</h6>
            <h3 style={{ color: TextColor }}>{speakerName}</h3>
            <h4 style={{ color: TextColor }}>{speakerRole}</h4>
          </div>
        </div>
      </div>
      
    </div>
    <button
        onClick={() => {
          handleDownload(Linkedin,"Linkedin");
        }}
      >
        Download
        {selectedDownloadButton === "Linkedin" ? <Loader /> : ""}
      </button>
    </div>
  );
  const Ig_message = (
    <div className="Ig_message_poster-container">
      <h1>Instagram Post</h1>
    <div
      className="Instagram_message_poster"
      ref={Igmssg}
      style={{
        background:
          selectedColor || "linear-gradient(180deg, #373737 0%, #0E001C 100%)",
      }}
    >
      <div className="imgComponentContainer">
        {/* <img className="imgComponent1" src="/Group 151.png" alt="" /> */}
        <Image1 textcolor={TextColor} />
        {/* <img className="imgComponent2" src="/Group 177.png" alt="" /> */}
        <Image2 textcolor={TextColor} />
        {/* <img className="imgComponent3" src="/Group 151.png" alt="" /> */}
        <div className="imgComponent3">
          <Image2 textcolor={TextColor} />
        </div>
      </div>
      <div style={{ marginRight: "80px" }}>
        {/* <img className="imgComponent4" src="/Group 152.png" alt="" /> */}
        <Image4 textcolor={TextColor} />
      </div>
      <h2 style={{ color: TextColor }} className="event_type">
        {eventType}
      </h2>
      <h1 style={{ color: TextColor }}>{eventName}</h1>

      <div style={{ display: "flex", justifyContent: "space-between",marginTop:"50px" }}>
        <div>
          <div className="date_time">
            <div className="date_container">
              <div
                style={{
                  background: color1 || "#ff5c5c",
                  color: TextColor1,
                }}
                id="Month"
              >
                {getMonthName(selectedDate)}
              </div>
              <div
                style={{
                  background: color2 || "#121212",
                  color: TextColor2,
                }}
                id="date"
              >
                {selectedDate?.getDate()}
              </div>
            </div>
            <div className="time_container">
              <div style={{ color: TextColor }} className="day">
                {getDayName(selectedDate)}
              </div>
              <div style={{ color: TextColor }} className="time">
                {startTime} to {endTime}
              </div>
            </div>
          </div>
          <div
            style={{ background: color1 || "#ff5c5c" }}
            className="few_seats"
          >
            {/* <img className="imgComponent5" src="/mdi_hot.png" alt="" /> */}
            <Image5 textcolor={TextColor1} />

            <div
              style={{
                marginTop: "1px",
                marginLeft: "30px",
                color: TextColor1,
              }}
            >
              ONLY FEW SEATS AVAILABLE
            </div>
          </div>
        </div>

        <div className="speaker_container">
          <div className="image_container">
            <img
              src={selectedFile}
              alt=""
            />
          </div>

          <h6 style={{ color: TextColor }}>SPEAKER</h6>
          <h3 style={{ color: TextColor }}>{speakerName}</h3>
          <h4 style={{ color: TextColor }}>{speakerRole}</h4>
        </div>
      </div>
      
    </div>
    <button
        onClick={() => {
          handleDownload(Igmssg,"Instagram_message");
        }}
      >
        Download
        {selectedDownloadButton === "Instagram_message" ? <Loader /> : ""}
      </button>
    </div>
  );
  return (
    <div className="GraphicContainer">
      <div className="GraphicContainer_header">
        <h1>
          Marketing Images for the Event: "{`${eventInfo.event?.sname?.substring(0, 30)}...`}"
        </h1>
        <h2>Download and share your event wherever you'd like.</h2>
      </div>
      <div className="GraphicContainer_color_select_container">
        <div className="colorPicker_container">
          <label htmlFor="background_colorPicker">
            Customize Background Color :
          </label>
          <input
            type="color"
            id="colorPicker"
            value={
              selectedColor ||
              "linear-gradient(180deg, #373737 0%, #0E001C 100%);"
            } // Set default color here if needed
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </div>
        <div className="colorPicker_container">
          <label htmlFor="text_colorPicker">Customize Text Color:</label>
          <input
            type="color"
            id="colorPicker2"
            value={TextColor || "#ffffff"} // Set default color here if needed
            onChange={(e) => setTextColor(e.target.value)}
          />
        </div>
        <div className="colorPicker_container">
          <label htmlFor="flag_colorPicker1">Customize Flag Color:</label>
          <input
            type="color"
            id="colorPicker1"
            value={color1 || "#ff5c5c"} // Set default color here if needed
            onChange={(e) => handleColorChange1(e.target.value)}
          />
        </div>
        <button onClick={handleReload} className="GraphicContainer_reset_button" type="submit">
          <IoReload />
          Restored Default
        </button>
      </div>
      <div className="GraphicContainer_breaker"></div>
      <div className="GraphicContainer_content_container">
        <div className="GraphicContainer_content_choose_platform">
          <h1>Choose Platform</h1>
          <button
            onClick={() => {
              handleSelectedButton("WhatsApp");
            }}
            className={
              selectedButton === "WhatsApp"
                ? "GraphicContainer_content_selected_Button"
                : ""
            }
          >
            <FaWhatsapp /> WhatsApp
          </button>
          <button
            onClick={() => {
              handleSelectedButton("Instagram");
            }}
            className={
              selectedButton === "Instagram"
                ? "GraphicContainer_content_selected_Button"
                : ""
            }
          >
            <FaInstagram />
            Instagram
          </button>
          <button
            onClick={() => {
              handleSelectedButton("LinkedIn");
            }}
            className={
              selectedButton === "LinkedIn"
                ? "GraphicContainer_content_selected_Button"
                : ""
            }
          >
            <FaLinkedinIn />
            LinkedIn
          </button>
        </div>
        {selectedButton === "WhatsApp" ? (
          <>
            <div className="GraphicContainer_content_html_posters">
            {WA_message_poster}
            {WA_poster} 
            </div>
          </>
        ) : (
          ""
        )}
        {selectedButton === "Instagram" ? (
          <>
            <div className="GraphicContainer_content_html_posters">
            {Ig_message}
            {IG_poster} 
            </div>
          </>
        ) : (
          ""
        )}
        {selectedButton === "LinkedIn" ? (
          <>
            <div className="GraphicContainer_content_html_posters">
            {Linkedin_poster}
            </div>
          </>
        ) : (
          ""
        )}

      </div>
    </div>
  );
};

export default GraphicsTemplate;
