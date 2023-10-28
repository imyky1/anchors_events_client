import React, { useState, useEffect } from "react";
import { host, jwtTokenDeveloper } from "../../config/config";
import { useNavigate } from "react-router-dom";
import "./View.css";
import Moment from "moment";
import { AiOutlineClose } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../Components/Layouts/Navbar Creator/Navbar";

const OtpModal = ({ onClose,cid,currentStatus }) => {
  const [data, setData] = useState();
  const [cookies, setCookie] = useCookies();

  const CheckOTP = async () => {
    if (data?.length !== 6) {
      toast.info("Enter a proper code", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      let code = cookies?.ccoondfe;
      if (!code) {
        toast.error("OTP was valid for 1 minute, Please retry again", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        if (parseInt(data) === parseInt(parseInt(code) / 562002)) {
          const response = await fetch(`${host}/api/developer/devChangeCreatorStatus`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
              "jwt-token": localStorage.getItem("jwtTokenD"),
            },
            body: JSON.stringify({ id: cid, status: currentStatus === 0 ? 1 : 0 }),
          });
          const json = await response.json();
          if(json.success){
            window.location.reload()
          }
          else{
            toast.error("Some error occured", {
              position: "top-center",
              autoClose: 2000,
            });
          }
        } else {
          toast.error("Invalid OTP!!!. Try again!!!", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="developer_Modal_outside_wrapper">
        <div className="developer_modal_container">
          <AiOutlineClose onClick={onClose} />
          <span>Enter OTP Code</span>
          <input
            type="number"
            value={data}
            onChange={(e) => {
              setData(e?.target?.value);
            }}
          />
          <button onClick={CheckOTP}>Submit</button>
        </div>
      </div>
    </>
  );
};

function View() {
  const [allcreators, setallcreators] = useState([]);
  const navigate = useNavigate();
  const [cookies, setCookie ,removeCookie] = useCookies();

  const getjwt = async (id, status) => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("c_id");
    const response = await fetch(`${host}/api/developer/getCreatorJwt`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "jwt-token": localStorage.getItem("jwtTokenD"),
      },
      body: JSON.stringify({ id: id, status: status }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("jwtToken", json.jwtToken);
      localStorage.setItem("c_id", "devloper_Creator");
      localStorage.setItem("isUser", "");
      localStorage.setItem("from","developer")
    }
  };

  useEffect(() => {
    const allcreators = async () => {
      const response = await fetch(`${host}/api/developer/getallCreatorEventSide`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Credentials": true,
          "jwt-token": localStorage.getItem("jwtTokenD"),
        },
      });
      const json = await response.json();
      if (json.success) {
        setallcreators(json.creators);
      } else {
        alert("You are not allowed to Access");
        document.querySelector(".logout_admin_panel")?.click();
      }
    };

    allcreators();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtTokenD");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isUser");
    localStorage.removeItem("isDev");
    localStorage.removeItem("c_id");
    removeCookie("devsession")
    navigate("/");
  };

  const handleClick = async (id, status) => {
    await getjwt(id, status).then(() => {
        window.open("/dashboard");
    });
  };


  if (localStorage.getItem("jwtTokenD") !== jwtTokenDeveloper || !localStorage.getItem("isDev") || !cookies.devsession) {
    handleLogout()
    window.open("/developer/login", "_self");
  }

  return (
    <>
      <div className="admin_container">
        <Navbar noAccount={true}/>
        <button onClick={handleLogout}>Logout</button>
        <div className="creator_display_list">
          {allcreators.length !== 0
            ? allcreators.map((e, index) => {
                const date = Moment(e?.createdOn).format().split("T")[0];
                const time = Moment(e?.createdOn)
                  .format()
                  .split("T")[1]
                  .split("+")[0];
                return (
                  <div
                    className="creator_item"
                    key={index}
                    onClick={() => handleClick(e?._id, e?.status)}
                  >
                    <div className="profile_creator">
                      <img src={e?.photo} alt="..." />
                      <span>{e?.name}</span>
                    </div>
                    <div className="other_details_creator">
                      <span className="email_creator">
                        <b>Email: </b> {e?.email}
                      </span>
                      <span className="slug_creator">
                        <b>Slug: </b> {e?.slug}
                      </span>
                      <span className="joined_creator">
                        <b>Joined On: </b> {date}, {time}
                      </span>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </>
  );
}

export default View;
