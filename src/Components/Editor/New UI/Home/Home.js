import React, { useContext, useEffect, useState } from "react";
import CreatorInfo from "../../../Modals/CreatorProfile/Modal1";
import Dashboard from "../Dashboard/Dashboard";
import Navbar from "../Navbar/Navbar";
import ServiceDetailPage from "../ServiceDetail/ServiceList";
import Sidebar from "../SideBar/Sidebar";
import "./Home.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import EditProfile from "../EditProfile/EditProfile";
import { creatorContext } from "../../../../Context/CreatorState";
import { toast, ToastContainer } from "react-toastify";
import { feedbackcontext } from "../../../../Context/FeedbackState";
import UserReviews from "../UserReviews/UserReviews";
import Users from "../userList/Users";
import PaymentSummary from "../Payment Summary/paymentSummary";
import PaymentInfo from "../Payment Information/PaymentInfo";
import { LoadOne } from "../../../Modals/Loading";
import { linkedinContext } from "../../../../Context/LinkedinState";
import HelpModal from "../../../Modals/ModalType01/HelpModal";
import {
  CreatorFeedbackModal,
  OTPVerificationModel,
} from "../../../Modals/CreatorProfile/CreatorFeedback";
import DefaultBanner from "../../../Modals/Default Banner/DefaultBanner";
import NoMobileScreen from "../../../Layouts/Error Pages/NoMobileScreen";
import EditEvent from "../Edit Services/EditEvent";
import ServiceStats2 from "../ServiceStats/ServiceStats2";
import Template from "../Sharing Template/Sharing";
import { siteControlContext } from "../../../../Context/SiteControlsState";
import CreateEvent from "../../../../Pages/Dashboard/CreateEvent/CreateEvent";
import mixpanel from "mixpanel-browser";
import logo from "../../../../Utils/Images/logo-invite-only.png";
import SelectCertificate from "../../../EventCertifcates/SelectCertificate";
import GraphicsTemplate from "../../../../Pages/Dashboard/GraphicsTemplate/GraphicsTemplate";
import EditSuccess from "../EditProfile/EditSuccess";

