import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { creatorContext } from "../../../../Context/CreatorState";
import ServiceContext from "../../../../Context/services/serviceContext";
import { LoadTwo } from "../../../Modals/Loading";
import SuccessService from "../../../Modals/ServiceSuccess/Modal";
import {
  Editor1,
  SocialFields,
  TextField1,
} from "../Create Services/InputComponents/fields_Labels";
import "./EditProfile.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Cropper from "react-easy-crop";

import { Button, Modal, Slider } from "@mui/material";
import getCroppedImg, { generateDownload } from "../../../helper/imageresize";
import { SuperSEO } from "react-super-seo";
import { FiSend } from "react-icons/fi";
import mixpanel from "mixpanel-browser";
import { host } from "../../../../config/config";
import { useCookies } from "react-cookie";

const OTPVerificationModel = ({ onClose }) => {
  const [cookies, setCookie] = useCookies();
  const [formData, setFormData] = useState({
    otp: "",
  });

  const verfiyOTP = async () => {
    if (formData?.otp?.length !== 6) {
      toast.info("Enter a proper code", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      let code = cookies?.ccoondfe;
      if (!code) {
        toast.error("OTP was valid for 2 minute, Please retry again", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        if (parseInt(formData?.otp) === parseInt(parseInt(code) / 562002)) {
          onClose(true);
        } else {
          toast.error("Invalid OTP!!!. Try again!!!", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      }
    }
  };

  return (
    <div className="outside_wrapper_earning">
      <div className="otp_main_container_earning">
        <h2>Enter the Verification Code</h2>

        <section>
          <input
            type="number"
            name="otp"
            placeholder="OTP"
            value={formData?.otp}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
            }}
          />
        </section>

        <button onClick={verfiyOTP}>Verify OTP</button>
      </div>
    </div>
  );
};

const EditProfile = (props) => {
  const {
    allCreatorInfo,
    getAllCreatorInfo,
    basicNav,
    setCreatorInfo,
    generateInviteCode,
    getTellUsMoreFormData,
  } = useContext(creatorContext);
  const { Uploadfile } = useContext(ServiceContext);
  const [showPopup, setshowPopup] = useState(false); // success popup
  const [cookies, setCookie] = useCookies();

  const [data, setdata] = useState({
    name: "",
    tagLine: "",
    linkedInLink: "",
    ytLink: "",
    instaLink: "",
    fbLink: "",
    teleLink: "",
    twitterLink: "",
    dob: "",
    topmateLink: "",
    profile: "",
    verifiedNumber:false
  });
  const [phone, setPhone] = useState(0);
  const [Content, setContent] = useState();
  const [previewSourceOne, setPreviewSourceOne] = useState(""); // saves the data of file selected in the form
  //Image preview and resize opening model
  const [openimagePreview, setImagePreview] = useState(false);
  const [imagetocrop, setImageToCrop] = useState(null);
  const [openOTPModal, setOpenOTPModal] = useState(false);

  const data1 = new FormData();
  data1.append("file", previewSourceOne);

  useEffect(() => {
    getAllCreatorInfo()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setdata({
      ...data,
      ...allCreatorInfo,
    });

    if (!allCreatorInfo?.name) {
      setdata({
        ...data,
        name: basicNav?.name,
      });
    }

    if(!allCreatorInfo?.phone){
      getTellUsMoreFormData().then((e) => {
        if (e?.success) {
          setPhone(e?.form?.contactNumber);
        }
      });
    }

    setContent(allCreatorInfo?.aboutMe);
    setPhone(allCreatorInfo?.phone);
    // eslint-disable-next-line
  }, [allCreatorInfo]);

  const [openLoading, setOpenLoading] = useState(false);

  // Change in values of input tags
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const changephone = (e) => {
    setdata({...data,verifiedNumber:false})
    setPhone(e.target.value);
  };

  const sendOTP = async (number) => {
    if (number.toString().length === 10) {
      const response = await fetch(
        `${host}/api/email/sendMsg?message=Mobile Number&number=${number}&subject=Anchors`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      const json = await response.json();
      if (json.MessageID) {
        toast.success("OTP sent successfully", {
          autoClose: 2000,
        });

        let otpcode = parseInt(json.code - 145626) * 562002;
        setCookie("ccoondfe", otpcode, { maxAge: 120 }); // valid for one minute

        setOpenOTPModal(true)
      }
    } else {
      toast.error("Enter a proper mobile number", {
        position: "top-center",
        autoClose: 2000,
      });
    }
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
    sample_number = sample_number?.toString()?.length;

    if (data?.name && data?.tagLine && data?.dob && sample_number === 10) {

      if(data?.verifiedNumber){

        var profile = previewSourceOne && (await Uploadfile(data1));
        const newData = {
          ...data,
          aboutMe: Content,
          profile: previewSourceOne
          ? profile?.url
          : data?.profile
          ? data?.profile
          : basicNav?.photo,
          phone: phone,
        };
        const success = setCreatorInfo(newData);
        if (success) {
          //toast.success("Changes Saved Successfully ", {
            //  position: "top-center",
            //  autoClose: 2000,
            //});
            setTimeout(async () => {
              await generateInviteCode(); // generates invite code it not exists otherwise
            }, 1500);
            setOpenLoading(false);
            setshowPopup(true);
          } else {
            setOpenLoading(false);
            toast.error("Changes Not Saved ", {
              position: "top-center",
              autoClose: 2000,
            });
          }
        }
        else{
          setOpenLoading(false);
          toast.info("Verify the contact number", {
            position: "top-center",
            autoClose: 1500,
          });
        }
        } else {
          setOpenLoading(false);
          toast.info("Fill all the details properly", {
            position: "top-center",
            autoClose: 1500,
          });
        }

    props.progress(100);
  };

  return (
    <>

    {/* OTP Verification Modal --------- */}
      {openOTPModal && <OTPVerificationModel onClose={(e)=>{setdata({...data,verifiedNumber:e});setOpenOTPModal(false)}} />}

      {/* Succes Modal */}
      {showPopup && <SuccessService type="Profile Information" />}
      <ToastContainer />
      {openLoading && <LoadTwo open={openLoading} />}
      <div className="personalinfo_wrap">
        <div className="personalinfo_top">
          <h1>Personal Information </h1>
          <span>Update your personal information here</span>
        </div>
        <div className="personalinfo_photosection">
          <span>
            Profile Picture <span style={{ color: "red" }}>*</span>{" "}
          </span>
          <div className="personalinfo_photocontainer">
            <div className="personalinfo_photo">
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
                  currentTarget.src = require("../../../../Utils/Images/default_user.png");
                }}
              />
            </div>
            <div className="personalinfo_upload">
              <button
                className="personalinfo_buttonupload"
                onClick={() => importData()}
              >
                Upload Image
              </button>
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
          <div className="perosnalinfo_leftform">
            <TextField1
              label="Full Name"
              name="name"
              id="name"
              required={true}
              value={data?.name !== "" ? data.name : basicNav?.name}
              placeholder="Enter Name Here"
              onChange={handleChange}
            />
            <TextField1
              label="Tagline"
              name="tagLine"
              id="tagLine"
              required={true}
              value={data.tagLine}
              placeholder="Ex Product Manager"
              onChange={handleChange}
            />
          </div>
          <div className="perosnalinfo_rightform">
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                width: "100%",
                gap: "20px",
              }}
            >
              <TextField1
                label="Contact Number"
                name="phone"
                id="phone"
                required={true}
                value={phone}
                type="number"
                verifiedComp={data?.verifiedNumber}
                onChange={changephone}
              />

              <button
                className="personalinfo_buttonupload"
                onClick={() => sendOTP(phone)}
                style={{height:"41px"}}
                disabled={data?.verifiedNumber}
              >
                {data?.verifiedNumber ? "Verified" : "Verify"}
              </button>
            </div>

            <TextField1
              label="Date Of Birth"
              name="dob"
              id="dob"
              required={true}
              type="Date"
              value={data?.dob?.slice(0, 10)}
              placeholder="dd/mm/yyyy"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="personalinfo_aboutme">
          <Editor1
            name="about"
            label="About Me"
            placeholder="Please describe yourself"
            Content={Content}
            setContent={(e) => setContent(e)}
          />
        </div>
        <div className="personalinfo_linebreak"></div>
        <div className="personalinfo_socialwrap">
          <h2>Update your social media links </h2>
          <div className="personalinfo_sociallinks">
            <span className="personalinfo_linkname">Linkedin Link</span>
            <SocialFields
              placeholder="https://www.linkedin.com/in/username"
              value={data?.linkedInLink}
              name="linkedInLink"
              id="linkedIn"
              onChange={handleChange}
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
                  fill="black"
                />
              </svg>
            ) : (
              ""
            )}
          </div>
          <div className="personalinfo_sociallinks">
            <span className="personalinfo_linkname"> Instagram Link</span>
            <SocialFields
              placeholder="https://www.instagram.com/username"
              value={data?.instaLink}
              name="instaLink"
              id="instagram"
              onChange={handleChange}
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
                  fill="black"
                />
              </svg>
            ) : (
              ""
            )}
          </div>
          <div className="personalinfo_sociallinks">
            <span className="personalinfo_linkname"> Telegram Link</span>
            <SocialFields
              placeholder="https://t.me/username"
              value={data?.teleLink}
              name="teleLink"
              id="teleLink"
              onChange={handleChange}
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
                  fill="black"
                />
              </svg>
            ) : (
              ""
            )}
          </div>
          <div className="personalinfo_sociallinks">
            <span className="personalinfo_linkname"> Youtube Link</span>
            <SocialFields
              placeholder="https://www.youtube.com/@channelname"
              value={data?.ytLink}
              name="ytLink"
              id="ytLink"
              onChange={handleChange}
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
                  fill="black"
                />
              </svg>
            ) : (
              ""
            )}
          </div>
          <div className="personalinfo_sociallinks">
            <span className="personalinfo_linkname"> TopMate Link</span>
            <SocialFields
              placeholder="https://topmate.io/username"
              value={data?.topmateLink}
              name="topmateLink"
              id="topmateLink"
              onChange={handleChange}
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
                  fill="black"
                />
              </svg>
            ) : (
              ""
            )}
          </div>
          <div className="personalinfo_sociallinks">
            <span className="personalinfo_linkname"> Twitter Link</span>
            <SocialFields
              placeholder="https://twitter.com/username"
              value={data?.twitterLink}
              name="twitterLink"
              id="twitterLink"
              onChange={handleChange}
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
                  fill="black"
                />
              </svg>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="personalinfo_savebutton">
          <button onClick={onSubmit}>Save & Update</button>
        </div>
      </div>
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
      <SuperSEO title="Anchors - Edit Profile" />
    </>
  );
};

export default EditProfile;
