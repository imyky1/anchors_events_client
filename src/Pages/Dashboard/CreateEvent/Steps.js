import { useContext, useEffect, useState } from "react";
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
  Dropdown1,
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
import ServiceContext from "../../../Context/services/serviceContext";

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
          required={true}
          placeholder="Enter display name"
          onChange={(e) => {
            handleSpeakerChange(e.target.value, index - 1, e.target.name);
          }}
        />

        <TextField1
          label="Tagline"
          name="designation"
          required={true}
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
            text="Preview Profile and Resize"
          />
        )}
      </div>
    </div>
  );
};

const AddImagesCard = ({
  titles,
  setTitles,
  setImagesArray,
  imagesArray,
  setWants,
  setScrollPreviewSection
}) => {
  // state for image cropping
  const [imagetocrop, setImageToCrop] = useState({}); // sepaker's profile image
  const [openimagePreview, setImagePreview] = useState({
    value: false,
    indexToCrop: null,
  });

  const [crop, setCrop] = useState({ x: 0, y: 0 }); // Array of values ------------------
  const [zoom, setZoom] = useState(1); // Array of values ------------------
  const [croppedArea, setCroppedArea] = useState(null); // Array of values ------------------

  const handleChangeImagesArray = (e, num) => {
    setScrollPreviewSection("images")
    setWants((prev) => {
      return { ...prev, image: true };
    });
    const file = e.target.files[0];
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setCroppedArea(null);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImageToCrop({ ...imagetocrop, [num]: reader.result });
      });
      setImagesArray({ ...imagesArray, [num]: file });
    }
  };

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const savecroppedImage = async () => {
    const img = await getCroppedImg(
      imagetocrop[openimagePreview?.indexToCrop],
      croppedArea,
      imagesArray[openimagePreview?.indexToCrop]?.name
    );

    setImagesArray((prevArray) => {
      const newArray = { ...prevArray };
      newArray[openimagePreview?.indexToCrop] = img;
      return newArray;
    });

    setImagePreview({ value: false, indexToCrop: null });
  };

  return (
    <>
      <div className="add_images_card_wrppaer_create_event_01">
        <h2>Add images to make more trust (upto 4 Images)</h2>

        <TextField1
          label="Add Title for this section"
          value={titles?.image}
          id={`titleImagSection`}
          placeholder="Enter display title"
          onChange={(e) => {
            setTitles({ ...titles, image: e.target.value });
          }}
        />

        <section
          style={{
            width: "100%",
            gap: "25px",
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <UploadField3
              label="Upload 1st Image"
              id="upload0"
              info="Upload file in Jpeg, Png format"
              FileType=".jpg,.png,.jpeg"
              onChange={(file) =>
                setImagesArray((prev) => {
                  return { ...prev, 0: file };
                })
              }
              onChangeFunction={(e) => {
                handleChangeImagesArray(e, 0);
              }}
            />
            {imagesArray[0] && (
              <Button1
                id="button0"
                onClick={() => {
                  setZoom(1);
                  setCrop({ x: 0, y: 0 });
                  setCroppedArea(null);
                  setImagePreview({
                    value: true,
                    indexToCrop: 0,
                  });
                }}
                text="Preview Image and Resize"
              />
            )}
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <UploadField3
              label="Upload 2nd Image"
              id="upload1"
              info="Upload file in Jpeg, Png format"
              FileType=".jpg,.png,.jpeg"
              onChange={(file) =>
                setImagesArray((prev) => {
                  return { ...prev, 1: file };
                })
              }
              onChangeFunction={(e) => {
                handleChangeImagesArray(e, 1);
              }}
            />

            {imagesArray[1] && (
              <Button1
                id="button1"
                onClick={() => {
                  setZoom(1);
                  setCrop({ x: 0, y: 0 });
                  setCroppedArea(null);
                  setImagePreview({
                    value: true,
                    indexToCrop: 1,
                  });
                }}
                text="Preview Image and Resize"
              />
            )}
          </div>
        </section>

        <section
          style={{
            width: "100%",
            gap: "25px",
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <UploadField3
              label="Upload 3rd Image"
              id="upload2"
              info="Upload file in Jpeg, Png format"
              FileType=".jpg,.png,.jpeg"
              onChange={(file) =>
                setImagesArray((prev) => {
                  return { ...prev, 2: file };
                })
              }
              onChangeFunction={(e) => {
                handleChangeImagesArray(e, 2);
              }}
            />

            {imagesArray[2] && (
              <Button1
                id="button2"
                onClick={() => {
                  setZoom(1);
                  setCrop({ x: 0, y: 0 });
                  setCroppedArea(null);
                  setImagePreview({
                    value: true,
                    indexToCrop: 2,
                  });
                }}
                text="Preview Image and Resize"
              />
            )}
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <UploadField3
              label="Upload 4th Image"
              id="upload3"
              info="Upload file in Jpeg, Png format"
              FileType=".jpg,.png,.jpeg"
              onChange={(file) =>
                setImagesArray((prev) => {
                  return { ...prev, 3: file };
                })
              }
              onChangeFunction={(e) => {
                handleChangeImagesArray(e, 3);
              }}
            />

            {imagesArray[3] && (
              <Button1
                id="button3"
                onClick={() => {
                  setZoom(1);
                  setCrop({ x: 0, y: 0 });
                  setCroppedArea(null);
                  setImagePreview({
                    value: true,
                    indexToCrop: 3,
                  });
                }}
                text="Preview Image and Resize"
              />
            )}
          </div>
        </section>
      </div>

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
                      aspect={5 / 4}
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

const AddVideoCard = ({
  titles,
  setTitles,
  handleVideoArrayChange,
  videoArray,
}) => {
  return (
    <div className="add_images_card_wrppaer_create_event_01">
      <h2>Add video links (upto 4 links)</h2>

      <TextField1
        label="Add Title for this section"
        value={titles?.video}
        id={`titleImagSection`}
        placeholder="Enter display title"
        onChange={(e) => {
          setTitles({ ...titles, video: e.target.value });
        }}
      />

      <section
        style={{
          width: "100%",
          gap: "25px",
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
        }}
      >
        <TextField1
          label="Add 1st Video Link"
          value={videoArray["0"]}
          id={`video1`}
          placeholder="www.anchors.com"
          onChange={(e) => {
            handleVideoArrayChange(e, 0);
          }}
        />
        <TextField1
          label="Add 2nd Video Link"
          value={videoArray["1"]}
          id={`video2`}
          placeholder="www.anchors.com"
          onChange={(e) => {
            handleVideoArrayChange(e, 1);
          }}
        />
      </section>
      <section
        style={{
          width: "100%",
          gap: "25px",
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
        }}
      >
        <TextField1
          label="Add 3rd Video Link"
          value={videoArray["2"]}
          id={`video3`}
          placeholder="www.anchors.com"
          onChange={(e) => {
            handleVideoArrayChange(e, 2);
          }}
        />
        <TextField1
          label="Add 4th Video Link"
          value={videoArray["3"]}
          id={`video4`}
          placeholder="www.anchors.com"
          onChange={(e) => {
            handleVideoArrayChange(e, 3);
          }}
        />
      </section>
    </div>
  );
};

const AddTestimonialCard = ({
  testimonialArray,
  setTestimonialArray,
  index,
  imagetocrop,
  setImageToCrop,
  setZoom,
  setCrop,
  setCroppedArea,
  setImagePreview,
  setTitles,
  titles,
  handleRemoveTestimonialCard,
  setWants,
  wants,
  setScrollPreviewSection
}) => {


  const handleChangeTestimonialCard = (e) => {
    setTestimonialArray((prevArray) => {
      const newArray = [...prevArray];
      let updatedObj = newArray[index];
      updatedObj[e?.target?.name] = e.target.value;
      newArray[index] = updatedObj;
      return newArray;
    });
  };

  const handleChangeTestimonialImage = (e) => {
    const file = e.target.files[0];
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setCroppedArea(null);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImageToCrop({ ...imagetocrop, [index]: reader.result });
      });
      setTestimonialArray((prevArray) => {
        const newArray = [...prevArray];
        let updatedObj = newArray[index];
        updatedObj["image"] = file;
        newArray[index] = updatedObj;
        return newArray;
      });
    }
  };

  return (
    <div className="add_testimonial_card_wrppaer_create_event_01">
      <section>
        <span
          onClick={() => {
            handleRemoveTestimonialCard(index);
          }}
        >
          {index === 0 ? "Reset" : "Remove"}
        </span>

        {index === 0 && (
          <h2>Add testimonial in your page & Increase conversion rate</h2>
        )}
      </section>

      {index === 0 && (
        <TextField1
          label="Add Title for this section"
          value={titles?.testimonial}
          id={`titleImagSection`}
          placeholder="Enter display title"
          onChange={(e) => {
            setTitles({...titles,testimonial:e.target.value});
          }}
        />
      )}

      <Dropdown1
        value={["Text", "Image", "Video"]}
        label="Choose Testimonial Type"
        placeholder="Choose a testimonial type"
        defaultValue={testimonialArray[index]?.type}
        selectedValue={(e) => {
          setScrollPreviewSection("testimonial")
          setWants({...wants,testimonial:true})
          setTestimonialArray((prevArray) => {
            const newArray = [...prevArray];
            let updatedObj = newArray[index];
            updatedObj["type"] = e;
            newArray[index] = updatedObj;
            return newArray;
          });
        }}
      />

      {testimonialArray[index]?.type === "Text" && (
        <>
          <section
            style={{
              width: "100%",
              gap: "25px",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
            }}
          >
            <TextField1
              label="Add Testimonial Title"
              name="title"
              value={testimonialArray[index]?.title}
              placeholder="Text"
              onChange={handleChangeTestimonialCard}
            />
            <TextField1
              label="Add User Name"
              name="username"
              value={testimonialArray[index]?.username}
              placeholder="This name will be displayed"
              onChange={handleChangeTestimonialCard}
            />
          </section>

          <Editor1
            label={`Write Testimonial Details`}
            Content={testimonialArray[index]?.review}
            setContent={(e) => {
              setTestimonialArray((prevArray) => {
                const newArray = [...prevArray];
                let updatedObj = newArray[index];
                updatedObj["review"] = e;
                newArray[index] = updatedObj;
                return newArray;
              });
            }}
          />
        </>
      )}

      {testimonialArray[index]?.type === "Image" && (
        <>
          <section
            style={{
              width: "100%",
              gap: "25px",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
            }}
          >
            <UploadField3
              label="Upload Image"
              name="image"
              id={`testimonialimage${index}`}
              info="File size limit - 15 MB, Format - jpg, jpeg, png"
              FileType=".jpg,.png,.jpeg"
              onChangeFunction={handleChangeTestimonialImage}
            />

            {testimonialArray[index]?.image && (
              <Button1
                variant="outlined"
                onClick={() => {
                  setZoom(1);
                  setCrop({ x: 0, y: 0 });
                  setCroppedArea(null);
                  setImagePreview({
                    value: true,
                    indexToCrop: index,
                  });
                }}
                text="Preview Banner and Resize"
              />
            )}
          </section>
        </>
      )}

      {testimonialArray[index]?.type === "Video" && (
        <>
          <section
            style={{
              width: "100%",
              gap: "25px",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
            }}
          >
            <TextField1
              label="Add Video Link"
              value={testimonialArray[index]?.videoLink}
              id={`videotestimonial${index}`}
              name="videoLink"
              placeholder="https://www.youtube.com/watch?v=aas....."
              onChange={handleChangeTestimonialCard}
            />
          </section>
        </>
      )}
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
  setOpenLoading,
  progress,
  setDraftEventId,
}) => {
  const [openSampleContent, setOpenSampleContent] = useState(false);

  const { addEvent } = useContext(ServiceContext);

  const handleChange = (e) => {
    setdata({ ...data, [e?.target?.name]: e?.target?.value });

    if (e.target.name !== "sname") {
      setScrollPreviewSection("details");
    } else {
      setScrollPreviewSection(null);
    }
  };

  const onSubmit = async () => {
    setOpenLoading(true); // true on loader
    progress(0);
    try {
      progress(50);
      let json = await addEvent({
        sname: data?.sname,
        stype: data?.stype === "Offline" ? 0 : 1,
        isPaid: paid === "Free" ? false : true,
        smrp: paid === "Free" ? 0 : data.smrp,
        ssp: paid === "Free" ? 0 : data.ssp,
        startDate: data?.date,
        time: { startTime: data?.startTime, endTime: data?.endTime },
        maxCapacity: data?.eventSeatCapacity,
        meetlink: data?.meetlink,
        stagesCompleted: 1,
      });

      if (json?.success) {
        setOpenLoading(false);
        setCurrentPage(2);
        setDraftEventId(json?.eventID);
      } else {
        setOpenLoading(false);
        toast.error(`Event Not Created Please Try Again`, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      setOpenLoading(false);
      console.log(error);
      toast.error(`Server side error please try after some time`, {
        position: "top-center",
        autoClose: 2000,
      });
    }
    setOpenLoading(false);
    progress(100);
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
      onSubmit();
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
            boxTooltip={
              <>
                <p>The title should :</p>
                <ul>
                  <li>Have clear purpose</li>
                  <li>Encourage people to click & check it out</li>
                  <li>Be Simple (& catchy)</li>
                </ul>
              </>
            }
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
            autoComplete="off"
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
                autoComplete="off"
                required={true}
                onChange={handleChange}
              />

              <TextField1
                label="Discounted Price"
                placeholder="Min 99"
                name="ssp"
                id="ssp"
                required={true}
                autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
  setOpenBanner,
  setOpenLoading,
  progress,
  draftEventId,
  speakersArray,
  setSpeakersArray,
  speakersImagesArray,
  setSpeakersImagesArray,
  isSpeaker,
  setIsSpeaker,
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

  const { addEvent, UploadEventSpeakersProfile } = useContext(ServiceContext);

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

  const SaveSpeakerImages = async () => {
    try {
      for (let index = 0; index < speakersImagesArray.length; index++) {
        const element = speakersImagesArray[index];
        if (element) {
          let data1 = new FormData();
          data1.append("file", element);
          let speaker = await UploadEventSpeakersProfile(data1);
          let newArr = speakersArray;
          newArr[index] = {
            ...speakersArray[index],
            profile: speaker?.result?.Location,
          };
          setSpeakersArray(newArr);
        } else {
          if (element?.isCreator) {
            let newArr = speakersArray;
            newArr[index] = {
              ...speakersArray[index],
              profile: creatorData?.profile,
            };
            setSpeakersArray(newArr);
          }
        }
      }
    } catch (error) {
      toast.error("Some error occured in uploading speaker images", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const onSubmit = async () => {
    setOpenLoading(true); // true on loader
    progress(0);
    try {
      await SaveSpeakerImages();
      progress(50);
      let json = await addEvent({
        speakerDetails: speakersArray,
        stagesCompleted: 2,
        eventID: draftEventId,
      });

      if (json?.success) {
        setOpenLoading(false);
        setCurrentPage(3);
      } else {
        setOpenLoading(false);
        toast.error(`Details Not Saved Please Try Again`, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      setOpenLoading(false);
      console.log(error);
      toast.error(`Server side error please try after some time`, {
        position: "top-center",
        autoClose: 2000,
      });
    }

    setOpenLoading(false);
    progress(100);
  };

  const handleSubmitFormTwo = () => {
    // warnings and the alerts -----------------
    if (draftEventId) {
      let checkSpeakers = checkSpeakersData();
      if (checkSpeakers) {
        // save the data and then proceed ---------
        onSubmit();
      } else {
        toast.info("Include speaker details, including names and taglines.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } else {
      toast.info("Some error in finding your saved data. Please Try Again!!", {
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
              }}
            >
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
  Content,
  setContent,
  setCurrentPage,
  setScrollPreviewSection,
  setOpenLoading,
  progress,
  draftEventId,
  saveTheBannerEvent,
}) => {
  const [openSampleContent, setOpenSampleContent] = useState(false);
  const [defaultbanner, setDefaultBanner] = useState(false); // decides wheter to user checked the default banner-----

  // state for image cropping
  const [imagetocrop, setImageToCrop] = useState(); // sepaker's profile image
  const [openimagePreview, setImagePreview] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 }); // Array of values ------------------
  const [zoom, setZoom] = useState(1); // Array of values ------------------
  const [croppedArea, setCroppedArea] = useState(null); // Array of values ------------------

  const { addEvent, UploadBanners } = useContext(ServiceContext);

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

  const onSubmit = async () => {
    const data1 = new FormData();
    data1.append("file", bannerImage);

    setOpenLoading(true); // true on loader
    progress(0);
    try {
      let banner = { success: true, result: { Location: "" } };

      // Check for banner and saves if it is available
      if (bannerImage) {
        banner = await UploadBanners(data1); /// uplaoding banner and files on s3
      } else {
        // Generating a default Banner
        banner = await saveTheBannerEvent();
      }

      progress(50);

      if (banner?.success) {
        progress(75);
        let json = await addEvent({
          ldesc: Content,
          simg: banner?.result?.Location,
          stagesCompleted: 3,
          eventID: draftEventId,
        });

        if (json?.success) {
          setOpenLoading(false);
          setCurrentPage(4);
        } else {
          setOpenLoading(false);
          toast.error(`Details Not Saved Please Try Again`, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      } else {
        setOpenLoading(false);
        toast.error(`Facing issues while uploading image`, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      setOpenLoading(false);
      console.log(error);
      toast.error(`Server side error please try after some time`, {
        position: "top-center",
        autoClose: 2000,
      });
    }

    setOpenLoading(false);
    progress(100);
  };

  const handleSubmitFormThree = () => {
    // warnings and the alerts -----------------
    if (draftEventId) {
      if (!Content || Content?.length < 50) {
        toast.info("Provide a description for your event.", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        // save the data and then proceed ---------
        onSubmit();
      }
    } else {
      toast.info("Some error in finding your saved data. Please Try Again!!", {
        position: "top-center",
        autoClose: 3000,
      });
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
            boxTooltip={
              <>
                <p>
                  Pro-tip : The following topics, if covered, ensure a high
                  conversion rate :
                </p>
                <ul>
                  <li>Who's this for?</li>
                  <li>Urgency hook</li>
                  <li>Objective of the event</li>
                </ul>
              </>
            }
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
            info="Min Characters limit - 40"
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
                text="Preview Banner and Resize"
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
  setCurrentPage,
  setScrollPreviewSection,
  setOpenLoading,
  progress,
  draftEventId,
  imagesArray,
  videoArray,
  setImagesArray,
  setVideoArray,
  titles,
  setTitles,
  wants,
  setWants,
}) => {
  const { addEvent, UploadEventSpeakersProfile } = useContext(ServiceContext);

  const handleVideoArrayChange = (e, num) => {
    setWants({ ...wants, video: true });
    setScrollPreviewSection("video")
    setVideoArray({ ...videoArray, [num]: e.target.value });
  };

  const SaveExtraImages = async (data) => {
    try {
      let imagesURL = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element) {
          let data1 = new FormData();
          data1.append("file", element);
          let speaker = await UploadEventSpeakersProfile(data1);
          imagesURL.push(speaker?.result?.Location);
        }
      }

      return imagesURL;
    } catch (error) {
      toast.error("Some error occured in uploading speaker images", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const onSubmit = async () => {
    setOpenLoading(true); // true on loader
    progress(0);
    let imagesData;
    let videoData;
    try {
      // processing the images in s3 ------------------
      if (!wants?.image) {
        imagesData = null;
      } else {
        let result = await SaveExtraImages(
          Object.values(imagesArray).filter((e) => {
            return e;
          })
        );

        imagesData = {
          title: titles?.image,
          images: result,
        };
      }

      progress(50);

      if (!wants?.video) {
        videoData = null;
      } else {
        videoData = {
          title: titles?.video,
          videos: Object.values(videoArray).filter((e) => {
            return e;
          }),
        };
      }

      progress(75);

      let json = await addEvent({
        imagesSectionData: imagesData,
        videosSectionData: videoData,
        stagesCompleted: 4,
        eventID: draftEventId,
      });

      if (json?.success) {
        setOpenLoading(false);
        setCurrentPage(5);
      } else {
        setOpenLoading(false);
        toast.error(`Details Not Saved Please Try Again`, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      setOpenLoading(false);
      console.log(error);
      toast.error(`Server side error please try after some time`, {
        position: "top-center",
        autoClose: 2000,
      });
    }

    setOpenLoading(false);
    progress(100);
  };

  const handleSubmitFormFour = () => {
    // warnings and the alerts -----------------
    if (draftEventId) {
      if (!wants?.image && !wants?.video) {
        setCurrentPage(5);
      } else {
        // save the data and then proceed ---------
        onSubmit();
      }
    } else {
      toast.info("Some error in finding your saved data. Please Try Again!!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <section className="create_form_box_create_event01">
        {/* left side---------------------------------------------------------------------------- */}
        <div className="left_section_form_create_event01">
          <Select2
            value={["Yes", "No"]}
            label="Do you want to add Images section?"
            selectedValue={(e) => {
              setWants({ ...wants, image: e === "Yes" ? true : false });
            }}
            defaultValue={wants?.image ? "Yes" : "No"}
          />

          <AddImagesCard
            titles={titles}
            setTitles={setTitles}
            setImagesArray={setImagesArray}
            imagesArray={imagesArray}
            setWants={setWants}
            setScrollPreviewSection={setScrollPreviewSection}
          />

          <br />

          <Select2
            value={["Yes", "No"]}
            label="Do you want to add Videos section?"
            selectedValue={(e) => {
              setWants({ ...wants, video: e === "Yes" ? true : false });
            }}
            defaultValue={wants?.video ? "Yes" : "No"}
          />

          <AddVideoCard
            titles={titles}
            setTitles={setTitles}
            handleVideoArrayChange={handleVideoArrayChange}
            videoArray={videoArray}
          />
        </div>
      </section>

      <section className="buttons_form_create_event01">
        <Button4
          text="Save & Next"
          icon={<AiOutlineArrowRight />}
          onClick={() => {
            handleSubmitFormFour();
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

export const FifthPage = ({
  setCurrentPage,
  setScrollPreviewSection,
  setOpenLoading,
  progress,
  draftEventId,
  testimonialArray,
  setTestimonialArray,
  wants,
  setWants,
  titles,
  setTitles,
}) => {
  const { addEvent, UploadEventSpeakersProfile } = useContext(ServiceContext);

  const [imagetocrop, setImageToCrop] = useState({}); // sepaker's profile image
  // state for image cropping
  const [openimagePreview, setImagePreview] = useState({
    value: false,
    indexToCrop: null,
  });

  const [crop, setCrop] = useState({ x: 0, y: 0 }); // Array of values ------------------
  const [zoom, setZoom] = useState(1); // Array of values ------------------
  const [croppedArea, setCroppedArea] = useState(null); // Array of values ------------------

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };
  
  const savecroppedImage = async () => {
    const img = await getCroppedImg(
      imagetocrop[openimagePreview?.indexToCrop],
      croppedArea,
      testimonialArray[openimagePreview?.indexToCrop]?.image?.name
    );

    setTestimonialArray((prevArray) => {
      const newArray = [...prevArray];
      let updatedObj = newArray[openimagePreview?.indexToCrop];
      updatedObj["image"] = img;
      newArray[openimagePreview?.indexToCrop] = updatedObj;
      return newArray;
    });

    setImagePreview({ value: false, indexToCrop: null });
  };

  const checkTestimonialData = () => {
    if (testimonialArray.length === 0 || !wants?.testimonial) {
      return true;
    }

    for (let index = 0; index < testimonialArray.length; index++) {
      if (!testimonialArray[index]?.type) {
        continue;
      }

      const element = testimonialArray[index];

      if (
        (!element?.review || element?.review?.length === 0) &&
        !element?.image &&
        !element?.videoLink
      ) {
        return false;
      }
    }
    return true;
  };

  const saveTestimonialImage = async (element) => {
    let data1 = new FormData();
    data1.append("file", element);
    let speaker = await UploadEventSpeakersProfile(data1);
    return speaker?.result?.Location;
  };

  const onSubmit = async () => {
    setOpenLoading(true); // true on loader
    progress(0);
    try {
      // processing the images in s3 ------------------
      if (titles?.testimonial?.length < 1) {
        setOpenLoading(false);
        toast.error("Section Name could not be empty", {
          position: "top-center",
          autoClose: 1500,
        });
        return;
      }

      if (checkTestimonialData()) {
        for (let index = 0; index < testimonialArray.length; index++) {
          const element = testimonialArray[index];
          if (element?.type === "Image") {
            if (element?.image) {
              let result = await saveTestimonialImage(element?.image);
              setTestimonialArray((prev) => {
                let newArr = [...prev];
                newArr[index].image = result;
                return newArr;
              });
            } else {
              continue;
            }
          }
        }

        progress(50);

        let json = await addEvent({
          testimonialData: {
            title: titles?.testimonial ?? "Testimonials",
            data: testimonialArray,
          },
          stagesCompleted: 5,
          eventID: draftEventId
        });

        if (json?.success) {
          setOpenLoading(false);
          setCurrentPage(6);
        } else {
          setOpenLoading(false);
          toast.error(`Details Not Saved Please Try Again`, {
            position: "top-center",
            autoClose: 2000,
          });
        }
      } else {
        toast.error("Fill the testimonial details properly", {
          position: "top-center",
          autoClose: 1500,
        });
      }
    } catch (error) {
      setOpenLoading(false);
      console.log(error);
      toast.error(`Server side error please try after some time`, {
        position: "top-center",
        autoClose: 2000,
      });
    }

    setOpenLoading(false);
    progress(100);
  };

  const handleSubmitFormFive = () => {
    // warnings and the alerts -----------------
    if (draftEventId) {
      if (!wants.testimonial) {
        setCurrentPage(6);
      } else {
        // save the data and then proceed ---------
        onSubmit();
      }
    } else {
      toast.info("Some error in finding your saved data. Please Try Again!!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleRemoveTestimonialCard = (indexToRemove) => {
    if (indexToRemove === 0) {
      setTitles({ ...titles, testimonial: "Testimonials" });

      setTestimonialArray((prev) => {
        let newArr = [...prev];
        newArr[0] = {};
        return newArr;
      });
      return;
    } else {
      setTestimonialArray((prev) => {
        let newArr = [...prev];
        const updatedArray = newArr.filter((_, i) => i !== indexToRemove);
        return updatedArray;
      });
    }
  };

  return (
    <>
      <section className="create_form_box_create_event01">
        {/* left side---------------------------------------------------------------------------- */}
        <div className="left_section_form_create_event01">
          <Select2
            value={["Yes", "No"]}
            label="Do you want to add testimonials?"
            selectedValue={(e) => {
              setWants({...wants,testimonial:(e === "Yes" ? true : false)})
            }}
            defaultValue={wants?.testimonial ? "Yes" : "No"}
          />

          {testimonialArray?.map((e, i) => {
            return (
              <AddTestimonialCard
                key={`testimonialcard${i}`}
                testimonialArray={testimonialArray}
                setTestimonialArray={setTestimonialArray}
                index={i}
                imagetocrop={imagetocrop}
                setImageToCrop={setImageToCrop}
                setZoom={setZoom}
                setCrop={setCrop}
                setCroppedArea={setCroppedArea}
                setImagePreview={setImagePreview}
                setTitles={setTitles}
                titles={titles}
                handleRemoveTestimonialCard={handleRemoveTestimonialCard}
                setWants={setWants}
                wants={wants}
                setScrollPreviewSection={setScrollPreviewSection}
              />
            );
          })}

          {/* {speakersArray?.length < 3 && ( */}
          {testimonialArray?.length < 4 && (
            <Button5
              text="Add More Testimonial"
              rightIcon={<FaPlus />}
              onClick={() => {
                setTestimonialArray([...testimonialArray, {}]);
              }}
            />
          )}
        </div>
      </section>

      <section className="buttons_form_create_event01">
        <Button4
          text="Save & Next"
          icon={<AiOutlineArrowRight />}
          onClick={() => {
            handleSubmitFormFive();
          }}
        />

        <Button3
          text="Previous"
          icon={<AiOutlineArrowLeft />}
          onClick={() => {
            setCurrentPage(4);
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
                      aspect={7 / 4}
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

export const SixthPage = ({
  data,
  setdata,
  setCurrentPage,
  setScrollPreviewSection,
  creatorData,
  setOpenLoading,
  progress,
  draftEventId,
  setshowPopup,
}) => {
  const { addEvent, getslugcountEvent } = useContext(ServiceContext);

  useEffect(() => {
    setScrollPreviewSection("benefits");

    setdata({
      ...data,
      contactPhone: creatorData?.phone,
      contactEmail: creatorData?.email,
    });
  }, []);

  const process = () => {
    let slug = data?.sname?.split(" ").join("-"); // creates the slug from the name
    return slug;
  };

  const handleChange = (e) => {
    setdata({ ...data, [e?.target?.name]: e?.target?.value });
  };

  const onSubmit = async () => {
    setOpenLoading(true); // true on loader
    progress(0);

    let slug = process();
    const SlugCount = await getslugcountEvent(slug.toLowerCase());

    try {
      progress(50);
      let json = await addEvent({
        slug:
          SlugCount === 0
            ? slug.toLowerCase()
            : slug.toLowerCase().concat("--", `${SlugCount}`),
        benefits: data?.benefits,
        contactDetails: {
          phone: data?.contactPhone,
          email: data?.contactEmail,
        },
        stagesCompleted: 6,
        eventID: draftEventId,
      });
      if (json?.success) {
        setOpenLoading(false);
        setshowPopup({ open: true, link: json?.shortLink });
      } else {
        setOpenLoading(false);
        toast.error(`Details Not Saved Please Try Again`, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      setOpenLoading(false);
      console.log(error);
      toast.error(`Server side error please try after some time`, {
        position: "top-center",
        autoClose: 2000,
      });
    }

    setOpenLoading(false);
    progress(100);
  };

  const handleSubmitFormFour = () => {
    // warnings and the alerts -----------------
    if (draftEventId) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!data?.benefits || data?.benefits?.length < 50) {
        toast.info("Provide benefits for the leaderboard for your event.", {
          position: "top-center",
          autoClose: 3000,
        });
      } else if (!data?.contactEmail || !data?.contactPhone) {
        toast.info("Provide proper contact details for your event.", {
          position: "top-center",
          autoClose: 3000,
        });
      } else if (!emailRegex.test(data?.contactEmail)) {
        toast.info("Provide proper contact email for your event.", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        // save the data and then proceed ---------
        onSubmit();
      }
    } else {
      toast.info("Some error in finding your saved data. Please Try Again!!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <section className="create_form_box_create_event01">
        {/* left side---------------------------------------------------------------------------- */}
        <div className="left_section_form_create_event01">
          <img
            src="https://anchors-assets.s3.amazonaws.com/1704450093770-Frame_1000002436.png"
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
            required={true}
            setContent={(e) => setdata({ ...data, benefits: e })}
            boxTooltip={
              <>
                <p>
                  Keep it clear, concise & interesting. More incentives mean
                  more referrals.
                </p>
                <p>For example:</p>
                <ul>
                  <li>Rank 1: Personalized 20 min 1:1 with an expert </li>
                  <li>Rank 2-5: 100% refund on event registration fee </li>
                  <li>Rank 6-10: 30% refund on event registration fee</li>
                </ul>
              </>
            }
            info="Min Characters limit - 40"
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
              placeholder="12223.."
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
            handleSubmitFormFour();
          }}
        />

        <Button3
          text="Previous"
          icon={<AiOutlineArrowLeft />}
          onClick={() => {
            setCurrentPage(5);
          }}
        />
      </section>
    </>
  );
};
