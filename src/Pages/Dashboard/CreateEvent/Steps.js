import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Steps.css";

import {
  Button1,
  Button3,
  Button4,
  Button5,
} from "../../../Components/Editor/New UI/Create Services/InputComponents/buttons";
import {
  Editor1,
  TextField1,
  RadioField1,
  UploadField3,
  DatePicker1,
  Select2,
} from "../../../Components/Editor/New UI/Create Services/InputComponents/fields_Labels";

import {
  AiFillEye,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Cropper from "react-easy-crop";
import { Modal, Slider } from "@mui/material";
import getCroppedImg from "../../../Components/helper/imageresize";

import { StaticSampleDataModal } from "../../../Components/Modals/ServiceSuccess/Modal";
import { PersonalizedInviteeCard } from "../../../Components/Modals/Default Banner/DefaultBanner";
import { FaPlus } from "react-icons/fa";
import mixpanel from "mixpanel-browser";

const timeToHours = (time) => {
  return parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]);
};

const AddSpeakerCard = ({
  index,
  handleRemoveSpeaker,
  handleSpeakerChange,
  isSpeaker,
  speakersArray,
  notRemove,
  handleChangeSpeakerImage,
  setZoom,
  setCrop,
  setCroppedArea,
  setImagePreview,
  showCropButton,
}) => {
  return (
    <div className="add_speaker_card_create_event_01">
      <section>
        <p>
          {index === 1 ? "1st" : index === 2 ? "2nd" : "3rd"} Speaker Details
        </p>
        {!notRemove && (
          <span onClick={() => handleRemoveSpeaker(index - 1)}>
            Remove Speaker
          </span>
        )}
      </section>

      <div>
        <TextField1
          label="Name"
          name="name"
          value={speakersArray[index - 1]?.name}
          id={`name${index - 1}`}
          placeholder="Enter display name"
          onChange={(e) => {
            handleSpeakerChange(e.target.value, index - 1, e.target.name);
          }}
        />

        <TextField1
          label="Tagline"
          name="designation"
          value={speakersArray[index - 1]?.designation}
          id={`designation${index - 1}`}
          placeholder="Add a tagline"
          onChange={(e) =>
            handleSpeakerChange(e.target.value, index - 1, e.target.name)
          }
        />

        <TextField1
          name="linkedinLink"
          placeholder="Enter Linkedin Link"
          value={speakersArray[index - 1]?.linkedinLink}
          id={`linkedin${index - 1}`}
          onChange={(e) =>
            handleSpeakerChange(e.target.value, index - 1, e.target.name)
          }
        />
        <TextField1
          name="otherLink"
          placeholder="Enter Other Link"
          value={speakersArray[index - 1]?.otherLink}
          id={`other${index - 1}`}
          onChange={(e) =>
            handleSpeakerChange(e.target.value, index - 1, e.target.name)
          }
        />

        <UploadField3
          label="Profile Picture"
          id={`speakerImage${isSpeaker ? index : index - 1}`}
          info="File size limit - 15MB, Formats - jpg, jpeg, png"
          FileType=".jpg,.png,.jpeg"
          onChange={() => {
            return null;
          }}
          onChangeFunction={(e) => handleChangeSpeakerImage(e, index - 1)}
        />

        {showCropButton && (
          <Button1
            onClick={() => {
              setZoom(1);
              setCrop({ x: 0, y: 0 });
              setCroppedArea(null);
              setImagePreview({
                value: true,
                indexToCrop: index - 1,
              });
            }}
            text = "Preview Profile and Resize"
          />
        )}
      </div>
    </div>
  );
};

