import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SuperSEO } from "react-super-seo";
import "./Dashboard.css";
import mixpanel from "mixpanel-browser";
import { creatorContext } from "../../../../Context/CreatorState";
import { BsFillPersonFill, BsFillStarFill,BsPersonPlus } from "react-icons/bs";
import { BiGift } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import Confetti from "react-confetti";
import { ToastContainer, toast } from "react-toastify";
import EventModel from "../../../Modals/EventModal/Event_popup";

const DashboardStepper = ({ setOpenFirstTimeModal, reviews }) => {
  const navigate = useNavigate();
  const [loadConfetti, setLoadConfetti] = useState(false);
  const [loader, setLoader] = useState(false);
  const [stepperData, setStepperData] = useState({});
  const [openEventPopup, setOpenEventPopup] = useState(false);

  const {
    updateStepperStatus,
    getAllCreatorInfo,
    allCreatorInfo,
    basicNav,
    checkStepperStatus,
  } = useContext(creatorContext);

  // get creator data
  useEffect(() => {
    getAllCreatorInfo();
  }, []);

  // Open first time modal and get the stepper Data
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("firstTime")) {
      setOpenFirstTimeModal(true);
    }
    setLoader(true);

    if (!basicNav?.stepper) {
      checkStepperStatus().then((e) => {
        setLoader(false);
        setStepperData(e?.result);
      });
    } else {
      setStepperData({
        "Updated Profile Page": 1, // approved only when the creator fills the profile
        "Created First Event": 1,
        "Acquired 10 Registration": 1,
        "Hosted First Event": 1,
      });
    }
  }, [basicNav]);

  function sumObjectValues(obj) {
    let sum = 0;

    // Iterate over the object's properties
    for (let key in obj) {
      // Check if the property is not inherited from the prototype chain
      if (obj.hasOwnProperty(key)) {
        // Add the value to the sum
        sum += obj[key];
      }
    }

    return sum;
  }

  //  what to do if the stepper turns out false and true
  useEffect(() => {
    if (
      sumObjectValues(stepperData) >= 4 &&
      reviews > 0 &&
      !basicNav?.stepper
    ) {
      setLoadConfetti(true);
      updateStepperStatus().then((e) => {
        if (e.success) {
          // toast.success(
          //   "Congrats You have successfully completed your first Milestone",
          //   {
          //     position: "top-center",
          //     autoClose: 4000,
          //   }
          // );
          console.log("Congrats");
          setTimeout(() => {
            // window.location.reload()
            setLoadConfetti(false);
          }, 5000);
        }
      });
    }
  }, [stepperData]);


  return (
    <>
      {/* {loader && <LoadTwo open={loader} />} */}
      <ToastContainer limit={1} />

      {loadConfetti && (
        <Confetti width={window.screen.width} height={window.screen.height} />
      )}

      {openEventPopup && (
        <EventModel
          onClose={() => {
            setOpenEventPopup(false);
          }}
        />
      )}

      <div className="main_dashboard_conatiner2">
        <div className="stepper_outside_wrapper_dashboard">
          <h2 className="text_01_dashboard">
            Hi {allCreatorInfo?.name?.split(" ")[0]}, Welcome to anchors!
          </h2>
          <span className="text_02_dashboard" style={{ textAlign: "left" }}>
            Begin your Anchors journey by following the milestones outlined
            below to get started!
          </span>

          <section>
            <div className="each_step_stepper_dashboard">
              <div
                className={
                  stepperData &&
                  stepperData["Updated Profile Page"] === 1 &&
                  "changeBackgroundToBlackDashboard"
                }
              >
                <BsFillPersonFill
                  color={
                    stepperData && stepperData["Updated Profile Page"] === 1
                      ? "white"
                      : "#64748B"
                  }
                  size={21}
                />
              </div>
              <span style={stepperData && stepperData["Updated Profile Page"] === 1 ? {color:"black"} : {}}>Updated Profile Page</span>
            </div>

            <div
              className={`horizonal_bar_stepper_dashboard ${
                stepperData && stepperData["Updated Profile Page"] === 1
                  ? "changeBackgroundToBlackDashboard"
                  : "changeBackgroundToGreyDashboard"
              }`}
            ></div>
            <div className="each_step_stepper_dashboard">
              <div
                className={
                  stepperData &&
                  stepperData["Created First Event"] === 1 &&
                  "changeBackgroundToBlackDashboard"
                }
              >
                <SlCalender
                  color={
                    stepperData && stepperData["Created First Event"] === 1
                      ? "white"
                      : "#64748B"
                  }
                  size={21}
                />
              </div>
              <span style={ stepperData && stepperData["Created First Event"] === 1 ? {color:"black"} : {}}>Created First Event</span>
            </div>

            <div
              className={`horizonal_bar_stepper_dashboard ${
                stepperData && stepperData["Created First Event"] === 1
                  ? "changeBackgroundToBlackDashboard"
                  : "changeBackgroundToGreyDashboard"
              }`}
            ></div>
            <div className="each_step_stepper_dashboard">
              <div
                className={
                  stepperData &&
                  stepperData["Acquired 10 Registration"] === 1 &&
                  "changeBackgroundToBlackDashboard"
                }
              >
                <BsPersonPlus
                  color={
                    stepperData && stepperData["Acquired 10 Registration"] === 1
                      ? "white"
                      : "#64748B"
                  }
                  size={21}
                />
              </div>
              <span style={stepperData && stepperData["Acquired 10 Registration"] === 1 ? {color:"black"} : {}}>Acquired 10 Registration</span>
            </div>

            <div
              className={`horizonal_bar_stepper_dashboard ${
                stepperData && stepperData["Acquired 10 Registration"] === 1
                  ? "changeBackgroundToBlackDashboard"
                  : "changeBackgroundToGreyDashboard"
              }`}
            ></div>
            <div className="each_step_stepper_dashboard">
              <div
                className={
                  stepperData &&
                  stepperData["Hosted First Event"] === 1 &&
                  "changeBackgroundToBlackDashboard"
                }
              >
                <BiGift
                  color={
                    stepperData && stepperData["Hosted First Event"] === 1
                      ? "white"
                      : "#64748B"
                  }
                  size={21}
                />
              </div>
              <span style={stepperData && stepperData["Hosted First Event"] === 1 ? {color:"black"} : {}}>Hosted First Event</span>
            </div>

            <div
              className={`horizonal_bar_stepper_dashboard ${
                stepperData && stepperData["Hosted First Event"] === 1
                  ? "changeBackgroundToBlackDashboard"
                  : "changeBackgroundToGreyDashboard"
              }`}
            ></div>
            <div className="each_step_stepper_dashboard">
              <div
                className={reviews > 0 && "changeBackgroundToBlackDashboard"}
              >
                <BsFillStarFill
                  color={reviews > 0 ? "white" : "#64748B"}
                  size={21}
                />
              </div>
              <span style={reviews > 0 ? {color:"black"} : {}}>Earned Review</span>
            </div>
          </section>
        </div>

        <div className="main_dashboard_design_box">
          <h2 className="text_01_dashboard">Create your Event</h2>
          <span className="text_02_dashboard">
            Easily organize events, whether you're an individual speaker or
            coordinating with multiple speakers.
          </span>
          <section>
            <div
              onClick={() => {
                setOpenEventPopup(true);
                mixpanel.track("Events Share a event");
              }}
              className="dashboard_options"
            >
              Create Event
            </div>
          </section>
        </div>
      </div>

      <SuperSEO title="Anchors - Dashboard" />
    </>
  );
};

export default DashboardStepper;
