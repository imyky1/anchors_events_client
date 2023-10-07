import React, { useEffect } from "react";
import { LoadThree } from "../../Modals/Loading";
import { useNavigate } from "react-router-dom";
import { host } from "../../../config/config";

function Login2() {
  const navigate = useNavigate()

  useEffect(() => {
    if (
      localStorage.getItem("jwtToken") &&
      localStorage.getItem("isUser") === ""
    ) {
      navigate("/dashboard", "_self");
    }

    else{
      navigate(`/?openLogin=true`)
    }

  }, [])
  

  return (
    <>
      <LoadThree />
    </>
  );
}

export default Login2;
