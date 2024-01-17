import React, { useContext } from "react";
import { LoadThree } from "../Components/Modals/Loading";
import { useEffect } from "react";
import { linkedinContext } from "../Context/LinkedinState";
import { useNavigate } from "react-router-dom";

const Check = () => {
  const {
    creatorLinkedinLogin,
    creatorGoogleLogin,
  } = useContext(linkedinContext);

  const navigate = useNavigate()


  useEffect(() => {
    if (localStorage.getItem("isUser") === "" && localStorage.getItem("from")) {
      if (localStorage.getItem("jwtToken")) {
        navigate("/dashboard")
      } else if (localStorage.getItem("from") === "linkedin") {
        creatorLinkedinLogin();
      } else if (localStorage.getItem("from") === "google") {
        creatorGoogleLogin();
      }
    }
    // not logined people
    else {
      window.open("https:/events.anchors.in/", "_self");
    }

    // eslint-disable-next-line
  }, []);


  return <LoadThree />;
};

export default Check;
