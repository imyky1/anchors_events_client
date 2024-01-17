import "./App.css";
import { Routes, Route } from "react-router-dom";
import ServiceState from "./Context/services/ServiceState";
import Creators_login from "./Components/Login/Creators/Login2";
import CreatorState from "./Context/CreatorState";
import UserState from "./Context/UserState";
import { useContext, useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { linkedinContext } from "./Context/LinkedinState";
import FeedbackState from "./Context/FeedbackState";
import Logout_Model from "./Components/Modals/Logout_Model";
import mixpanel from "mixpanel-browser";
import { mixPanelToken } from "./config/config.js";
import PaymentState from "./Context/PaymentState";
import EmailState from "./Context/EmailState";
import UserDashboardState from "./Context/userdashbaord";
import HomeUI from "./Components/Editor/New UI/Home/Home";
import Seo from "./Utils/Seo";
import EPAState from "./Context/EPAState";

// import fonts ---------------------
import "./fonts/Gilroy-Black.ttf";
import "./fonts/Gilroy-Bold.ttf";
import "./fonts/Gilroy-Medium.ttf";
import "./fonts/Gilroy-Light.ttf";
import "./fonts/Gilroy-SemiBold.ttf";
import "./fonts/Gilroy-Regular.ttf";
// import Signup from "./Components/Signup/Signup";
import Sample from "./Components/Editor/New UI/Sample Page/Sample";
import View from "./Developers/Dashboard/View";
import Login from "./Developers/Login/Login";
import PosterGenerator from "./Developers/Poster Generator/Form.js";
import NewPricing from "./Components/Pricing/New Pricing.js";
import Check from "./Pages/Check.js";

mixpanel.init(mixPanelToken, { debug: true });

function App() {
  const [progress, setprogress] = useState();

  const { checkAndGetUserData, verifiedData } = useContext(linkedinContext);

  const changeprogress = (progress) => {
    setprogress(progress);
  };

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      checkAndGetUserData();
    }
  }, [])

  return (
    <>
      <Seo />
      <ServiceState>
        <CreatorState>
          <PaymentState>
            <UserState>
              <EmailState>
                <EPAState>
                  <FeedbackState>
                    <UserDashboardState>
                      <LoadingBar color="#f11946" progress={progress} />
                      <Routes>
                        {/* Landing Page routes ---------------------------------------------------------- */}
                        <Route
                          path="/"
                          element={<Sample progress={changeprogress} />}
                        ></Route>
                        {/* Home route to creator dashboard ------------------------------------------------ */}
                        <Route
                          path="/dashboard/*"
                          element={<HomeUI progress={changeprogress} />}
                        ></Route>
                        <Route
                          path="/dashboard/check"
                          element={<Check progress={changeprogress} />}
                        ></Route>
                        {/* Logout routes ---------------------------------------------------------------------------- */}
                        <Route
                          path="/logout"
                          element={<Logout_Model progress={changeprogress} />}
                        />
                        {/* Login and Signup for creators -------------------------------------- */}{" "}
                        <Route
                          path="/login"
                          element={<Creators_login progress={changeprogress} />}
                        />
                        <Route
                          path="/pricing"
                          element={<NewPricing progress={changeprogress} />}
                        />
                        {/* Developer routes --------------------------------------------------------------- */}
                        <Route
                          path="/developer/admin"
                          element={<View />}
                        ></Route>
                        <Route
                          path="/developer/admin/generatePoster"
                          element={<PosterGenerator />}
                        ></Route>
                        <Route
                          path="/developer/login"
                          element={<Login />}
                        ></Route>
                      </Routes>
                    </UserDashboardState>
                  </FeedbackState>
                </EPAState>
              </EmailState>
            </UserState>
          </PaymentState>
        </CreatorState>
      </ServiceState>
    </>
  );
}

export default App;
