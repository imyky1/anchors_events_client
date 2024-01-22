import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { creatorContext } from "../../../../Context/CreatorState";
import ServiceContext from "../../../../Context/services/serviceContext";
import { LoadTwo } from "../../../Modals/Loading";
import { useNavigate } from "react-router-dom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import "./EditSuccess.css";
import { Button4, Button5 } from "../Create Services/InputComponents/buttons";
import { MdOutlineEventSeat } from "react-icons/md";

const EditSuccess = () => {
  const navigate = useNavigate();

  const {
    allCreatorInfo,
    getAllCreatorInfo,
    basicNav,
    setCreatorInfo,
    generateInviteCode,
    getTellUsMoreFormData,
  } = useContext(creatorContext);

  useEffect(() => {
    getAllCreatorInfo();
    // eslint-disable-next-line
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(`anchors.in/${allCreatorInfo?.pageUrl}`);
    toast.info("Page Link Copied", {
        position: "top-center",
        autoClose: 1500,
      });
  }

  return (
    <>
    <ToastContainer />
      <div className="setup_success_wrapper">
        <IoIosCheckmarkCircleOutline size={67} color="#6EE7B7" />
        <div className="setup_success_content">
          <h1>
            Congratulations! <br></br> You have setup your page
          </h1>
          <h3>
            90% Host Create their first event within 10 min of registration
          </h3>
        </div>
        <div className="setup_success_buttons">
          <Button5 onClick={()=>{handleCopy()}} rightIcon={<IoCopyOutline />} text={"Copy Page Link"} />
          <Button4 onClick={()=>{navigate('/dashboard/createevent')}} rightIcon={<MdOutlineEventSeat />} text={"Create Your Event"} />
        </div>
      </div>
    </>
  );
};

export default EditSuccess;