export const FirstPage = ({
  data,
  paid,
  setpaid,
  setCurrentPage,
  setdata,
  setScrollPreviewSection,
}) => {
  const [openSampleContent, setOpenSampleContent] = useState(false);

  const handleChange = (e) => {
    setdata({ ...data, [e?.target?.name]: e?.target?.value });

    if (e.target.name !== "sname") {
      setScrollPreviewSection("details");
    } else {
      setScrollPreviewSection(null);
    }
  };

  const handleSubmitFormOne = () => {
    // warnings and the alerts -----------------

    if (data.sname.length < 1) {
      toast.info("Provide a title for your event.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (!data?.date || !data?.startTime || !data?.endTime) {
      toast.info("Choose a date and time for your event.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (timeToHours(data?.endTime) <= timeToHours(data?.startTime)) {
      toast.info("Timings are invalid for your event.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (
      parseInt(data?.ssp) > parseInt(data?.smrp) ||
      parseInt(data?.smrp) < 0 ||
      parseInt(data?.ssp) < 0 ||
      (parseInt(data?.smrp) === 0 && paid !== "Free")
    ) {
      toast.info("Pricing is invalid for your event.", {
        position: "top-center",
        autoClose: 1500,
      });
    } else if (data?.stype === "Online" && !data?.meetlink) {
      toast.info("Add an online meeting link for your event.", {
        position: "top-center",
        autoClose: 2500,
      });
    } else if (data?.stype === "Offline" && !data?.meetlink) {
      toast.info("Add an address for your offline event.", {
        position: "top-center",
        autoClose: 2500,
      });
    } else if (
      !data?.eventSeatCapacity ||
      parseInt(data?.eventSeatCapacity) <= 0
    ) {
      toast.info("Specify the number of seats in your event.", {
        position: "top-center",
        autoClose: 2500,
      });
    } else {
      // save the data and then proceed ---------
      setCurrentPage(2);
    }
  };

  return (
    <>
      {openSampleContent && (
        <StaticSampleDataModal
          type="pdfTitle"
          onClose={() => {
            setOpenSampleContent(false);
          }}
        />
      )}

      <section className="create_form_box_create_event01">
        {/* left side---------------------------------------------------------------------------- */}
        <div
          className="left_section_form_create_event01"
          style={{ width: "100%" }}
        >
          <Select2
            value={["Paid", "Free"]}
            selectedValue={(e) => {
              setpaid(e);
              setdata({ ...data, ssp: 0, smrp: 0 });
            }}
            defaultValue={paid}
          />

          <TextField1
            label="Event Title"
            name="sname"
            id="sname"
            required={true}
            value={data?.sname}
            placeholder="Keep it catchy"
            onChange={handleChange}
            maxLength={65}
            labelHelperText={{
              text: (
                <>
                  (Sample) <AiFillEye size={16} />{" "}
                </>
              ),
              action: () => {
                setOpenSampleContent(true);
              },
            }}
          />

          <DatePicker1
            label="Date of Event"
            name="date"
            type="date"
            id="date"
            required={true}
            value={data?.date}
            autoComplete = "off"
            placeholder="Select Event Date"
            onChange={(date) => {
              setScrollPreviewSection("details");
              setdata({ ...data, date: date });
            }}
          />

          <section
            style={{
              width: "100%",
              gap: "10px",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              marginBottom: "20px",
            }}
          >
            <TextField1
              label="Start Time"
              name="startTime"
              type="time"
              id="startTime"
              required={true}
              value={data?.startTime}
              placeholder="Enter Title Here"
              onChange={handleChange}
            />
            <TextField1
              label="End Time"
              name="endTime"
              type="time"
              id="endTime"
              required={true}
              value={data?.endTime}
              placeholder="Enter Title Here"
              onChange={handleChange}
            />
          </section>

          <Select2
            label="Event Mode"
            required={true}
            value={["Online", "Offline"]}
            selectedValue={(e) => {
              setScrollPreviewSection("details");
              setdata({ ...data, stype: e });
            }}
            defaultValue={data?.stype}
          />

          {paid === "Paid" && (
            <section
              style={{
                width: "100%",
                gap: "25px",
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                marginBottom: "20px",
              }}
            >
              <TextField1
                label="Set Maximum Price"
                placeholder="Max 500"
                name="smrp"
                id="smrp"
                value={data?.smrp}
                autoComplete = "off"
                required={true}
                onChange={handleChange}
              />

              <TextField1
                label="Discounted Price"
                placeholder="Min 99"
                name="ssp"
                id="ssp"
                required={true}
                autoComplete = "off"
                value={data?.ssp}
                onChange={handleChange}
              />
            </section>
          )}

          <section
            style={{
              width: "100%",
              gap: "25px",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              marginBottom: "20px",
            }}
          >
            <TextField1
              label={
                data?.stype === "Offline" ? "Enter Venue Address" : "Meet Link"
              }
              name="meetlink"
              id="meetlink"
              required={true}
              value={data?.meetlink}
              autoComplete = "off"
              placeholder={
                data?.stype === "Offline"
                  ? "Enter Venue Details"
                  : "Add Video Conferencing Link"
              }
              onChange={handleChange}
            />
            <TextField1
              label="No of Seats"
              required={true}
              type="text"
              id="eventSeatCapacity"
              autoComplete = "off"
              name="eventSeatCapacity"
              value={data?.eventSeatCapacity}
              placeholder="Enter Maximum Capacity"
              onChange={handleChange}
            />
          </section>
        </div>
      </section>

      <section className="buttons_form_create_event01">
        <Button4
          text="Save & Next"
          icon={<AiOutlineArrowRight />}
          onClick={handleSubmitFormOne}
        />
      </section>
    </>
  );
};

export const SecondPage = ({
  data,
  setCurrentPage,
  setScrollPreviewSection,
  creatorData,
  speakersArray,
  speakersImagesArray,
  setSpeakersImagesArray,
  setSpeakersArray,
  isSpeaker,
  setIsSpeaker,
  setOpenBanner
}) => {
  // state for image cropping
  const [imagetocrop, setImageToCrop] = useState([]); // sepaker's profile image
  const [openimagePreview, setImagePreview] = useState({
    value: false,
    indexToCrop: null,
  });

  const [crop, setCrop] = useState({ x: 0, y: 0 }); // Array of values ------------------
  const [zoom, setZoom] = useState(1); // Array of values ------------------
  const [croppedArea, setCroppedArea] = useState(null); // Array of values ------------------
  const [openInviteeCard, setopenInviteeCard] = useState(false);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const savecroppedImage = async () => {
    const img = await getCroppedImg(
      imagetocrop[openimagePreview?.indexToCrop],
      croppedArea,
      speakersImagesArray[openimagePreview?.indexToCrop]?.name
    );

    setSpeakersImagesArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[openimagePreview?.indexToCrop] = img;
      return newArray;
    });

    setImagePreview({ value: false, indexToCrop: null });
  };

  // Add new Speaker
  const handleAddSpeaker = () => {
    setSpeakersArray((prevSpeakers) => [...prevSpeakers, {}]);
  };

  const handleCreatorAsSpeaker = (e) => {
    setIsSpeaker(e === "Yes" ? true : false);
    setScrollPreviewSection("speakers");

    // value: true,,,   speaker array 0 position
    if (e === "Yes") {
      let newArr = speakersArray;
      let newArr2 = speakersImagesArray;
      if (newArr.length > 2) {
        newArr.pop();
      }
      if (newArr2.length > 2) {
        newArr2.pop();
      }

      let finalArr = [];
      let finalArr2 = [];

      finalArr[0] = {
        name: creatorData?.name,
        designation: creatorData?.tagLine,
        profile: creatorData?.profile,
        isCreator: true,
      };

      finalArr2[0] = null;

      for (let index = 0; index < newArr.length; index++) {
        finalArr[index + 1] = newArr[index];
      }

      for (let index = 0; index < newArr2.length; index++) {
        finalArr2[index + 1] = newArr2[index];
      }

      setSpeakersArray(finalArr);
      setSpeakersImagesArray(finalArr2);
    } else {
      setSpeakersArray((prevArray) => {
        let newArr = [...prevArray];
        newArr.splice(0, 1);
        return newArr;
      });

      setSpeakersImagesArray((prevArray) => {
        let newArr = [...prevArray];
        newArr.splice(0, 1);
        return newArr;
      });
    }
  };

  const handleSpeakerChange = (value, index, field) => {
    setScrollPreviewSection("speakers");
    setSpeakersArray((prevSpeakersArray) => {
      const newArray = [...prevSpeakersArray];
      let updatedObj = newArray[index];
      updatedObj[field] = value;
      newArray[index] = updatedObj;
      return newArray;
    });
  };

  const handleChangeSpeakerImage = (e, index) => {
    mixpanel.track(`Browse Speaker Image ${index}`);
    const file = e.target.files[0];
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setCroppedArea(null);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        let newArray = imagetocrop;
        newArray[index] = reader.result;
        setImageToCrop(newArray);
      });
      setSpeakersImagesArray((prevArray) => {
        const newArray = [...prevArray];
        newArray[index] = file;
        return newArray;
      });
    }
  };

  //   let finalArr = speakersArray
  //     .slice(0, index)
  //     .concat(speakersArray.slice(index + 1));

  //   let finalArr2 = speakersImagesArray
  //     .slice(0, index)
  //     .concat(speakersImagesArray.slice(index + 1));

  //   let finalArr3 = imagetocrop
  //     .slice(0, index + 1)
  //     .concat(speakersImagesArray.slice(index + 2));

  //   setSpeakersArray(finalArr);
  //   setSpeakersImagesArray(finalArr2);
  //   setImageToCrop(finalArr3);
  // };

  const handleRemoveSpeaker = (indexToRemove) => {
    if (speakersArray?.length > 1) {
      const updatedSpeakersArray = speakersArray.filter(
        (_, i) => i !== indexToRemove
      );
      setSpeakersArray(updatedSpeakersArray);
    }
  };

  const checkSpeakersData = () => {
    if (speakersArray.length === 0) {
      return false;
    }

    for (let index = 0; index < speakersArray.length; index++) {
      if (Object.keys(speakersArray[index]).length < 2) {
        return false;
      }

      const element = speakersArray[index];

      if (
        !element?.name ||
        !element?.name?.length === 0 ||
        !element?.designation ||
        !element?.designation?.length === 0 ||
        (!speakersImagesArray[index] && (index !== 0 || !isSpeaker))
      ) {
        return false;
      }
    }
    return true;
  };

  const handleSubmitFormTwo = () => {
    // warnings and the alerts -----------------
    let checkSpeakers = checkSpeakersData();
    if (checkSpeakers) {
      // save the data and then proceed ---------
      setCurrentPage(3);
    } else {
      toast.info("Include speaker details, including names and taglines.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <PersonalizedInviteeCard
        open={openInviteeCard}
        onClose={() => {
          setopenInviteeCard(false);
        }}
        data={{
          ...data,
          cname: creatorData?.name,
          cprofile: creatorData?.profile,
        }}
        speakersArray={speakersArray}
        speakersImagesArray={speakersImagesArray}
      />

      <section className="create_form_box_create_event01">
        {/* left side---------------------------------------------------------------------------- */}
        <div className="left_section_form_create_event01">
          <Select2
            value={["Yes", "No"]}
            label="Are you a speaker?"
            required={true}
            selectedValue={(e) => {
              handleCreatorAsSpeaker(e);
            }}
            defaultValue={isSpeaker ? "Yes" : "No"}
          />

          <section className="speaker_section_left_form_create_event01">
            {speakersArray?.map((speaker, i) => {
              return (
                <AddSpeakerCard
                  index={i + 1}
                  handleRemoveSpeaker={handleRemoveSpeaker}
                  key={`speaker${i}`}
                  handleSpeakerChange={handleSpeakerChange}
                  isSpeaker={isSpeaker}
                  speakersArray={speakersArray}
                  setZoom={setZoom}
                  setCrop={setCrop}
                  setCroppedArea={setCroppedArea}
                  setImagePreview={setImagePreview}
                  showCropButton={speakersImagesArray[i] ? true : false}
                  handleChangeSpeakerImage={handleChangeSpeakerImage}
                  notRemove={
                    (isSpeaker && i === 0) ||
                    (speakersArray?.length === 1 && i === 0)
                      ? true
                      : false
                  }
                />
              );
            })}
          </section>

          {speakersArray?.length < 3 && (
            <Button5
              text={`Add ${
                speakersArray?.length + 1 === 2 ? "2nd" : "3rd"
              } Speaker Details`}
              rightIcon={<FaPlus />}
              onClick={handleAddSpeaker}
            />
          )}

          <div className="div_left_form_create_event01">
            <section 
             onClick={() => {
              setOpenBanner(true);
            }}>
              <img
                src="https://anchors-assets.s3.amazonaws.com/1704203264002-Frame_1000002415preview1.png"
                alt=""
              />

              <span>Preview Customized Banner</span>
            </section>
            <section
              onClick={() => {
                setopenInviteeCard(true);
              }}
            >
              <img
                src="https://anchors-assets.s3.amazonaws.com/1704203143378-Frame_1000002415.png"
                alt=""
              />

              <span>Preview Personalized Attendee Card</span>
            </section>
          </div>

          {/* <Select2
            value={["Yes", "No"]}
            label="Do you want to use this banner?"
            required={true}
            selectedValue={(e) => {
              // handleSpeaker(e)
              setdata({ ...data, ssp: 0, smrp: 0 });
            }}
            defaultValue={paid}
          /> */}
        </div>
      </section>

      <section className="buttons_form_create_event01">
        <Button4
          text="Save & Next"
          icon={<AiOutlineArrowRight />}
          onClick={() => {
            handleSubmitFormTwo();
          }}
        />

        <Button3
          text="Previous"
          icon={<AiOutlineArrowLeft />}
          onClick={() => {
            setCurrentPage(1);
          }}
        />
      </section>

      {/* Live preview Section ------------- */}
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
    </>
  );
};

export const ThirdPage = ({
  setBannerImage,
  bannerImage,
  setEventVideo,
  Content,
  setContent,
  setCurrentPage,
  setScrollPreviewSection,
}) => {
  const [openSampleContent, setOpenSampleContent] = useState(false);
  const [defaultbanner, setDefaultBanner] = useState(false); // decides wheter to user checked the default banner-----

  // state for image cropping
  const [imagetocrop, setImageToCrop] = useState(); // sepaker's profile image
  const [openimagePreview, setImagePreview] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 }); // Array of values ------------------
  const [zoom, setZoom] = useState(1); // Array of values ------------------
  const [croppedArea, setCroppedArea] = useState(null); // Array of values ------------------

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const savecroppedImage = async () => {
    const img = await getCroppedImg(
      imagetocrop,
      croppedArea,
      bannerImage?.name
    );

    setBannerImage(img);

    setImagePreview(false);
  };

  const handleSubmitFormThree = () => {
    // warnings and the alerts -----------------

    if (!Content || Content?.length < 50) {
      toast.info("Provide a description for your event.", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      // save the data and then proceed ---------
      setCurrentPage(4);
    }
  };

  const handleChangeFileBanner = (e) => {
    mixpanel.track("Browse banner");
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

  return (
    <>
      {openSampleContent && (
        <StaticSampleDataModal
          type="eventDescription"
          onClose={() => {
            setOpenSampleContent(false);
          }}
        />
      )}

      <section className="create_form_box_create_event01">
        {/* left side---------------------------------------------------------------------------- */}
        <div className="left_section_form_create_event01">
          <Editor1
            label={`Add Event Description`}
            placeholder={`Pro-tip : The following topics, if covered, ensure a high conversion rate :
  - Objective of the event
  - Who's this for?
  - Urgency hook`}
            // info="A brief description gives your audience some context"
            Content={Content}
            required={true}
            setContent={(e) => {
              setContent(e);
              setScrollPreviewSection("desc");
            }}
            labelHelperText={{
              text: (
                <>
                  (Sample) <AiFillEye size={16} />{" "}
                </>
              ),
              action: () => {
                setOpenSampleContent(true);
              },
            }}
          />

          <section
            style={{
              width: "100%",
              gap: "25px",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              marginBottom: "32px",
            }}
          >
            <UploadField3
              label="Upload a Banner"
              id="asdas"
              info="File size limit - 15 MB, Format - jpg, jpeg, png"
              helperText="this is visible on social media platforms when your event is shared"
              FileType=".jpg,.png,.jpeg"
              onChange={setBannerImage}
              onChangeFunction={handleChangeFileBanner}
            />
            {/* <UploadField3
              label="Upload a Teaser"
              id="asd1515"
              onChange={setEventVideo}
              helperText="helps engage a wider audience. Use an AI tool for ease."
              info="File size limit - 500 MB, Format - mp4, avi"
              FileType=".mp4,.avi,.mov"
            /> */}
          </section>
          <section
            style={{
              width: "100%",
              gap: "25px",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              marginBottom: "32px",
            }}
          >
            {bannerImage && (
              <Button1
                variant="outlined"
                onClick={() => {
                  setZoom(1);
                  setCrop({ x: 0, y: 0 });
                  setCroppedArea(null);
                  setImagePreview(true);
                }}
                text = "Preview Banner and Resize"
              />
            )}
          </section>
        </div>
      </section>

      <section className="buttons_form_create_event01">
        <Button4
          text="Save & Next"
          icon={<AiOutlineArrowRight />}
          onClick={() => {
            handleSubmitFormThree();
          }}
        />

        <Button3
          text="Previous"
          icon={<AiOutlineArrowLeft />}
          onClick={() => {
            setCurrentPage(2);
          }}
        />
      </section>

      {/* Live preview Section ------------- */}
      {openimagePreview ? (
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
                      aspect={3 / 1}
                      cropShape="rect"
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
                  <button onClick={() => setImagePreview(false)}>Cancel</button>
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
    </>
  );
};

export const FourthPage = ({
  data,
  setdata,
  onSubmit,
  setCurrentPage,
  setScrollPreviewSection,
  creatorData
}) => {

  useEffect(() => {
    setScrollPreviewSection("benefits");

    setdata({
      ...data,
      contactPhone:creatorData?.phone,
      contactEmail:creatorData?.email
    })
  }, []);

  const handleChange = (e) => {
    setdata({ ...data, [e?.target?.name]: e?.target?.value });
  };


  const handleSubmitFormFour = () => {
    // warnings and the alerts -----------------
    if (!data?.benefits || data?.benefits?.length < 50) {
      toast.info("Provide a benefits for the leaderboard for your event.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
    else if (!data?.contactEmail || !data?.contactPhone) {
      toast.info("Provide proper contact details for your event.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
    else {
      // save the data and then proceed ---------
      onSubmit()
    }
  };

  return (
    <>
      <section className="create_form_box_create_event01">
        {/* left side---------------------------------------------------------------------------- */}
        <div className="left_section_form_create_event01">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/0*KIKnUvzdIkp5zcDJ"
            alt=""
          />

          <h2>
            Add 1-5 Benefits for those Top Referrers who Bring in the Maximum
            Registrations
          </h2>

          <Editor1
            label="Leaderboard Rewards Customization"
            placeholder={`Keep it clear, concise & interesting. More incentives mean more referrals.
For example:
Rank 1: Personalized 20 min 1:1 with an expert
Rank 2-5: 100% refund on event registration fee
Rank 6-10: 30% refund on event registration fee`}
            // info="Rewarding top referrers encourages engagement"
            Content={data?.benefits}
            helperText="Leaderboard ranks your audience by referrals. Rewarding top ones with benefits promotes engagement and competition"
            id="benefits"
            // required={true}
            setContent={(e) => setdata({ ...data, benefits: e })}
          />

          <h3>Add Contact Details for any queries your audience may have</h3>

          <section
            style={{
              width: "100%",
              gap: "25px",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              marginBottom: "32px",
            }}
          >
            <TextField1
              label="Email ID"
              name="contactEmail"
              id="contactEmail"
              required={true}
              value={data?.contactEmail}
              placeholder="abc@xyz.com"
              onChange={handleChange}
            />
            <TextField1
              label="Contact Number"
              name="contactPhone"
              id="contactPhone"
              required={true}
              value={data?.contactPhone}
              placeholder="xx223.."
              onChange={handleChange}
              maxLength={10}
            />
          </section>
        </div>
      </section>

      <section className="buttons_form_create_event01">
        <Button4
          text="Publish"
          icon={<AiOutlineArrowRight />}
          onClick={() => {
            handleSubmitFormFour()
          }}
        />

        <Button3
          text="Previous"
          icon={<AiOutlineArrowLeft />}
          onClick={() => {
            setCurrentPage(3);
          }}
        />
      </section>
    </>
  );
};
