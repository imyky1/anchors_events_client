import React, { useEffect, useRef, useState } from "react";
import "./defaultBanner.css";
import "../../Editor/New UI/Create Services/Canvas.css";
import { ToastContainer, toast } from "react-toastify";
import excel from "./TestImage/excel.svg";
import excelL from "./TestImage/excellarge.svg";
import pdf from "./TestImage/pdf.svg";
import pdfL from "./TestImage/pdflarge.svg";
import video from "./TestImage/video.svg";
import videoL from "./TestImage/videofull.svg";
import bannerRed from "./TestImage/Banner_red.png";
import bannerBlack from "./TestImage/Banner_black.png";
import bannerBlue from "./TestImage/Banner_blue.png";
import html2canvas from "html2canvas";
import PNGIMG from "../../../Utils/Images/default_user.png";

function DefaultBanner2({ open, onClose, dataToRender, setFinalData }) {
  const htmlElementRef = useRef(null); // desktop banner
  const htmlElementRef2 = useRef(null); // mobile banner
  const [color, setColor] = useState({ background: "Red" });
  const [dataToUse, setDataToUse] = useState({
    background: "",
    smallSVGSource: "",
    SVGSource: "",
    buttonGradient: {},
    svgStyle: {},
    docText: "",
  });

  const handleColorClick = (e) => {
    setColor({ background: e });
  };

  const saveAsImage = () => {
    const element = htmlElementRef.current;
    const mobileElement = htmlElementRef2.current;

    let formData = new FormData();

    html2canvas(element).then(function (canvas) {
      canvas.toBlob(function (blob) {
        formData.append("file", blob, "image.png");
      });
    });

    html2canvas(mobileElement).then(function (canvas) {
      canvas.toBlob(function (blob) {
        var objectURL = URL.createObjectURL(blob);
        const formData2 = new FormData();
        formData2.append("file", blob, "mobimage.png");
        setFinalData(formData, formData2, objectURL);
      });
    });
  };

  useEffect(() => {
    setDataToUse({
      background:
        color?.background === "Red"
          ? bannerRed
          : color?.background === "Blue"
          ? bannerBlue
          : bannerBlack,
      smallSVGSource:
        dataToRender?.type === "excel"
          ? excel
          : dataToRender?.type === "video"
          ? video
          : pdf,
      SVGSource:
        dataToRender?.type === "excel"
          ? excelL
          : dataToRender?.type === "video"
          ? videoL
          : pdfL,
      buttonGradient:
        color?.background === "Red"
          ? {
              background: "linear-gradient(270deg, #A10303 0%, #121212 100%)",
            }
          : color?.background === "Blue"
          ? {
              background: "linear-gradient(270deg, #5E17FE 0%, #2C0090 100%)",
            }
          : {
              background: "linear-gradient(270deg, #121212 0%, #464646 100%)",
            },
      svgStyle:
        dataToRender?.type === "pdf" ? { opacity: "0.20000000298023224" } : {},
      docText:
        dataToRender?.type === "excel"
          ? "Excel Sheet"
          : dataToRender?.type === "video"
          ? "Video"
          : "PDF",
    });
  }, [dataToRender, color]);

  useEffect(() => {
    if (dataToRender?.sname === "") {
      toast.info("Fill the service title to generate the banner", {
        position: "top-center",
        autoClose: 2000,
      });
      onClose();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="default_previewer_wrapper">
        <div>
          {/* Html banner ------------------------------- */}
          <div className="outer" ref={htmlElementRef}>
            <img src={dataToUse?.background} />
            <div>
              <div className="outer_01">
                <div className="type_01">
                  <img src={dataToUse?.smallSVGSource} alt="Small SVG" />
                  <div className="type_text">{dataToUse?.docText}</div>
                </div>
                <div className="type_title">{dataToRender?.sname}</div>
                <div className="creator_name" style={dataToUse?.buttonGradient}>
                  By {dataToRender?.cname}{" "}
                </div>
              </div>
              <div className="right_image">
                <img
                  src={dataToUse?.SVGSource}
                  style={dataToUse?.svgStyle}
                  alt="SVG"
                />
              </div>
            </div>
          </div>

          <div className="mobile_banner" ref={htmlElementRef2}>
            <img src={dataToUse?.background} />
            <div>
              <div className="mobile_banner_outer_01">
                <div className="mobile_banner_type_01">
                  <img src={dataToUse?.smallSVGSource} alt="Small SVG" />
                  <div className="mobile_banner_type_text">
                    {dataToUse?.docText}
                  </div>
                </div>
                <div className="mobile_banner_type_title">
                  {dataToRender?.sname}
                </div>
                <div
                  className="mobile_banner_creator_name"
                  style={dataToUse?.buttonGradient}
                >
                  By {dataToRender?.cname}{" "}
                </div>
              </div>
              <div className="mobile_banner_right_image">
                <img
                  src={dataToUse?.SVGSource}
                  style={dataToUse?.svgStyle}
                  alt="SVG"
                />
              </div>
            </div>
          </div>

          <section className="default_options_sections">
            <div>
              <span
                className={`normal_color_option_default_banner ${
                  color?.background === "Red" &&
                  "active_color_option_default_banner"
                }`}
                onClick={() => {
                  handleColorClick("Red");
                }}
              >
                <span style={{ backgroundColor: "#E84142" }}></span>
              </span>
              <span
                className={`normal_color_option_default_banner ${
                  color?.background === "Blue" &&
                  "active_color_option_default_banner"
                }`}
                onClick={() => {
                  handleColorClick("Blue");
                }}
              >
                <span style={{ backgroundColor: "#5E17FE" }}></span>
              </span>
              <span
                className={`normal_color_option_default_banner ${
                  color?.background === "Black" &&
                  "active_color_option_default_banner"
                }`}
                onClick={() => {
                  handleColorClick("Black");
                }}
              >
                <span style={{ backgroundColor: "#151515" }}></span>
              </span>
            </div>

            <section>
              <button onClick={onClose}>Close</button>
              <button
                onClick={() => {
                  // handleDownloadClick();
                  saveAsImage();
                  onClose();
                  toast.success("Banner Saved Successfully", {
                    autoClose: 1500,
                  });
                }}
              >
                Save
              </button>
            </section>
          </section>
        </div>
      </div>

      <ToastContainer limit={1} />
    </>
  );
}

export const PersonalizedInviteeCard = ({
  open,
  onClose,
  data,
  speakersArray,
  speakersImagesArray
}) => {
   // Default banner fucntion -------------
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

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="default_previewer_wrapper">
        <div>
          {/* Html banner ------------------------------- */}
          {speakersArray[0]?.name ? (
            <div class="personalized_card_wrapper">
              <img
                src={
                  "https://anchors-assets.s3.amazonaws.com/1692550675052-back2.jpeg"
                }
                alt="background"
              />
              <div class="texting_layer_banner">
                <section class="left_side_text">
                  <h1>{data?.sname}</h1>
                  <span>by {data?.cname}</span>
                </section>
                <section class="date_time_section_banner_multiple">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="vuesax/linear/calendar">
                        <g id="vuesax/linear/calendar_2">
                          <g id="calendar">
                            <path
                              id="Vector"
                              d="M8 2V5"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_2"
                              d="M16 2V5"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_3"
                              d="M3.5 9.08997H20.5"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_4"
                              d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_5"
                              d="M15.6947 13.7H15.7037"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_6"
                              d="M15.6947 16.7H15.7037"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_7"
                              d="M11.9955 13.7H12.0045"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_8"
                              d="M11.9955 16.7H12.0045"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_9"
                              d="M8.29431 13.7H8.30329"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_10"
                              d="M8.29431 16.7H8.30329"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>

                    <span>{getDate(data?.date)}</span>
                  </div>
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="ci:clock">
                        <path
                          id="Vector"
                          d="M12 7V12H17M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12C21 14.3869 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.3869 21 12 21Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </svg>

                    <span>{convertTime(data?.startTime) + "-" + convertTime(data?.endTime)}</span>
                  </div>
                </section>
                <div class="all_speaker_details_section">
                  {speakersArray?.map((speaker, index) => {
                    return (
                      <section class="creator_profile_banner_multiple">
                        <div class="text_box_creator_name_multiple">
                          <h4>Speaker</h4>
                          <span>{speaker.name}</span>
                        </div>
                        <div class="creator_image_cover_banner_multiple">
                          <img
                            src={
                              speakersImagesArray[index]
                                ? URL.createObjectURL(
                                    speakersImagesArray[index]
                                  )
                                : speaker?.isCreator
                                ? data?.cprofile
                                : PNGIMG
                            }
                            alt=""
                          />
                        </div>
                      </section>
                    );
                  })}
                </div>
                <section class="user_profile_banner_multiple">
                  <div class="text_box_user_name_multiple">
                    <span>David Rathore</span>
                  </div>
                  <div class="user_image_cover_banner_multiple">
                    <img
                      src="https://www.shareicon.net/data/512x512/2016/09/15/829459_man_512x512.png"
                      alt=""
                    />
                  </div>
                  <h3>JOIN ALONG WITH ME!</h3>
                </section>
              </div>
            </div>
          ) : (
            <div class="personalized_card_wrapper">
              <img
                src={
                  "https://anchors-assets.s3.amazonaws.com/1692550675052-back2.jpeg"
                }
                alt="background"
              />
              <div class="texting_layer_banner">
                <section class="left_side_text">
                  <h1>{data?.sname}</h1>
                  <span>by {data?.cname}</span>
                </section>

                <section class="creator_profile_banner">
                  <div class="text_box_creator_name">
                    <h4>Speaker</h4>
                    <span>{data?.cname}</span>
                  </div>
                  <div class="creator_image_cover_banner">
                    <img src={data?.cprofile} alt="" />
                  </div>
                </section>

                <section class="user_profile_banner">
                  <div class="text_box_user_name">
                    <span>David Rathore</span>
                  </div>
                  <div class="user_image_cover_banner">
                    <img
                      src="https://www.shareicon.net/data/512x512/2016/09/15/829459_man_512x512.png"
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = PNGIMG;
                      }}
                    />
                  </div>

                  <h3>JOIN ALONG WITH ME!</h3>
                </section>

                <section class="date_time_section_banner_single">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="vuesax/linear/calendar">
                        <g id="vuesax/linear/calendar_2">
                          <g id="calendar">
                            <path
                              id="Vector"
                              d="M8 2V5"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_2"
                              d="M16 2V5"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_3"
                              d="M3.5 9.08997H20.5"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_4"
                              d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_5"
                              d="M15.6947 13.7H15.7037"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_6"
                              d="M15.6947 16.7H15.7037"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_7"
                              d="M11.9955 13.7H12.0045"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_8"
                              d="M11.9955 16.7H12.0045"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_9"
                              d="M8.29431 13.7H8.30329"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              id="Vector_10"
                              d="M8.29431 16.7H8.30329"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                    <span>{getDate(data?.date)}</span>
                  </div>
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="ci:clock">
                        <path
                          id="Vector"
                          d="M12 7V12H17M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12C21 14.3869 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.3869 21 12 21Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </svg>
                    <span>{convertTime(data?.startTime) + "-" + convertTime(data?.endTime)}</span>
                  </div>
                </section>
              </div>
            </div>
          )}
          <section className="default_options_sections">
            {/* <div>
              <span
                className={`normal_color_option_default_banner ${
                  color?.background === "Red" &&
                  "active_color_option_default_banner"
                }`}
                onClick={() => {
                  handleColorClick("Red");
                }}
              >
                <span style={{ backgroundColor: "#E84142" }}></span>
              </span>
              <span
                className={`normal_color_option_default_banner ${
                  color?.background === "Blue" &&
                  "active_color_option_default_banner"
                }`}
                onClick={() => {
                  handleColorClick("Blue");
                }}
              >
                <span style={{ backgroundColor: "#5E17FE" }}></span>
              </span>
              <span
                className={`normal_color_option_default_banner ${
                  color?.background === "Black" &&
                  "active_color_option_default_banner"
                }`}
                onClick={() => {
                  handleColorClick("Black");
                }}
              >
                <span style={{ backgroundColor: "#151515" }}></span>
              </span>
            </div> */}

            <section>
              <button onClick={onClose}>Close</button>
            </section>
          </section>
        </div>
      </div>

      <ToastContainer limit={1} />
    </>
  );
};

export default DefaultBanner2;
