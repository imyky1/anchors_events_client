import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { creatorContext } from "../../../../Context/CreatorState";
import ServiceContext from "../../../../Context/services/serviceContext";
import { LoadTwo } from "../../../Modals/Loading";
import { NewCongratsServiceModal } from "../../../Modals/ServiceSuccess/Modal";
import {
  DatePicker1,
  Editor1,
  SocialFields,
  TextField1,
} from "../Create Services/InputComponents/fields_Labels";
import "./EditProfile.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Cropper from "react-easy-crop";

import { Button, Modal, Select, Slider } from "@mui/material";
import getCroppedImg, { generateDownload } from "../../../helper/imageresize";
import { SuperSEO } from "react-super-seo";
import PreviewDemo from "./ProfileDemo";
import { FaRegEdit } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { RiTelegramLine, RiYoutubeLine } from "react-icons/ri";
// import {FaXTwitter} from "react-icons/fa";
import Twitter from "./tweet.svg";
import Topmate from "./topmate.svg";
import {
  Button1,
  Button3,
  Button4,
  Button5,
} from "../Create Services/InputComponents/buttons";
import PNGIMG from "../../../../Utils/Images/default_user.png";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { linkedinContext } from "../../../../Context/LinkedinState";

const ProfilePicutre = (props) => {
  return (
    <div className="profileinfo_frame_dummy">
      <div
        onClick={props.onClick}
        className="profile_info_frame_dummy_container"
      >
        <IoIosAdd />
        <div>Add logo</div>
      </div>
    </div>
  );
};