function Home(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openCreatorInfo, setopenCreatorInfo] = useState(false);
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const [openFirstTimeModal, setOpenFirstTimeModal] = useState(false);
  const [openOTPModal, setOpenOTPModal] = useState(false);
  const [openCreatorFbModal, setOpenCreatorFbModal] = useState(false);
  const [openDefaultBannerModal, setOpenDefaultBannerModal] = useState(false);
  const [dataDefaultBanner, setDataDefaultBanner] = useState({
    fillingData: {},
    finalFormData: {},
  });
  const [Rating, setRating] = useState("");
  const [creatorData, setcreatorData] = useState({
    Reviews: "",
    Services: "",
    Events: "",
  });
  const {
    getAllCreatorInfo,
    allCreatorInfo,
    basicNav,
    getCreatorExtraDetails,
  } = useContext(creatorContext);

  const { getRatingCreator } = useContext(feedbackcontext);
  const { setShortSidebar } = useContext(siteControlContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    let array = ["/dashboard/createevent"];

    if (array.includes(location.pathname)) {
      setShortSidebar(true);
    } else {
      setShortSidebar(false);
    }

    // page reload warning -------------
    window.addEventListener('beforeunload', function (event) {
      const confirmationMessage = 'Are you sure you want to leave?';
    
      // Check if the user is on the desired pages
      const allowedPages = ['/dashboard/createevent']; // Replace with your actual pathnames
      const currentPathname = window.location.pathname;
    
      if (allowedPages.includes(currentPathname)) {
        // Standard for most browsers
        event.returnValue = confirmationMessage;
    
        // For some older browsers
        return confirmationMessage;
      }
    });

  }, [location]);

  useEffect(() => {
    if (localStorage.getItem("jwtToken") && localStorage.getItem("c_id")) {
      getCreatorExtraDetails().then((e) => {
        setcreatorData({
          ...creatorData,
          Reviews: e?.data?.reviews,
          Services: e?.data?.services,
          Events: e?.data?.events,
        });
      });

      getAllCreatorInfo().then((e) => {
        getRatingCreator(e).then((e1) => {
          setRating(e1);
        });
      });
    }
    // eslint-disable-next-line
  }, [localStorage.getItem("jwtToken")]);

  useEffect(() => {
    if (!allCreatorInfo?.phone) {
      setOpenOTPModal(true);
    } else {
      setOpenOTPModal(false);
    }
  }, [allCreatorInfo]);

  return (
    <>
      {/* at /check the loader comes into role */}
      {/* {location.pathname === "/dashboard/check" && <LoadOne />} */}

      {localStorage.getItem("jwtToken") &&
        localStorage.getItem("c_id") &&
        basicNav?.name &&
        // checking for the status and hence removing all other routes-------------
        (window.screen.width < 600 ? (
          // mobile controlling page --------------
          <div className="main_home_page_container">
            <HelpModal
              open={openHelpModal}
              toClose={() => {
                setOpenHelpModal(false);
              }}
            />

            <CreatorFeedbackModal
              open={openCreatorFbModal}
              onClose={() => {
                setOpenCreatorFbModal(false);
              }}
            />

            {/* OTP modal for event side --------------- */}
            {openOTPModal && (
              <OTPVerificationModel
                onClose={() => {
                  setOpenOTPModal(false);
                }}
              />
            )}

            {/* Default Banner modal controlled through craete service -------- */}
            <DefaultBanner
              open={openDefaultBannerModal}
              onClose={() => {
                setOpenDefaultBannerModal(false);
              }}
              dataToRender={dataDefaultBanner?.fillingData}
              setFinalData={(formdata, mobFormData, objectUrl) => {
                setDataDefaultBanner({
                  ...dataDefaultBanner,
                  finalFormData: formdata,
                  mobileFinalFormData: mobFormData,
                  objectUrl,
                });
              }}
            />

            {/* page with navigation of sidebar and navbar */}
            <section className="mobile_ui_home_having_navigation">
              {![
                "/dashboard/createservice",
                "/dashboard/createevent",
                "/dashboard/editprofile",
              ].includes(location.pathname) && (
                <Sidebar
                  userData={basicNav}
                  moreInfo={{ ...creatorData, Rating }}
                  alternateInfo={allCreatorInfo}
                />
              )}

              <div className="right_side_home_page">
                <Navbar
                  ModalState={openCreatorInfo}
                  ChangeModalState={(e) => setopenCreatorInfo(e)}
                  userData={basicNav}
                  alternateInfo={allCreatorInfo}
                />

                <CreatorInfo
                  open={openCreatorInfo}
                  userData={basicNav}
                  alternateInfo={allCreatorInfo}
                  openFb={() => {
                    setOpenCreatorFbModal(true);
                  }}
                  openHelp={() => {
                    setOpenHelpModal(true);
                  }}
                  moreInfo={{ ...creatorData, Rating }}
                  toClose={() => {
                    setopenCreatorInfo(false);
                  }}
                />

                <div className="remaining">
                  {/* if invite code does not exist then it should be created ------------------------------- */}
                  {!basicNav?.inviteCode ? (
                    <Routes>
                      <Route
                        path="/*"
                        element={
                          <EditProfile
                            progress={props.progress}
                            moreInfo={{ ...creatorData, Rating }}
                          />
                        }
                      />
                    </Routes>
                  ) : (
                    <Routes>
                      {/* Dashboard Route ---------------------------------------------------- */}
                      <Route
                        path="/"
                        element={
                          <Dashboard
                            setOpenFirstTimeModal={setOpenFirstTimeModal}
                            reviews={creatorData?.Reviews}
                            userData={basicNav}
                          />
                        }
                      />

                      {/* Service List Route ---------------------------------------------------- */}
                      <Route
                        path="mycontents"
                        element={
                          <ServiceDetailPage progress={props.progress} />
                        }
                      />

                      {/* Create event route */}
                      <Route
                        path="createevent"
                        element={
                          <CreateEvent
                            progress={props.progress}
                            openDefaultBanner={() => {
                              setOpenDefaultBannerModal(true);
                            }}
                            cname={allCreatorInfo?.name ?? basicNav?.name}
                            ctagline={allCreatorInfo?.tagLine}
                            cemail = {basicNav?.email}
                            crating={Rating}
                            cprofile={
                              allCreatorInfo?.profile ?? basicNav?.photo
                            }
                            setDefaultBannerData={(e) =>
                              setDataDefaultBanner({
                                ...dataDefaultBanner,
                                fillingData: e,
                              })
                            }
                            FinalDefaultBannerFormData={
                              dataDefaultBanner?.finalFormData
                            }
                          />
                        }
                      />
                      <Route
                        path="editprofile"
                        element={
                          <EditProfile
                            progress={props.progress}
                            moreInfo={{ ...creatorData, Rating }}
                          />
                        }
                      />
                      <Route
                        path="editevent/:slug"
                        element={
                          <EditEvent
                            progress={props.progress}
                            openDefaultBanner={() => {
                              setOpenDefaultBannerModal(true);
                            }}
                            setDefaultBannerData={(e) =>
                              setDataDefaultBanner({
                                ...dataDefaultBanner,
                                fillingData: e,
                              })
                            }
                            FinalDefaultBannerFormData={
                              dataDefaultBanner?.finalFormData
                            }
                            cname={allCreatorInfo?.name}
                          />
                        }
                      />
                      <Route
                        path="reviews"
                        element={
                          <UserReviews
                            progress={props.progress}
                            creatorSlug={basicNav?.slug}
                          />
                        }
                      />
                      <Route
                        path="servicereviews/:slug"
                        element={
                          <UserReviews
                            progress={props.progress}
                            creatorSlug={basicNav?.slug}
                          />
                        }
                      />

                      <Route
                        path="servicestats/:slug"
                        element={<ServiceStats2 progress={props.progress} />}
                      />
                      <Route
                        path="paymentSummary"
                        element={<PaymentSummary progress={props.progress} />}
                      />
                      <Route
                        path="paymentInfo"
                        element={<PaymentInfo progress={props.progress} />}
                      />
                      <Route
                        path="viewUserDetails/:slug"
                        element={<Users progress={props.progress} />}
                      />

                      <Route
                        path="shareTemplate/:slug"
                        element={<Template progress={props.progress} />}
                      />

                      {/* exception  Route for false input ---------------------------------------------------- */}
                      <Route
                        path="/*"
                        element={
                          <Dashboard
                            reviews={creatorData?.Reviews}
                            setOpenFirstTimeModal={setOpenFirstTimeModal}
                          />
                        }
                      />
                    </Routes>
                  )}
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="main_home_page_container">
            {/* Sidebar is only available in some pages --------------- */}
            {!location.pathname.startsWith("/dashboard/eventCertificates/") ? (
              <Sidebar
                userData={basicNav}
                moreInfo={{ ...creatorData, Rating }}
                alternateInfo={allCreatorInfo}
              />
            ) : (
              <img
                onClick={() => {
                  navigate("/");
                  mixpanel.track("header logo");
                }}
                src={logo}
                alt=""
                className="logo_sidebar logo_nonSideBar"
              />
            )}
            <HelpModal
              open={openHelpModal}
              toClose={() => {
                setOpenHelpModal(false);
              }}
            />

            <CreatorFeedbackModal
              open={openCreatorFbModal}
              onClose={() => {
                setOpenCreatorFbModal(false);
              }}
            />

            {/* OTP modal for event side --------------- */}
            {openOTPModal && (
              <OTPVerificationModel
                onClose={() => {
                  setOpenOTPModal(false);
                }}
              />
            )}

            {/* Default Banner modal controlled through craete service -------- */}
            <DefaultBanner
              open={openDefaultBannerModal}
              onClose={() => {
                setOpenDefaultBannerModal(false);
              }}
              dataToRender={dataDefaultBanner?.fillingData}
              setFinalData={(formdata, mobFormData, objectUrl) => {
                setDataDefaultBanner({
                  ...dataDefaultBanner,
                  finalFormData: formdata,
                  mobileFinalFormData: mobFormData,
                  objectUrl,
                });
              }}
            />

            <div className="right_side_home_page">
              <Navbar
                ModalState={openCreatorInfo}
                ChangeModalState={(e) => setopenCreatorInfo(e)}
                userData={basicNav}
                alternateInfo={allCreatorInfo}
              />

              <CreatorInfo
                open={openCreatorInfo}
                userData={basicNav}
                alternateInfo={allCreatorInfo}
                openFb={() => {
                  setOpenCreatorFbModal(true);
                }}
                openHelp={() => {
                  setOpenHelpModal(true);
                }}
                moreInfo={{ ...creatorData, Rating }}
                toClose={() => {
                  setopenCreatorInfo(false);
                }}
              />

              <div className="remaining">
                {/* if invite code does not exist then it should be created ------------------------------- */}
                {!basicNav?.inviteCode ? (
                  <Routes>
                    <Route
                      path="/*"
                      element={
                        <EditProfile
                          progress={props.progress}
                          moreInfo={{ ...creatorData, Rating }}
                        />
                      }
                    />
                  </Routes>
                ) : (
                  <Routes>
                    {/* Dashboard Route ---------------------------------------------------- */}
                    <Route
                      path="/"
                      element={
                        <Dashboard
                          setOpenFirstTimeModal={setOpenFirstTimeModal}
                          reviews={creatorData?.Reviews}
                        />
                      }
                    />

                    {/* Service List Route ---------------------------------------------------- */}
                    <Route
                      path="mycontents"
                      element={<ServiceDetailPage progress={props.progress} />}
                    />

                    <Route
                      path="shareTemplate/:slug"
                      element={<Template progress={props.progress} />}
                    />

                    {/* Create event route */}
                    <Route
                      path="createevent"
                      element={
                        <CreateEvent
                          progress={props.progress}
                          openDefaultBanner={() => {
                            setOpenDefaultBannerModal(true);
                          }}
                          allCreatorInfo={allCreatorInfo}
                          cname={allCreatorInfo?.name ?? basicNav?.name}
                          ctagline={allCreatorInfo?.tagLine}
                          crating={Rating}
                          cemail = {basicNav?.email}
                          cprofile={allCreatorInfo?.profile ?? basicNav?.photo}
                          setDefaultBannerData={(e) =>
                            setDataDefaultBanner({
                              ...dataDefaultBanner,
                              fillingData: e,
                            })
                          }
                          FinalDefaultBannerFormData={
                            dataDefaultBanner?.finalFormData
                          }
                        />
                      }
                    />
                    <Route
                      path="editprofile"
                      element={
                        <EditProfile
                          progress={props.progress}
                          moreInfo={{ ...creatorData, Rating }}
                        />
                      }
                    />
                    <Route
                      path="setup/success"
                      element={
                        <EditSuccess
                          progress={props.progress}
                          moreInfo={{ ...creatorData, Rating }}
                        />
                      }
                    />

                    <Route
                      path="editevent/:slug"
                      element={
                        <EditEvent
                          progress={props.progress}
                          openDefaultBanner={() => {
                            setOpenDefaultBannerModal(true);
                          }}
                          setDefaultBannerData={(e) =>
                            setDataDefaultBanner({
                              ...dataDefaultBanner,
                              fillingData: e,
                            })
                          }
                          FinalDefaultBannerFormData={
                            dataDefaultBanner?.finalFormData
                          }
                          cname={allCreatorInfo?.name}
                        />
                      }
                    />
                    <Route
                      path="reviews"
                      element={
                        <UserReviews
                          progress={props.progress}
                          creatorSlug={basicNav?.slug}
                        />
                      }
                    />
                    <Route
                      path="servicereviews/:slug"
                      element={
                        <UserReviews
                          progress={props.progress}
                          creatorSlug={basicNav?.slug}
                        />
                      }
                    />
                    {/* 
                    <Route
                      path="stats"
                      element={
                        <Stats
                          progress={props.progress}
                          creatorSlug={basicNav?.slug}
                        />
                      }
                    /> */}

                    <Route
                      path="servicestats/:slug"
                      element={<ServiceStats2 progress={props.progress} />}
                    />

                    <Route
                      path="paymentSummary"
                      element={<PaymentSummary progress={props.progress} />}
                    />
                    <Route
                      path="paymentInfo"
                      element={<PaymentInfo progress={props.progress} />}
                    />

                    <Route
                      path="eventCertificates/:slug"
                      element={<SelectCertificate progress={props.progress} />}
                    />

                    <Route
                      path="graphicstemplate/:slug"
                      element={<GraphicsTemplate progress={props.progress} />}
                    />

                    <Route
                      path="viewUserDetails/:slug"
                      element={<Users progress={props.progress} />}
                    />

                    {/* exception  Route for false input ---------------------------------------------------- */}
                    <Route
                      path="/*"
                      element={
                        <Dashboard
                          reviews={creatorData?.Reviews}
                          setOpenFirstTimeModal={setOpenFirstTimeModal}
                        />
                      }
                    />
                  </Routes>
                )}
              </div>
            </div>
          </div>
        ))}
      <ToastContainer theme="dark" />
    </>
  );
}

export default Home;
