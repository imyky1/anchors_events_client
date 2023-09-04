import React, { useState, useRef, useContext, useEffect } from "react";
import Cropper from "react-easy-crop";
import { useNavigate, useParams } from "react-router-dom";
import { SuperSEO } from "react-super-seo";
import { LoadTwo } from "../../../Modals/Loading";
import { Button, Modal, Slider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Dropdown1,
  Editor1,
  RadioField1,
  Tags1,
  TextField1,
  UploadField1,
  UploadField2,
} from "../Create Services/InputComponents/fields_Labels";
import getCroppedImg, { generateDownload } from "../../../helper/imageresize";
import "./EditService.css";
import { Button1 } from "../Create Services/InputComponents/buttons";
import ServiceContext from "../../../../Context/services/serviceContext";
import { toast } from "react-toastify";
import { FiSend } from "react-icons/fi";
import { creatorContext } from "../../../../Context/CreatorState";
import { BsPlus } from "react-icons/bs";

function EditEvent({
  progress,
  openDefaultBanner,
  setDefaultBannerData,
  cname,
  FinalDefaultBannerFormData,
}) {
  const navigate = useNavigate();
  const { slug, servicetype } = useParams();

  // Contexts -----------------
  const {
    geteventinfo,
    compareJWT,
    eventInfo,
    UploadDocuments,
    Uploadfile,
    updateService,
  } = useContext(ServiceContext);

  const { allCreatorInfo } = useContext(creatorContext);

  //   States used in the page

  const [paid, setpaid] = useState(); // decides the form acc to paid or free service type
  const [openLoading, setOpenLoading] = useState(false); // controlls the loader
  const [multipleSpeakers, setMultipleSpeakers] = useState(false); // tells if the evnt page has the multiple speaker option
  const [speakersArray, setSpeakersArray] = useState([{}]);
  const [isSpeakerSelected, setIsSpeakerSelected] = useState(false);
  const [speakersImagesArray, setSpeakersImagesArray] = useState([]); // stores images of the speaker ------------

  const [data, setdata] = useState({
    sname: "",
    sdesc: "",
    smrp: 0,
    ssp: 0,
    simg: "",
    benefits: "",
    stype: "Online",
    meetlink: "", // or venue in case of offline
    date: "",
    startTime: "",
    endTime: "",
  });

  const [Tags, setTags] = useState([]);
  const [Content, setContent] = useState();
  const [BannerImage, setBannerImage] = useState();

  // state for image cropping
  const [imagetocrop, setImageToCrop] = useState(null);
  const [openimagePreview, setImagePreview] = useState(false);

  // allow preview variables
  const [allowDownload, setAllowDownload] = useState(false);
  const [ServiceDoc, setServiceDoc] = useState();
  const [seatCapacity, setSeatCapacity] = useState("");
  const [EventVideo, setEventVideo] = useState();

  // default banner
  const [defaultbanner, setDefaultBanner] = useState(false);

  // form data for uploads -----
  const data1 = new FormData();
  const data2 = new FormData();
  data1.append("file", BannerImage);
  data2.append("file", ServiceDoc);

  // Image cropping
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

  const savecroppedImage = async () => {
    const img = await getCroppedImg(
      imagetocrop,
      croppedArea,
      BannerImage?.name
    );
    setBannerImage(img);
    setImagePreview(false);
  };

  const handleSpeaker = (value) => {
    setIsSpeakerSelected(!isSpeakerSelected);
    if (value) {
      let newArray = speakersArray;
      newArray[0] = {
        name: allCreatorInfo?.name,
        designation: allCreatorInfo?.tagLine,
        profile: allCreatorInfo?.profile,
        isCreator: true,
      };
      setSpeakersArray(newArray);
    } else {
      if (speakersArray.length === 1) {
        setSpeakersArray([{}]);
      } else {
        setSpeakersArray(speakersArray.slice(1));
      }
    }
  };

  const handleChangeSpeakerImage = (e, index) => {
    const file = e.target.files[0];
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setCroppedArea(null);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        let newArray = imagetocrop;
        newArray[index + 1] = reader.result;
        setImageToCrop(newArray);
      });
      let newArray = speakersImagesArray;
      newArray[index] = file;
      setSpeakersImagesArray(newArray);
    }
  };

  const handleSpeakerChange = (value, index, field) => {
    let newArray = speakersArray;
    newArray[index] = { ...speakersArray[index], [field]: value };
    setSpeakersArray(newArray);
  };

  // Add new Speaker
  const handleAddSpeaker = () => {
    setSpeakersArray((prevSpeakers) => [...prevSpeakers, {}]);
  };

  const handleRemoveSpeaker = (index) => {
    let finalArr = speakersArray
      .slice(0, index)
      .concat(speakersArray.slice(index + 1));

    setSpeakersArray(finalArr);
  };

  // changes handling in input field ---------------------------------
  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  //   handles the image saving component
  const handleChangeFileBanner = (e) => {
    if (defaultbanner) {
      setDefaultBanner(false);
    }
    const file = e.target.files[0];
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setCroppedArea(null);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImageToCrop(reader.result);
      });
      setBannerImage(file);
    }
  };

  //Edit control of default banner button ------------
  const EditOptionDefaultBanner = () => {
    setDefaultBannerData({
      sname: data?.sname,
      cname: cname,
      type: servicetype,
    });
    openDefaultBanner();
  };

  // On submit func-----------------
  // const onSubmit = async (e) => {
  //   progress(0);
  //   setOpenLoading(true);
  //   e?.preventDefault();
  //   if (data.sname.length > 3 && Content.length > 10) {
  //     try {
  //       var banner;
  //       if (BannerImage || defaultbanner) {
  //         // to check if the creator has uploaded banner image o upload
  //         if (defaultbanner) {
  //           if (FinalDefaultBannerFormData instanceof FormData) {
  //             banner = await Uploadfile(FinalDefaultBannerFormData);
  //           } else {
  //             toast.info(
  //               `Save the default banner design from the Edit Option`,
  //               {
  //                 position: "top-center",
  //                 autoClose: 2500,
  //               }
  //             );
  //             setOpenLoading(false);
  //             return null;
  //           }
  //         } else {
  //           banner = await Uploadfile(data1); /// uplaoding banner and files on s3
  //         }
  //       } else {
  //         banner = { url: eventInfo?.event?.simg };
  //       }
  //       if (ServiceDoc) {
  //         /// to check if the creator want soto to change the document or not
  //         var docs = await UploadDocuments(data2);
  //       } else {
  //         docs = { result: { Location: eventInfo?.event?.surl } };
  //       }
  //       const newData = {
  //         ...data,
  //         ldesc: Content,
  //         Tags,
  //         simg: banner?.url,
  //         surl: docs?.result?.Location,
  //         isPaid: paid === "Free" ? false : true,
  //         smrp: paid === "Free" ? 0 : data.smrp,
  //         ssp: paid === "Free" ? 0 : data.ssp,
  //         allowDownload,
  //         status: 1,
  //       };
  //       updateService(eventInfo?.event?._id, newData).then((e) => {
  //         if (e?.success) {
  //           toast.success("Service Edited Succesfully", {
  //             position: "top-center",
  //             autoClose: 1500,
  //           });
  //           setTimeout(() => {
  //             navigate("/dashboard/mycontents");
  //           }, 1500);
  //         } else {
  //           toast.error("Some error occured", {
  //             position: "top-center",
  //             autoClose: 3000,
  //           });
  //         }
  //       });
  //     } catch (error) {
  //       setOpenLoading(false);
  //       toast.error(`Server side error please try after some time`, {
  //         position: "top-center",
  //         autoClose: 2000,
  //       });
  //     }
  //   } else {
  //     setOpenLoading(false);
  //     toast.info("Fill all the required fileds", {
  //       position: "top-center",
  //       autoClose: 3000,
  //     });
  //   }
  //   setOpenLoading(false);
  //   progress(100);
  // };

  // useffect get details of the service from slug -------------------------------------------

  useEffect(() => {
    setOpenLoading(true);
    geteventinfo(slug).then((e) => {
      compareJWT(e[0]?._id).then((e2) => {
        // setcheck(e2);
        setOpenLoading(false);
      });
    });
  }, []);

  useEffect(() => {
    setdata({
      sname: eventInfo?.event?.sname,
      benefits: eventInfo?.event?.benefits,
      stype: eventInfo?.event?.stype === 1 ? "Online" : "Offline",
      endTime: eventInfo?.event?.time?.endTime,
      startTime: eventInfo?.event?.time?.startTime,
      date: eventInfo?.event?.startDate,
      smrp: eventInfo?.event?.smrp,
      ssp: eventInfo?.event?.ssp,
      meetlink: eventInfo?.event?.meetlink,
      simg:eventInfo?.event?.simg,
    });
    
    setSeatCapacity(eventInfo?.event?.maxCapacity === "Unlimited" ? "Unlimited" : eventInfo?.event?.maxCapacity)
    setTags(eventInfo?.event?.tags);
    setContent(eventInfo?.event?.ldesc);

    if(eventInfo?.event?.speakerDetails?.length > 0){
      setMultipleSpeakers(true)
      // setSpeakersArray(...eventInfo?.event?.speakerDetails)
    }

    if (eventInfo?.event?.isPaid) {
      setpaid("Paid");
    } else {
      setpaid("Free");
    }
  }, [geteventinfo]);

  return (
    <>
      {openLoading && <LoadTwo open={openLoading} />}

      {/* {showPopup && <SuccessService type={servicetype} link={data.CopyURL} />} */}
      <div className="main_create_container">
        {/* Heading of the create section ------------------------ */}
        <section className="heading_create_box">
          <div>
            <h1 className="create_text_01">What is your Event about?</h1>
            <p className="create_text_02">
              You can create events and workshops
            </p>
          </div>
          <button
            onClick={() => {
              window.open(
                "https://www.anchors.in/e/how-to-become-a-product-manager"
              );
            }}
          >
            <FiSend /> Preview Sample Page
          </button>
        </section>

        {/* form section of create container ---------------------------------------- */}
        <section className="create_form_box">
          <div className="main_box_1_create_form">
            <div className="left_section_form">
              <TextField1
                label="Title of Event"
                name="sname"
                id="sname"
                required={true}
                value={data?.sname}
                placeholder="Enter Title Here"
                onChange={handleChange}
              />
              {paid === "Paid" && (
                <TextField1
                  label="Set Maximum Price"
                  placeholder="Max 500"
                  name="smrp"
                  id="smrp"
                  value={data?.smrp}
                  type="number"
                  required={true}
                  onChange={handleChange}
                />
              )}
              <UploadField2
                label="Upload Banner Image"
                id="asdas"
                info="File Size Limit 15 MB Formats - jpg,png"
                FileType=".jpg,.png,.jpeg"
                onChange={setBannerImage}
                onChangeFunction={handleChangeFileBanner}
              />
              {BannerImage || defaultbanner ? (
                <>
                  {" "}
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (defaultbanner) {
                        EditOptionDefaultBanner();
                      } else {
                        setZoom(1);
                        setCrop({ x: 0, y: 0 });
                        setCroppedArea(null);
                        setImagePreview({ value: true, indexToCrop: 0 });
                      }
                    }}
                    className="imageresizeopenerbutton"
                  >
                    {defaultbanner
                      ? "Edit default Banner"
                      : "Preview Image and Resize"}
                  </Button>
                  <br />
                </>
              ) : (
                ""
              )}
            </div>
            <div className="right_section_form">
              <Dropdown1
                label="Is it paid/free?"
                placeholder="Choose a service type"
                value={["Free", "Paid"]}
                required={true}
                defaultValue = {paid}
                selectedValue={(e) => {
                  setpaid(e);
                }}
              />
              {paid === "Paid" && (
                <TextField1
                  label="Selling Price "
                  placeholder="Min 99"
                  name="ssp"
                  id="ssp"
                  value={data?.ssp}
                  type="number"
                  required={true}
                  onChange={handleChange}
                />
              )}
              <UploadField1
                label={`Upload your Preview Video`}
                id="asd1515"
                onChange={setEventVideo}
                info="File Size Limit 500 MB Formats -Avi,mp4"
                FileType=".mp4,.avi,.mov"
              />
            </div>
          </div>

          {isSpeakerSelected && (
            <div className="map_speaker_details_field">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "40px",
                  marginBottom: "30px",
                }}
              >
                <div className="map_speaker_details_field_inside">
                  <div className="map_speaker_details_field_inside_frame">
                    <div className="create_text_04">Speaker Details</div>
                    <TextField1
                      label="Name"
                      name="name"
                      id="name"
                      placeholder="Enter name"
                      value={allCreatorInfo?.name}
                    />

                    <UploadField2
                      label="Profile Image"
                      id={`speakerImage0`}
                      info={
                        isSpeakerSelected
                          ? "Profile Image Selected"
                          : "File Size Limit 15 MB Formats - jpg,png"
                      }
                      FileType=".jpg,.png,.jpeg"
                      onChangeFunction={(e) => handleChangeSpeakerImage(e, 0)}
                    />

                    {speakersImagesArray[0] && (
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setZoom(1);
                          setCrop({ x: 0, y: 0 });
                          setCroppedArea(null);
                          setImagePreview({
                            value: true,
                            indexToCrop: 1,
                          });
                        }}
                        className="imageresizeopenerbutton"
                      >
                        Preview Image and Resize
                      </Button>
                    )}
                  </div>
                  <div className="create_speaker_toggle_spacing0">
                    <div className="create_speaker_toggle">
                      I am the speaker
                      <RadioField1
                        onChange={(value) => handleSpeaker(value)}
                        value={isSpeakerSelected}
                      />
                    </div>
                    <TextField1
                      label="Designation"
                      name="designation"
                      id="designation"
                      placeholder="Enter designation"
                      value={allCreatorInfo?.tagLine}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {multipleSpeakers && (
            <div className="map_speaker_details_field">
              {(isSpeakerSelected
                ? speakersArray?.slice(1)
                : speakersArray
              )?.map((speaker, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "40px",
                    marginBottom: "30px",
                  }}
                >
                  <div className="map_speaker_details_field_inside">
                    <div className="map_speaker_details_field_inside_frame">
                      <div className="create_text_04">Speaker Details</div>
                      <TextField1
                        label="Name"
                        name="name"
                        id={`name${isSpeakerSelected ? index + 1 : index}`}
                        placeholder="Enter name"
                        onChange={(e) => {
                          handleSpeakerChange(
                            e.target.value,
                            isSpeakerSelected ? index + 1 : index,
                            e.target.name
                          );
                        }}
                      />

                      <UploadField2
                        label="Profile Image"
                        id={`speakerImage${
                          isSpeakerSelected ? index + 1 : index
                        }`}
                        info="File Size Limit 15 MB Formats - jpg,png"
                        FileType=".jpg,.png,.jpeg"
                        onChangeFunction={(e) =>
                          handleChangeSpeakerImage(
                            e,
                            isSpeakerSelected ? index + 1 : index
                          )
                        }
                      />

                      {speakersImagesArray[
                        isSpeakerSelected ? index + 1 : index
                      ] && (
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setZoom(1);
                            setCrop({ x: 0, y: 0 });
                            setCroppedArea(null);
                            setImagePreview({
                              value: true,
                              indexToCrop: isSpeakerSelected
                                ? index + 2
                                : index + 1,
                            });
                          }}
                          className="imageresizeopenerbutton"
                        >
                          Preview Image and Resize
                        </Button>
                      )}
                    </div>
                    <div className="create_speaker_toggle_spacing0">
                      {index === 0 && !isSpeakerSelected && (
                        <div className="create_speaker_toggle">
                          I am the speaker
                          <RadioField1
                            onChange={(value) => handleSpeaker(value)}
                            value={isSpeakerSelected}
                          />
                        </div>
                      )}
                      <TextField1
                        label="Designation"
                        name="designation"
                        id={`designation${
                          isSpeakerSelected ? index + 1 : index
                        }`}
                        placeholder="Enter designation"
                        onChange={(e) =>
                          handleSpeakerChange(
                            e.target.value,
                            isSpeakerSelected ? index + 1 : index,
                            e.target.name
                          )
                        }
                      />

                      {(index !== 0 || isSpeakerSelected) && (
                        <Button1
                          text="Remove Speaker"
                          onClick={() =>
                            handleRemoveSpeaker(
                              isSpeakerSelected ? index + 1 : index
                            )
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {multipleSpeakers && speakersArray.length < 3 && (
            <div className="create_text_04" onClick={handleAddSpeaker}>
              Add Speaker
              <BsPlus
                style={{
                  marginBottom: "-3px",
                  fontSize: "17px",
                  marginLeft: "-1px",
                  fontWeight: "bolder",
                  cursor: "pointer",
                }}
              />{" "}
            </div>
          )}

          <div className="main_box_1_create_form1">
            <div className="left_section_form">
              <Dropdown1
                label="Is it Online/Offline?"
                placeholder="Choose the mode of event"
                value={["Online", "Offline"]}
                required={true}
                defaultValue={data?.stype}
                selectedValue={(e) => {
                  setdata({ ...data, stype: e });
                }}
              />

              <TextField1
                label="Event Date"
                name="date"
                type="date"
                id="date"
                required={true}
                value={data?.date}
                placeholder="Enter Title Here"
                onChange={handleChange}
              />

              <Editor1
                label={`Benefits of leaderboard`}
                placeholder={`Caption your Event`}
                info="A brief description gives your audience some context"
                Content={data?.benefits}
                required={true}
                setContent={(e) => setdata({ ...data, benefits: e })}
              />

              <Editor1
                label={`Describe your Event`}
                placeholder={`Caption your Event`}
                info="A brief description gives your audience some context"
                Content={Content}
                required={true}
                setContent={(e) => setContent(e)}
              />
            </div>
            <div className="right_section_form">
              <TextField1
                label={data.stype === "Offline" ? "Venue" : "Meet Link"}
                name="meetlink"
                id="meetlink"
                value={data?.meetlink}
                required={true}
                placeholder="Enter Title Here"
                onChange={handleChange}
              />

              <section
                style={{
                  width: "100%",
                  gap: "10px",
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                  marginBottom: "32px",
                }}
              >
                <TextField1
                  label="Event Start Time"
                  name="startTime"
                  type="time"
                  id="startTime"
                  required={true}
                  value={data?.startTime}
                  placeholder="Enter Title Here"
                  onChange={handleChange}
                />
                <TextField1
                  label="Event End Time"
                  name="endTime"
                  type="time"
                  id="endTime"
                  required={true}
                  value={data?.endTime}
                  placeholder="Enter Title Here"
                  onChange={handleChange}
                />
              </section>

              <Tags1
                label="Add Relevant Tags"
                placeholder="Press Enter to add tags"
                info="This will help in easy search and recommendation"
                tags={Tags}
                setTags={setTags}
              />

              <Dropdown1
                label="Max Capacity?"
                placeholder="Choose the capacity of the event"
                value={["Unlimited", "Enter Manually"]}
                required={true}
                defaultValue="Unlimited"
                selectedValue={(e) => {
                  setSeatCapacity(e);
                }}
              />

              {seatCapacity === "Enter Manually" && (
                <TextField1
                  label="No of Seats"
                  type="number"
                  placeholder="Enter the number of seats in the event"
                  onChange={(e) =>
                    setdata({ ...data, noOfSeats: e.target.value })
                  }
                />
              )}
            </div>
          </div>
        </section>

        <section className="buttons_form">
          <Button1 text="Save and Publish" />
        </section>
      </div>
      {openimagePreview?.value ? (
        <Modal
          open={openimagePreview?.value}
          onClose={() => setImagePreview({ value: false, indexToCrop: null })}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="ultimatewrapper_imageprev">
            <div className="container_imageresize">
              <div className="container-cropper">
                <>
                  <div className="cropper">
                    <Cropper
                      image={imagetocrop[openimagePreview?.indexToCrop]}
                      crop={crop}
                      zoom={zoom}
                      aspect={
                        openimagePreview?.indexToCrop === 0 ? 3 / 1 : 1 / 1
                      }
                      cropShape={
                        openimagePreview?.indexToCrop === 0 ? "rect" : "round"
                      }
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
                  <button onClick={savecroppedImage}>Save</button>
                  <button
                    onClick={() =>
                      setImagePreview({ value: false, indexToCrop: null })
                    }
                  >
                    Cancel
                  </button>
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
      <SuperSEO title="Anchors - Edit Service" />
    </>
  );
}

export default EditEvent;
