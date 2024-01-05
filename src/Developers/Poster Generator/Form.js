import React, { useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import * as htmlToImage from "html-to-image";
import DatePicker from "react-datepicker";
import download from "downloadjs";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "./components/Loader";
import Image1 from "./components/Image1";
import Image2 from "./components/Image2";
import Image3 from "./components/Image3";
import Image4 from "./components/Image4";
import Image5 from "./components/Image5";

import "./index.css"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { jwtTokenDeveloper } from "../../config/config";

const PosterGenerator = () => {
  const [cookies, setCookie ,removeCookie] = useCookies();
  const navigate = useNavigate()

  const posterRef = useRef(null);
  const WAref = useRef(null);
  const IgRef = useRef(null);
  const Linkedin = useRef(null);
  const WAmssg = useRef(null);
  const Igmssg = useRef(null);
  const imageContainerRef = useRef(null); // Reference to the image container
  const [eventType, setEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [speakerName, setSpeakerName] = useState("");
  const [speakerRole, setSpeakerRole] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null); // State to hold the background color
  const [color1, setColor1] = useState(null); // State to hold the flag1  color
  const [color2, setColor2] = useState(null); // State to hold the flag2 color
  const [TextColor, setTextColor] = useState("#FFFFFF"); // State to hold the selected color
  const [TextColor1, setTextColor1] = useState("#FFFFFF"); // State to hold the selected color
  const [TextColor2, setTextColor2] = useState("#FFFFFF"); // State to hold the selected color
  const [showColorButtons, setShowColorButtons] = useState(true); // State to control button visibility

  const handleColorChange = (color) => {
    setSelectedColor(color)
    // Check color brightness
    const brightness = calculateBrightness(color);
    // Set text color based on brightness
    const textColor = brightness < 128 ? "#FFFFFF" : "#212121";
    setTextColor(textColor)
  };

  const handleColorChange1 = (color) => {
    setColor1(color);
    // Check color brightness
    const brightness = calculateBrightness(color);
    // Set text color based on brightness
    const textColor1 = brightness < 128 ? "#FFFFFF" : "#212121";
    setTextColor1(textColor1)
  };

  const handleColorChange2 = (color) => {
    setColor2(color);
    // Check color brightness
    const brightness = calculateBrightness(color);
    // Set text color based on brightness
    const textColor2 = brightness < 128 ? "#FFFFFF" : "#212121";
    setTextColor2(textColor2);
  };

  const getMonthName = (date) => {
    return new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
  };

  const getDayName = (date) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const calculateBrightness = (hexColor) => {
    const color = hexColor.substring(1); // Remove #
    const r = parseInt(color.substring(0, 2), 16); // Red value
    const g = parseInt(color.substring(2, 4), 16); // Green value
    const b = parseInt(color.substring(4, 6), 16); // Blue value
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedColor("linear-gradient(180deg, #373737 0%, #0E001C 100%)")
    setTextColor("#FFFFFF")
    setTextColor1("#FFFFFF")
    setTextColor2("#FFFFFF")
    setColor1("#FF5C5C")
    setColor2("#121212")
  };

  const handleDownload = async (reference) => {
    const dataURL = await htmlToImage.toPng(reference.current);
    download(dataURL, `poster${Math.random()}.png`, "image/png");
  };


  const handleDownloadAll = async () =>{
    let arr = [
      WAref,
      IgRef,
      Linkedin,
      WAmssg,
      Igmssg
    ]

    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      await handleDownload(element)
    }

  }

  const handleLogout = () => {
    localStorage.removeItem("jwtTokenD");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isUser");
    localStorage.removeItem("isDev");
    localStorage.removeItem("c_id");
    removeCookie("devsession")
    navigate("/");
  };


  if (localStorage.getItem("jwtTokenD") !== jwtTokenDeveloper || !localStorage.getItem("isDev") || !cookies.devsession) {
    handleLogout()
    window.open("/developer/login", "_self");
  }


  return (
    <>
      <div className="PosterForm">
        <h1>Enter Poster Details</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="eventType">Select Event Type</label>
          <select
            name="eventType"
            id="eventType"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="WEBINAR">WEBINAR</option>
          </select>
          <label htmlFor="eventName">Event Name</label>
          <input
            id="eventName"
            placeholder="Event Name"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <label htmlFor="datepicker">Select date</label>
          <DatePicker
            id="datepicker"
            placeholderText="dd/MM/yyyy"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
          />
          <div style={{ display: "flex", margin: "10px 0" }}>
            <label style={{ marginRight: "10px" }} htmlFor="starttime">
              Start Time
            </label>
            <input
              type="time"
              id="starttime"
              onChange={(e) => setStartTime(e.target.value)}
              value={startTime}
              placeholder="HH:MM"
            ></input>
            <label
              style={{ marginLeft: "30px", marginRight: "10px" }}
              htmlFor="endtime"
            >
              End Time
            </label>
            <input
              type="time"
              id="endtime"
              onChange={(e) => setEndTime(e.target.value)}
              value={endTime}
            ></input>
          </div>
          <label htmlFor="speakerName">Speaker Name</label>
          <input
            id="speakerName"
            placeholder="Speaker Name"
            type="text"
            value={speakerName}
            onChange={(e) => setSpeakerName(e.target.value)}
          />
          <div style={{ margin: "10px 0" }}>
            <label style={{ marginRight: "20px" }} htmlFor="image">
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <label htmlFor="speakerjob">Speaker Designation</label>
          <input
            id="speakerjob"
            placeholder="e.g. Co-founder, Linkedin 24x7"
            type="text"
            value={speakerRole}
            onChange={(e) => setSpeakerRole(e.target.value)}
          />
          <button type="submit">RESET</button>
        </form>
        <div className="imageContainer" ref={imageContainerRef}></div>
        {uploadingImage && (
          <div className="modal">
            <Loader />
            {/* <button onClick={closeModal}>Close</button> */}
          </div>
        )}
        <div
          className="color_selection"
          style={{ display: showColorButtons ? "flex" : "none" }}
        >
          <div className="colorButtons">
            <label htmlFor="colorPicker">Select Background Color:</label>
            {/* <SketchPicker
        color={selectedColor||"linear-gradient(180deg, #373737 0%, #0E001C 100%)"}
        onChange={(color) => handleColorChange(color)}/> */}
            <input
              type="color"
              id="colorPicker"
              value={
                selectedColor ||
                "linear-gradient(180deg, #373737 0%, #0E001C 100%);"
              } // Set default color here if needed
              onChange={(e) => handleColorChange(e.target.value)}
            />
            <label htmlFor="colorPicker1">Select Flag Color:</label>
            <input
              type="color"
              id="colorPicker1"
              value={color1 || "#ff5c5c"} // Set default color here if needed
              onChange={(e) => handleColorChange1(e.target.value)}
            />
            <label htmlFor="colorPicker2">Select Flag Color:</label>
            <input
              type="color"
              id="colorPicker2"
              value={color2 || "#121212"} // Set default color here if needed
              onChange={(e) => handleColorChange2(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button onClick={handleDownloadAll}>Download all</button>
      <div className="imageContainer">
      <div className="posters">
        <div className="WAposter" ref={WAref}
          style={{
            background:
              selectedColor ||
              "linear-gradient(180deg, #373737 0%, #0E001C 100%",
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
          <div
            style={{ background: color1 || "#ff5c5c" }}
            className="few_seats"
          >
            <Image5 textcolor={TextColor1} />
            {/* <img style={{color:textColor}} className="imgComponent5" src="/mdi_hot.png" alt="" /> */}

            <div style={{ marginLeft: "50px", color: TextColor1 }}>
              ONLY FEW SEATS AVAILABLE
            </div>
          </div>
          <div className="speaker_container">
            <div className="image_container">
              <img
                src={selectedFile && URL.createObjectURL(selectedFile)}
                alt=""
              />
            </div>

            <h6 style={{ color: TextColor }}>SPEAKER</h6>
            <h3 style={{ color: TextColor }}>{speakerName}</h3>
            <h4 style={{ color: TextColor }}>{speakerRole}</h4>
          </div>
        </div>
        <button
          onClick={() => {
            handleDownload(WAref);
          }}
        >
          Download
        </button>
      </div>

      <div className="posters">
      <div className="Igposter" ref={IgRef}
          style={{
            background:
              selectedColor ||
              "linear-gradient(180deg, #373737 0%, #0E001C 100%)",
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
          <div
            style={{ background: color1 || "#ff5c5c" }}
            className="few_seats"
          >
            <Image5 textcolor={TextColor1} />
            {/* <img className="imgComponent5" src="/mdi_hot.png" alt="" /> */}

            <div style={{ marginLeft: "50px", color: TextColor1 }}>
              ONLY FEW SEATS AVAILABLE
            </div>
          </div>
          <div className="speaker_container">
            <div className="image_container">
              <img src={selectedFile && URL.createObjectURL(selectedFile)} alt="" />
            </div>

            <h6 style={{ color: TextColor }}>SPEAKER</h6>
            <h3 style={{ color: TextColor }}>{speakerName}</h3>
            <h4 style={{ color: TextColor }}> {speakerRole}</h4>
          </div>
        </div>
        <button
          onClick={() => {
            handleDownload(IgRef);
          }}
        >
          Download
        </button>

  
      <div className="posters">
      <div className="WAmssg" ref={WAmssg}
          style={{
            background:
              selectedColor ||
              "linear-gradient(180deg, #373737 0%, #0E001C 100%)",
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
          <div
            style={{ background: color1 || "#ff5c5c" }}
            className="few_seats"
          >
            {/* <img className="imgComponent5" src="/mdi_hot.png" alt="" /> */}
            <Image5 textcolor={TextColor1} />

            <div style={{ marginLeft: "30px", color: TextColor1 }}>
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
                <img src={selectedFile && URL.createObjectURL(selectedFile)} alt="" />
              </div>

              <h6 style={{ color: TextColor }}>SPEAKER</h6>
              <h3 style={{ color: TextColor }}>{speakerName}</h3>
              <h4 style={{ color: TextColor }}>{speakerRole}</h4>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            handleDownload(WAmssg);
          }}
        >
          Download
        </button>
      </div>

      <div className="posters">
      <div className="Linkedin" ref={Linkedin}
          style={{
            background:
              selectedColor ||
              "linear-gradient(180deg, #373737 0%, #0E001C 100%)",
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
                  <img src={selectedFile &&  URL.createObjectURL(selectedFile)} alt="" />
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
            handleDownload(Linkedin);
          }}
        >
          Download
        </button>
      </div>

      <div className="posters">
      <div className="Igmssg" ref={Igmssg}
          style={{
            background:
              selectedColor ||
              "linear-gradient(180deg, #373737 0%, #0E001C 100%)",
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

          <div style={{ display: "flex", justifyContent: "space-between" }}>
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

                <div style={{ marginLeft: "30px", color: TextColor1 }}>
                  ONLY FEW SEATS AVAILABLE
                </div>
              </div>
            </div>

            <div className="speaker_container">
              <div className="image_container">
                <img src={selectedFile && URL.createObjectURL(selectedFile) } alt="" />
              </div>

              <h6 style={{ color: TextColor }}>SPEAKER</h6>
              <h3 style={{ color: TextColor }}>{speakerName}</h3>
              <h4 style={{ color: TextColor }}>{speakerRole}</h4>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            handleDownload(Igmssg);
          }}
        >
          Download
        </button>
      </div>
      </div>
      </div>
    </>
  )
} 

export default PosterGenerator;