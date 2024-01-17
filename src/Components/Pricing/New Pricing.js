import React, { useState, useRef, useContext, useEffect } from "react";
import Image1 from "./utils/image1";
import Image2 from "./utils/image2";
import Image3 from "./utils/image3";
import Image4 from "./utils/image4";

import "./NewPricing.css";
import { EventsNavbar } from "../Layouts/Navbar Creator/Navbar";
import MainNewFooter from "../Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import { SuperSEO } from "react-super-seo";
import { siteControlContext } from "../../Context/SiteControlsState";
import { paymentContext } from "../../Context/PaymentState";
import { LoadThree } from "../Modals/Loading";
import { useNavigate } from "react-router-dom";
import mixpanel from "mixpanel-browser";

const StartupPlanPoints = (maxevents, userCredits, extraCharges, eventType) => {
  return [
    `Only ${eventType === "paid" ? "Free/Paid" : "Free"} Events Can host`,
    `Brand Color Page`,
    `WhatsApp Transactional/Reminder`,
    `Email Transactional/reminder`,
    `Certificate for attendee`,
    `Automated Marketing Graphics`,
    `Inbuilt Referral System for attendee`,
    `Download User Data`,
    `Detailed Analysis`,
    `Upto ${maxevents} Events`,
    `Up to ${userCredits} users + ${extraCharges} Rupees/user`,
    `Download User Data`,
  ];
};

const PremiumPlanPoints = (maxevents, userCredits, eventType) => {
  return [
    `Only ${eventType === "paid" ? "Free/Paid" : "Free"} Events Can host`,
    `${maxevents === "unlimited" ? "Unlimited" : maxevents} Events`,
    `${
      userCredits === "unlimited" ? "Unlimited" : userCredits
    } User Registration`,
    `Domestic / International Payment`,
    `Abandoned Cart Funnel`,
    `Recommendation to increase`,
  ];
};

const ComparePoints = (maxEvents, userCredits, extraCharges) => {
  return [
    {
      point: "Host Free Event",
      starter: true,
      premium: true,
    },
    {
      point: "Host Paid Event",
      starter: false,
      premium: true,
    },
    {
      point: "Brand Color Page",
      starter: true,
      premium: true,
    },
    {
      point: "WhatsApp Transactional/Reminder",
      starter: true,
      premium: true,
    },
    {
      point: "Email Transactional/reminder",
      starter: true,
      premium: true,
    },
    {
      point: "Certificate for attendee",
      starter: true,
      premium: true,
    },
    {
      point: "Automated Marketing Graphics",
      starter: true,
      premium: true,
    },
    {
      point: "Inbuilt Referral System for attendee",
      starter: true,
      premium: true,
    },
    {
      point: "Detailed Analysis",
      starter: true,
      premium: true,
    },
    {
      point: "Number of Events",
      starterText: `Upto ${maxEvents} Events`,
      premiumText: "Unlimited",
    },
    {
      point: "Number of users Can Register",
      starterText: `Up to ${userCredits} users + ${extraCharges} Rupees/user`,
      premiumText: "Unlimited",
    },
    {
      point: "Domestic / International Payment",
      starter: false,
      premium: true,
    },
    {
      point: "Abandoned Cart Funnel",
      starter: false,
      premium: true,
    },
    {
      point: "Recommendation for new page if low conversion rate",
      starter: false,
      premium: true,
    },
  ];
};

const PricingBox = ({
  selectedChart,
  setSelectedChart,
  plandata,
  customCard,
}) => {
  return (
    <div
      className={`chart_container ${
        selectedChart === plandata?._id ? "selected" : ""
      }`}
    >
      <div className={`chart`} onClick={() => setSelectedChart(plandata?._id)}>
        <div className="heading">
          {plandata?.name?.includes("Starter")
            ? "Starter Plan"
            : plandata?.name?.includes("Premium")
            ? "Premium Plan (Recommended)"
            : "Pricing at Scale"}
        </div>
        <div className="content">
          <div className="price">
            {customCard ? (
              <h1 style={{ fontWeight: "400" }}>CUSTOM</h1>
            ) : (
              <>
                <h1>₹{plandata?.psp?.$numberDecimal}</h1>
                <h2 className="strikethrough">
                  {plandata?.pmrp?.$numberDecimal}
                </h2>
              </>
            )}
          </div>
          <div className="per_month">
            {customCard ? (
              "Contact us for customised pricing at scale"
            ) : (
              <>
                per{" "}
                {plandata?.subscriptionType === "monthly"
                  ? "month"
                  : plandata?.subscriptionType === "quarterly"
                  ? "quarter"
                  : "year"}
                {plandata?.anchorsCharges &&
                  ` + ${
                    plandata?.anchorsCharges?.$numberDecimal * 100 + "%"
                  } of revenue`}
              </>
            )}
          </div>
          <button>
            {selectedChart === plandata?._id ? <Image3 /> : <Image1 />}
            Get Started
          </button>

          <div className="list_of_feature">
            {plandata?.name?.includes("Premium") && (
              <p>Everything in Starter Plan +</p>
            )}
            {plandata?.name?.includes("Starter")
              ? StartupPlanPoints(
                  plandata?.maxEvents,
                  plandata?.userCredits,
                  plandata?.extraChargesForCredits?.$numberDecimal,
                  plandata?.allowedEvents
                ).map((e, i) => {
                  return (
                    <div className="feature" key={`starter${i}`}>
                      <Image2 /> {e}
                    </div>
                  );
                })
              : plandata?.name?.includes("Premium")
              ? PremiumPlanPoints(
                  plandata?.maxEvents,
                  plandata?.userCredits,
                  plandata?.allowedEvents
                ).map((e, i) => {
                  return (
                    <div className="feature" key={`starter${i}`}>
                      <Image2 /> {e}
                    </div>
                  );
                })
              : null}
          </div>
          <button className="host_button" style={{ width: "90%" }}>
            {selectedChart === plandata?._id ? <Image3 /> : <Image1 />}
            Host Event
          </button>
        </div>
      </div>
    </div>
  );
};