const EditProfile = (props) => {
  const navigate = useNavigate();

  const {
    allCreatorInfo,
    getAllCreatorInfo,
    basicNav,
    setCreatorInfo,
    generateInviteCode,
    getTellUsMoreFormData,
  } = useContext(creatorContext);
  const { UploadBanners } = useContext(ServiceContext);
  const [showPopup, setshowPopup] = useState({
    open: false,
    firstTimeModalOpenDashboard: false,
  }); // success popup
  const { getslugcountcreator } = useContext(linkedinContext);

  const [data, setdata] = useState({
    name: "",
    pageName: "",
    style: "",
    pageUrl: "",
    tagLine: "",
    email: "",
    phone: "",
    linkedInLink: "",
    ytLink: "",
    instaLink: "",
    fbLink: "",
    teleLink: "",
    twitterLink: "",
    websiteLink: "",
    topmateLink: "",
    profile: "",
  });
  const [phone, setPhone] = useState(0);
  const [Content, setContent] = useState();
  const [leftData, setLeftData] = useState(false);
  const [previewSourceOne, setPreviewSourceOne] = useState(""); // saves the data of file selected in the form
  //Image preview and resize opening model
  const [openimagePreview, setImagePreview] = useState(false);
  const [imagetocrop, setImageToCrop] = useState(null);

  const data1 = new FormData();
  data1.append("file", previewSourceOne);

  useEffect(() => {
    getAllCreatorInfo();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setdata({
      ...data,
      name: allCreatorInfo?.name || basicNav?.name,
      pageName: allCreatorInfo?.pageName,
      tagLine: allCreatorInfo?.tagLine,
      pageUrl: allCreatorInfo?.pageUrl,
      email: allCreatorInfo?.email || basicNav?.email,
      phone: allCreatorInfo?.phone,
      profile: allCreatorInfo?.profile || basicNav?.photo,
    });

    // if (!allCreatorInfo?.name) {
    //   setdata({
    //     ...data,
    //     name: basicNav?.name,
    //   });
    // }
    // if (!allCreatorInfo?.email) {
    //   setdata({
    //     ...data,
    //     email: basicNav?.email,
    //   });
    // }

    // if (!allCreatorInfo?.phone) {
    //   getTellUsMoreFormData().then((e) => {
    //     if (e?.success) {
    //       setPhone(e?.form?.contactNumber);
    //     }
    //   });
    // } else {
    //   setPhone(allCreatorInfo?.phone);
    // }
    setPhone(allCreatorInfo?.phone);
    setContent(allCreatorInfo?.aboutMe);
    // eslint-disable-next-line
  }, [allCreatorInfo]);

  const [openLoading, setOpenLoading] = useState(false);
  const [fontStyle, setFontStyle] = useState("Inter");
  const [isUniquePage, SetIsUniquePage] = useState(true);
  // Change in values of input tags
  const handleFontChange = (value) => {
    setFontStyle(value);
  };
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const changephone = (e) => {
    setPhone(e.target.value);
  };
  const handleChangeUserName = async (e) => {
    let value = e.target.value
      .replace(/\//g, "")
      .replace(/\?/g, "")
      .replace(/\&/g, "")
      .replace(/\@/g, "")
      .split(" ")
      .join("-");
    setdata({ ...data, pageUrl: value });
    if (value.length > 0) {
      let res = await getslugcountcreator(value,allCreatorInfo?.creatorID);
      SetIsUniquePage(!res?.creatorExists);
    }

    // if(e.target.value === basicNav?.slug || e.target.value === basicNav?.oldSlug){
    //   setUsernameAccepted(true)
    // }
  };

  // IMAGE RESIZE
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };
  const openimageresizebar = () => {
    setImagePreview((prev) => !prev);
  };

  const downloadcroppedimage = () => {
    generateDownload(imagetocrop, croppedArea);
  };
  const savecroppedImage = async () => {
    const img = await getCroppedImg(
      imagetocrop,
      croppedArea,
      previewSourceOne?.name
    );
    setPreviewSourceOne(img);
    setImagePreview(false);
    setShowimg(URL.createObjectURL(img));
  };

  const onNext = () => {
    //  warning and alerts for the saveing the profile
    if (!data?.pageName) {
      toast.info("Add a Page name for your page.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (!data?.pageUrl) {
      toast.info("Add your customize URL to continue.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (!data?.tagLine) {
      toast.info("Add a tagline to continue.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (!Content || Content?.length < 50) {
      toast.info(
        "Add an 'About' description (min 50 Characters) to continue.",
        {
          position: "top-center",
          autoClose: 1500,
        }
      );
    } else if (!data?.email) {
      toast.info("Add Supported Email to continue.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (!phone) {
      toast.info("Add Support Phone Number to continue.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (!isUniquePage) {
      toast.info("Page URL not unique.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (
      data?.pageName &&
      data?.pageUrl &&
      data?.tagLine &&
      Content?.length > 50 &&
      data?.email &&
      phone &&
      isUniquePage
    ) {
      setLeftData((leftData) => !leftData);
    }
  };

  const [showimg, setShowimg] = useState(null);

  function importData() {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (_) => {
      // you can use this method to get file and perform respective operations
      let files = Array.from(input.files);
      setShowimg(URL.createObjectURL(files[0]));
      setPreviewSourceOne(files[0]);
      const file = files[0];
      setZoom(1);
      setCrop({ x: 0, y: 0 });
      setCroppedArea(null);
      if (files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.addEventListener("load", () => {
          setImageToCrop(reader.result);
        });
        setPreviewSourceOne(file);
      }
    };
    input.click();
  }
  const onSubmit = async (e) => {
    let sample_number = phone;
    props.progress(0);
    setOpenLoading(true);
    e.preventDefault();
    sample_number = sample_number?.toString();

    //  warning and alerts for the saveing the profile
    if (!data?.pageName) {
      toast.info("Add a Page name for your page.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (!data?.pageUrl) {
      toast.info("Add your customize URL to continue.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (!data?.tagLine) {
      toast.info("Add a tagline to continue.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (!Content || Content?.length < 50) {
      toast.info(
        "Add an 'About' description (min 50 Characters) to continue.",
        {
          position: "top-center",
          autoClose: 1500,
        }
      );
    } else if (!data?.email) {
      toast.info("Add Supported Email to continue.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (!phone) {
      toast.info("Add Support Phone Number to continue.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (!isUniquePage) {
      toast.info("Page URL not unique.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (
      data?.pageName &&
      data?.pageUrl &&
      data?.tagLine &&
      Content?.length > 50 &&
      data?.email &&
      phone &&
      isUniquePage
    ) {
      console.log("updating info");
      var profile = previewSourceOne && (await UploadBanners(data1));
      const newData = {
        ...data,
        aboutMe: Content,
        profile: previewSourceOne
          ? profile?.result?.Location
          : data?.profile
          ? data?.profile
          : basicNav?.photo,
        phone: phone,
        slug: data.pageUrl,
      };
      const json = await setCreatorInfo(newData);
      if (json?.success) {
        setTimeout(async () => {
          await generateInviteCode(); // generates invite code it not exists otherwise
          window.open(`/dashboard/setup/success`, "_self");
        }, 500);
        setOpenLoading(false);
        // setshowPopup({
        //   open: true,
        //   firstTimeModalOpenDashboard: json?.already ? !json?.already : true,
        // });
        //
      } else {
        setOpenLoading(false);
        toast.error("Changes Not Saved. Please try again!!", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } else {
      console.log();
      toast.error("Some Error Occured", {
        position: "top-center",
        autoClose: 1500,
      });
    }

    setOpenLoading(false);
    props.progress(100);
  };
  return (
    <>
      {showPopup?.open && (
        <NewCongratsServiceModal
          type="editProfile"
          firstTimeModalOpenDashboard={showPopup?.firstTimeModalOpenDashboard}
        />
      )}

      {openimagePreview && previewSourceOne ? (
        <Modal
          open={openimagePreview}
          onClose={() => setImagePreview(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="ultimatewrapper_imageprev">
            <div className="container_imageresize">
              <div className="container-cropper">
                <>
                  <div className="cropper">
                    <Cropper
                      image={imagetocrop}
                      crop={crop}
                      zoom={zoom}
                      aspect={1 / 1}
                      cropShape="round"
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>
                </>
              </div>

              <div className="container-buttons">
                <div className="slider-imagecrop">
                  <div>
                    {" "}
                    <AddIcon />
                  </div>
                  <div className="slider-imagecrop-wrap">
                    <Slider
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e, zoom) => setZoom(zoom)}
                    />
                  </div>
                  <div>
                    {" "}
                    <RemoveIcon />
                  </div>
                </div>
                <div className="button-preview">
                  {" "}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={savecroppedImage}
                  >
                    Save
                  </Button>
                  {/* <Button
                        variant="contained"
                        color="secondary"
                        onClick={downloadcroppedimage}
                      >
                        Download
                      </Button> */}
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setImagePreview(false)}
                  >
                    Cancel
                  </Button>
                </div>
                <span className="warningspan_imagepreview">
                  *Do not save if you want the full image to be covered in
                  banner.
                </span>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}

      <ToastContainer />
      {openLoading && <LoadTwo open={openLoading} />}
      <div className="edit_profile_outside_wrapper">
        {/* MObile ui navbar ---------------- */}
        {window.screen.width < 600 && (
          <section className="navbar_ui_covering_section_mobile_active">
            <BsArrowLeftShort
              size={22}
              onClick={() => {
                !leftData ? navigate(-1) : setLeftData(false);
              }}
            />
            {!leftData ? "Build Your Profile!" : "Grow Your Following!"}
          </section>
        )}

        <div className="edit_profile_outside_wrapper_left">
          {!leftData && (
            <div className="personalinfo_wrap">
              {window.screen.width > 600 && (
                <div className="personalinfo_top">
                  <h1>Setup Your Page</h1>
                  <h3>Customise your profile</h3>
                </div>
              )}
              <div className="personalinfo_photosection">
                <div className="personalinfo_photocontainer">
                  <div className="personalinfo_photo">
                    {showimg || data?.profile || basicNav?.phone ? (
                      <img
                        className="profileinfo_imagec"
                        src={
                          showimg
                            ? showimg
                            : data?.profile !== ""
                            ? data?.profile
                            : basicNav?.photo
                        }
                        alt=""
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = PNGIMG;
                        }}
                      />
                    ) : (
                      <ProfilePicutre onClick={() => importData()} />
                    )}
                    {(showimg || data?.profile || basicNav?.phone) && (
                      <span
                        className="personalinfo_photocontainer_image_upload"
                        onClick={() => importData()}
                      >
                        <FaRegEdit color="white" size={14} />
                      </span>
                    )}
                  </div>

                  <div className="personalinfo_upload">
                    {previewSourceOne ? (
                      <>
                        {" "}
                        <Button
                          variant="outlined"
                          onClick={openimageresizebar}
                          className="imageresizeopenerbutton"
                        >
                          Preview Image and Resize
                        </Button>
                        <br />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="personalinfo_formwrap">
                <div className="perosnalinfo_pageName">
                  <TextField1
                    label="Page Name"
                    name="pageName"
                    id="name"
                    required={true}
                    value={data.pageName}
                    placeholder="Enter Your Page Name"
                    onChange={handleChange}
                  />
                  {/* <TextField1
                    label="Date Of Birth"
                    name="dob"
                    id="dob"
                    required={true}
                    type="Date"
                    value={data?.dob?.slice(0, 10)}
                    placeholder="dd/mm/yyyy"
                    onChange={handleChange}
                  /> */}
                </div>
                <div className="personalinfo_chooseStyle">
                  <span
                    style={{
                      color: "#FAFAFA",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#94A3B8",
                    }}
                  >
                    Choose Style
                  </span>
                  <div className="personalinfo_style_button">
                    {fontStyle === "Inter" ? (
                      <Button4
                        onClick={() => handleFontChange("Inter")}
                        height={"40px"}
                        width={"137px"}
                        fontSize={"12px"}
                        text={"Select font Style"}
                      />
                    ) : (
                      <Button5
                        onClick={() => handleFontChange("Inter")}
                        height={"40px"}
                        width={"137px"}
                        fontSize={"12px"}
                        text={"Select font Style"}
                      />
                    )}
                    {fontStyle === "Apple Chancery" ? (
                      <Button4
                        onClick={() => handleFontChange("Apple Chancery")}
                        height={"40px"}
                        width={"137px"}
                        fontSize={"12px"}
                        fontFamily={"Apple Chancery"}
                        text={"Select font Style"}
                      />
                    ) : (
                      <Button5
                        onClick={() => handleFontChange("Apple Chancery")}
                        height={"40px"}
                        width={"137px"}
                        fontSize={"12px"}
                        fontFamily={"Apple Chancery"}
                        text={"Select font Style"}
                      />
                    )}
                    {fontStyle === "Tims Grocery Store" ? (
                      <Button4
                        onClick={() => handleFontChange("Tims Grocery Store")}
                        height={"40px"}
                        width={"137px"}
                        fontSize={"12px"}
                        fontFamily={"Tims Grocery Store"}
                        text={"Select font Style"}
                      />
                    ) : (
                      <Button5
                        onClick={() => handleFontChange("Tims Grocery Store")}
                        height={"40px"}
                        width={"137px"}
                        fontSize={"12px"}
                        fontFamily={"Tims Grocery Store"}
                        text={"Select font Style"}
                      />
                    )}
                    {fontStyle === "Inria Serif" ? (
                      <Button4
                        onClick={() => handleFontChange("Inria Serif")}
                        width={"140px"}
                        height={"40px"}
                        fontSize={"12px"}
                        fontFamily={"Inria Serif"}
                        text={"Select font Style"}
                      />
                    ) : (
                      <Button5
                        onClick={() => handleFontChange("Inria Serif")}
                        height={"40px"}
                        width={"140px"}
                        fontSize={"12px"}
                        fontFamily={"Inria Serif"}
                        text={"Select font Style"}
                      />
                    )}
                  </div>
                </div>
                <div className="perosnalinfo_customize_url">
                  <label for="pageUrl">
                    Customise Page URL <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="perosnalinfo_customize_url_wrapper">
                    anchors.in/
                    <input
                      label="Customise Page URL"
                      name="pageUrl"
                      id="pageUrl"
                      color="white"
                      required={true}
                      value={data.pageUrl}
                      placeholder={"linkedin24X7"}
                      onChange={handleChangeUserName}
                    />
                    {!isUniquePage ? (
                      <div style={{ color: "red" }}>Unavailable</div>
                    ) : (
                      <div style={{ color: "green" }}>available</div>
                    )}
                  </div>
                </div>
                <div className="perosnalinfo_tagline">
                  <TextField1
                    label="tagLine"
                    name="tagLine"
                    id="tagLine"
                    required={true}
                    value={data.tagLine}
                    placeholder="Author with 10M+ copies sold"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="personalinfo_aboutme">
                <Editor1
                  name="about"
                  label="About"
                  placeholder={`add a little about yourself for your audience.
Tip : copy your LinkedIn/Youtube 'about' section ;)`}
                  Content={Content}
                  setContent={(e) => setContent(e)}
                  required={true}
                />
              </div>
              <div className="personalinfo_support_info">
                <TextField1
                  label="Support Email"
                  name="email"
                  id="email"
                  required={true}
                  value={data.email}
                  placeholder="Enter support email"
                  onChange={handleChange}
                />
                <TextField1
                  label="Support Phone Number"
                  name="phone"
                  id="name"
                  required={true}
                  value={phone}
                  placeholder="Enter support phone number"
                  onChange={changephone}
                />
              </div>
              <div className="personalinfo_savebutton">
                <Button4
                  text="Save & Next"
                  icon={<AiOutlineArrowRight />}
                  onClick={onNext}
                />
              </div>
            </div>
          )}
          {leftData && (
            <div className="personalinfo_socialwrap_01">
              <div className="personalinfo_socialwrap">
                {window.screen.width > 600 && <h2>Grow Your Following!</h2>}
                <div className="personalinfo_sociallinks_wrapper">
                  <h2>Add Social Media Links</h2>
                  <div className="personalinfo_sociallinks_row">
                    <div className="personalinfo_sociallinks">
                      <SocialFields
                        placeholder="https://www.linkedin.com/in/username"
                        value={data?.linkedInLink}
                        name="linkedInLink"
                        id="linkedIn"
                        onChange={handleChange}
                        icons={<AiOutlineLinkedin size={22} />}
                      />

                      {allCreatorInfo?.linkedInLink ? (
                        <svg
                          width="18"
                          height="14"
                          viewBox="0 0 18 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 1.99984L6 13.9998L0.5 8.49984L1.91 7.08984L6 11.1698L16.59 0.589844L18 1.99984Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="personalinfo_sociallinks">
                      <SocialFields
                        placeholder="https://www.instagram.com/username"
                        value={data?.instaLink}
                        name="instaLink"
                        id="instagram"
                        onChange={handleChange}
                        icons={<FiInstagram size={22} />}
                      />

                      {allCreatorInfo?.instaLink ? (
                        <svg
                          width="18"
                          height="14"
                          viewBox="0 0 18 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 1.99984L6 13.9998L0.5 8.49984L1.91 7.08984L6 11.1698L16.59 0.589844L18 1.99984Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="personalinfo_sociallinks_row">
                    <div className="personalinfo_sociallinks">
                      <SocialFields
                        placeholder="https://twitter.com/username"
                        value={data?.twitterLink}
                        name="twitterLink"
                        id="twitterLink"
                        onChange={handleChange}
                        icons={<img src={Twitter} width={22} />}
                      />

                      {allCreatorInfo?.twitterLink ? (
                        <svg
                          width="18"
                          height="14"
                          viewBox="0 0 18 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 1.99984L6 13.9998L0.5 8.49984L1.91 7.08984L6 11.1698L16.59 0.589844L18 1.99984Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="personalinfo_sociallinks">
                      <SocialFields
                        placeholder="https://www.anchors.in/in_himanshu_91"
                        value={data?.websiteLink}
                        name="websiteLink"
                        id="websiteLink"
                        onChange={handleChange}
                        icons={<CiGlobe size={22} />}
                      />

                      {allCreatorInfo?.websiteLink ? (
                        <svg
                          width="18"
                          height="14"
                          viewBox="0 0 18 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 1.99984L6 13.9998L0.5 8.49984L1.91 7.08984L6 11.1698L16.59 0.589844L18 1.99984Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="personalinfo_sociallinks_row">
                    <div className="personalinfo_sociallinks">
                      <SocialFields
                        placeholder="https://t.me/username"
                        value={data?.teleLink}
                        name="teleLink"
                        id="teleLink"
                        onChange={handleChange}
                        icons={<RiTelegramLine size={22} />}
                      />

                      {allCreatorInfo?.teleLink ? (
                        <svg
                          width="18"
                          height="14"
                          viewBox="0 0 18 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 1.99984L6 13.9998L0.5 8.49984L1.91 7.08984L6 11.1698L16.59 0.589844L18 1.99984Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="personalinfo_sociallinks">
                      <SocialFields
                        placeholder="https://www.youtube.com/@channelname"
                        value={data?.ytLink}
                        name="ytLink"
                        id="ytLink"
                        onChange={handleChange}
                        icons={<RiYoutubeLine size={22} />}
                      />

                      {allCreatorInfo?.ytLink ? (
                        <svg
                          width="18"
                          height="14"
                          viewBox="0 0 18 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 1.99984L6 13.9998L0.5 8.49984L1.91 7.08984L6 11.1698L16.59 0.589844L18 1.99984Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                {/* <div className="personalinfo_sociallinks">
                  <SocialFields
                    placeholder="https://topmate.io/username"
                    value={data?.topmateLink}
                    name="topmateLink"
                    id="topmateLink"
                    onChange={handleChange}
                    icons={<img src={Topmate} width={22} />}
                  />

                  {allCreatorInfo?.topmateLink ? (
                    <svg
                      width="18"
                      height="14"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 1.99984L6 13.9998L0.5 8.49984L1.91 7.08984L6 11.1698L16.59 0.589844L18 1.99984Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </div> */}
              </div>
              <div
                style={{ justifyContent: "space-between" }}
                className="personalinfo_savebutton"
              >
                {window.screen.width > 600 && (
                  <Button3
                    text="Previous"
                    icon={<AiOutlineArrowLeft />}
                    onClick={() => {
                      onNext();
                    }}
                  />
                )}
                <Button4
                  text="Save"
                  width={"108px"}
                  height={"40px"}
                  icon={<AiOutlineArrowRight />}
                  onClick={onSubmit}
                />
              </div>
            </div>
          )}
        </div>

        {window.screen.width > 600 && (
          <div className="live_preview_edit_profile_page">
            <div className="live_preview_modal_design">
              <section>
                <img
                  src={require("../../../../Utils/Images/mobile-screen.png")}
                  alt=""
                />
                <PreviewDemo
                  {...data}
                  newImage={showimg ?? data?.profile ?? basicNav?.photo}
                  about={Content}
                  {...props?.moreInfo}
                />
              </section>
            </div>
          </div>
        )}
      </div>
      <SuperSEO title="Anchors - Edit Profile" />
    </>
  );
};

export default EditProfile;