const NewPricing = () => {
  const { getAllPricingPlans, pricingPlans } = useContext(siteControlContext);

  const [selectedChart, setSelectedChart] = useState("Premium");
  const [selectedTime, setSelectedTime] = useState("monthly");

  const [showPlanArray, setShowPlanArray] = useState([]);
  const { SelectNewEventPlan } = useContext(paymentContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleTimeClick = (Time) => {
    setSelectedTime(Time);
  };

  useEffect(() => {
    getAllPricingPlans();
    mixpanel.track("Page Visit")
  }, []);

  useEffect(() => {
    let arr = pricingPlans?.filter((e) => {
      return e?.subscriptionType === selectedTime;
    });
    setShowPlanArray(arr);
  }, [selectedTime, pricingPlans]);

  const handleSelectPlan = async (planName) => {
    if (localStorage.getItem("jwtToken")) {
      setIsLoading(true);

      let result = await SelectNewEventPlan(planName);

      if (result.success) {
        toast.success("Plan Activated Successfully", {
          position: "top-center",
          autoClose: 1000,
        });

        setTimeout(() => {
          setIsLoading(false);
          window.open("/dashboard", "_self");
        }, 1000);
      } else {
        setIsLoading(false);
        toast.error("Some error occured in selecting the plan", {
          position: "top-center",
          autoClose: 1500,
        });
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {isLoading && <LoadThree />}
      <EventsNavbar showPricingButton={false} position="absolute" />
      <div className="Billing_page">
        <div className="Billing">
          <div style={{ display: "flex", gap: "15px" }}>
            <h1>Our Pricing</h1>
            <h1 className="is_simple">is Simple</h1>
          </div>
          <div className="sub_heading">
            {/* <h3>
              No Setup & Monthly Cost waived off till 31st March We only earn if
              you earn
            </h3> */}
            <div className="time_buttons">
              <button
                className={`${selectedTime === "monthly" ? "selected" : ""}`}
                onClick={() => {handleTimeClick("monthly");mixpanel.track("monthly")}}
              >
                Monthly
              </button>
              <button
                className={`${selectedTime === "quarterly" ? "selected" : ""}`}
                onClick={() => {handleTimeClick("quarterly");mixpanel.track("quarterly")}}
              >
                Quarterly
              </button>
              <button
                className={`${selectedTime === "yearly" ? "selected" : ""}`}
                onClick={() => {handleTimeClick("yearly");mixpanel.track("yearly")}}
              >
                Yearly
              </button>
            </div>
          </div>
          <div class="square"></div>

          <div className="price_chart">
            {showPlanArray?.map((plan) => {
              return (
                <PricingBox
                  plandata={plan}
                  selectedChart={selectedChart}
                  setSelectedChart={setSelectedChart}
                />
              );
            })}

            <PricingBox
              customCard={true}
              selectedChart={selectedChart}
              setSelectedChart={setSelectedChart}
              plandata={{ _id: "custom" }}
            />
          </div>
          <div className="table-container">
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>
                    <h1>Compare plans</h1>
                    <h3>Find one that’s right for you</h3>
                  </th>
                  <th>
                    <h1>Starter Plan</h1>
                    {/* <button onClick={()=>{handleSelectPlan("Free Trial")}}> */}
                    <button>
                      <Image4 /> Start Free Trial
                    </button>
                  </th>
                  <th>
                    <h1>Premium Plan</h1>
                    <button>
                      <Image4 /> Start Free Trial
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- Rows --> */}
                {showPlanArray &&
                  ComparePoints(
                    showPlanArray[0]?.maxEvents,
                    showPlanArray[0]?.userCredits,
                    showPlanArray[0]?.extraChargesForCredits?.$numberDecimal
                  )?.map((e, key) => {
                    return (
                      <tr key={`row${key}`}>
                        <td>
                          <div style={{ marginLeft: "20px" }}>{e?.point}</div>
                        </td>
                        <td>
                          {e?.starterText ?? (e?.starter ? <Image2 /> : "-")}
                        </td>
                        <td>
                          {e?.premiumText ?? (e?.premium ? <Image2 /> : "-")}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <MainNewFooter
        onEvents={true}
        footerOptions1={[
          {
            title: "Event Pricing",
            link: "https://www.anchors.in/eventpricing",
          },
          {
            title: "Sample Event Page",
            link: "https://www.anchors.in/e/how-to-become-a-product-manager",
          },
          {
            title: "Sample Referral Page",
            link: "https://www.anchors.in/static/success",
          },
        ]}
        noPrivacyPolicy={false}
        noRefund={false}
        useEventsLogo={true}
      />
      <ToastContainer />
      <SuperSEO title="Anchors - Pricing" />
    </>
  );
};
export default NewPricing;
