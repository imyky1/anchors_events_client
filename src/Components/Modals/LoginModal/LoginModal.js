import React, { useContext, useEffect, useState } from "react";
import "./LoginModal.css";
import { FcGoogle } from "react-icons/fc";
import { ImLinkedin2 } from "react-icons/im";
import { AiOutlineArrowLeft, AiOutlineMail } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import mixpanel from "mixpanel-browser";
import { host } from "../../../config/config";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { linkedinContext } from "../../../Context/LinkedinState";

const EmailFillingForm = ({ type, nextForm, formData, handleChange }) => {
  const [cookies, setCookie] = useCookies();

  const checkEmailBeforeSending = async () => {
    const response = await fetch(
      `${host}/api/creator/eventSide/checkCreatorExists`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          email: formData?.email,
        }),
      }
    );
    const json = await response.json();
    return json;
  };

  const sendingOTPFeature = async () => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailPattern.test(formData?.email)) {
      const response = await fetch(`${host}/api/email/sendOTPViaEmail`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          email: formData?.email,
          name: formData?.name,
        }),
      });
      const json = await response.json();
      if (json?.success) {
        toast.success("OTP sent successfully", {
          position: "top-center",
          autoClose: 2000,
        });

        let otpcode = parseInt(json.code - 5626) * 562002;
        setCookie("ccoondfe", otpcode, { maxAge: 120 }); // valid for two minute
        nextForm();
      }
    } else {
      toast.error("Enter a proper email address", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const sendOTP = async () => {
    let checkEmailResponse = await checkEmailBeforeSending();

    //  means proper event side user --------------------
    if (
      checkEmailResponse?.success &&
      checkEmailResponse?.already &&
      !checkEmailResponse?.redirectToMain
    ) {
      if (type === "login") {
        await sendingOTPFeature();
      } else {
        toast.info(
          "An account already exists for the same email, Please Login!!",
          {
            position: "top-center",
            autoClose: 3500,
          }
        );
        setTimeout(() => {
          window.open("/?openLogin=true", "_self");
        }, 3500);
      }
    }

    //  new creator with no history
    else if (checkEmailResponse?.success && !checkEmailResponse?.already) {
      if (type === "signup") {
        if (formData?.name?.length > 0) {
          await sendingOTPFeature();
        } else {
          toast.info("Fill all the details properly", {
            position: "top-center",
            autoClose: 1500,
          });
        }
      } else {
        toast.info("No such account exists, Please Signup!!", {
          position: "top-center",
          autoClose: 3500,
        });
        setTimeout(() => {
          window.open("/?openLogin=true", "_self");
        }, 3500);
      }
    }

    // already approved creator on anchors platform
    else if (
      checkEmailResponse?.success &&
      checkEmailResponse?.already &&
      checkEmailResponse?.redirectToMain
    ) {
      if (type === "login") {
        toast.info(
          "You are already approved on anchors platform, host the event there.",
          {
            position: "top-center",
            autoClose: 3500,
          }
        );

        setTimeout(() => {
          window.open("https://www.anchors.in", "_self");
        }, 3500);
      } else {
        toast.info(
          "An account already exists for the same email, Please Login!!",
          {
            position: "top-center",
            autoClose: 3500,
          }
        );
        setTimeout(() => {
          window.open("/?openLogin=true", "_self");
        }, 3500);
      }
    }

    //  all other cases ------------------------
    else {
      toast.info("Something wrong happened with the email", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <h2>{type === "login" ? "Login with E-mail" : "Signup with E-mail"}</h2>
      <span>Please fill your e-mail address.</span>

      <div className="login_modal_input_field">
        <input
          type="email"
          placeholder="Email address"
          name="email"
          id="email"
          onChange={handleChange}
        />
      </div>

      {type === "signup" && (
        <div className="login_modal_input_field">
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            onChange={handleChange}
          />
        </div>
      )}

      <button className="button01_login_modal" onClick={sendOTP}>
        Next
      </button>
    </>
  );
};

const OTPVerificationForm = ({ type, formData, handleChange }) => {
  const { registerCreatorLogin, CreatorLoginThoughEmail } =
    useContext(linkedinContext);

  const [cookies, removeCookie] = useCookies();

  const [invalidCode, setInvalidCode] = useState(false);

  const verfiyOTP = async () => {
    if (formData?.otp?.length !== 4) {
      toast.info("Enter a proper code", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      let code = cookies?.ccoondfe;
      if (!code) {
        toast.error("OTP was valid for 2 minute, Please retry again", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        if (parseInt(formData?.otp) === parseInt(parseInt(code) / 562002)) {
          toast.success("Verification was successfull", {
            position: "top-center",
            autoClose: 2000,
          });
          removeCookie("ccoondfe");

          // logic of login ---------------------------
          if (type === "login") {
            let result = await CreatorLoginThoughEmail(formData?.email);

            //  right creator on the right side ---------------------
            if (result?.success && result?.already) {
              //Identify and track the user in Mixpanel
              mixpanel.identify(result?.creator?.email);

              // if mixpanel has already props set then it would not be updated
              mixpanel.people.set_once({
                $first_name: result?.creator?.name.split(" ")[0],
                $last_name: result?.creator?.name.split(" ")[1],
                $email: result?.creator?.email,
                isCreator: true,
              });

              localStorage.setItem("jwtToken", result?.jwtToken);
              localStorage.setItem("c_id", result?.creator?.slug);
              localStorage.setItem("isUser", "");
              localStorage.setItem("from", "email");
              window.open("/dashboard", "_self");
            }

            // creator not found i.e new creator (rare condition beacuse it is checked earlier)
            else if (result?.success && !result?.already) {
              toast.info(
                "No account exists for the email, Please Signup to continue",
                {
                  position: "top-center",
                  autoClose: 2500,
                }
              );
              setTimeout(() => {
                window.open("/?openLogin=true", "_self");
              }, 2500);
            } else {
              toast.info("Some error occured!!", {
                position: "top-center",
                autoClose: 1500,
              });
              setTimeout(() => {
                window.open("/?openLogin=true", "_self");
              }, 1500);
            }
          } else if (type === "signup") {
            localStorage.setItem("isUser", "");
            localStorage.setItem("from", "email");
            
            let result = await registerCreatorLogin(
              null,
              null,
              formData?.name,
              formData?.email,
              null
            );
          }
        } else {
          setInvalidCode(true);
        }
      }
    }
  };

  return (
    <>
      <h2>OTP Verification</h2>
      <span style={{ fontSize: "12px" }}>
        An OTP has been sent to the email address{" "}
        <span style={{ textDecoration: "underline" }}>{formData?.email}</span>
      </span>

      <div className="login_modal_input_field">
        <input
          type="number"
          placeholder="OTP"
          name="otp"
          id="otp"
          onChange={handleChange}
        />
        <section>
          <span style={{ cursor: "pointer" }}>Resend </span>
          {invalidCode && <span style={{ color: "red" }}>Invalid OTP</span>}
        </section>
      </div>

      <button className="button01_login_modal" onClick={verfiyOTP}>
        Submit
      </button>
    </>
  );
};

const DefaultForm = ({ type, setType, nextForm }) => {
  const [agreeterms, setAgreeTerms] = useState(false);

  const handleGoogle = async () => {
    if (agreeterms || type === "login") {
      mixpanel.track("Event Side Login using Google");
      localStorage.setItem("isUser", "");
      localStorage.setItem("from", "google");
      localStorage.setItem("authFor", "login"); // to know if the page is login or signup
      window.open(`${host}/google/auth`, "_self");
    } else {
      toast.info("Agree the terms and conditions to continue", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handlelinkedin = async () => {
    if (agreeterms || type === "login") {
      mixpanel.track("Event Side Login using Linkedin");
      localStorage.setItem("isUser", "");
      localStorage.setItem("from", "linkedin");
      localStorage.setItem("authFor", "login");
      window.open(`${host}/login/auth/linkedin`, "_self");
    } else {
      toast.info("Agree the terms and conditions to continue", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleEmail = () => {
    if (agreeterms || type === "login") {
      nextForm();
    } else {
      toast.info("Agree the terms and conditions to continue", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <h2>{type === "login" ? "Login" : "Signup"}</h2>
      <span>
        {type === "login"
          ? "Please select option for Login."
          : "Welcome to anchors | events"}
      </span>

      <div className="button_section_login_modal">
        <button onClick={handleGoogle}>
          <FcGoogle /> Continue with Google
        </button>
        <button onClick={handlelinkedin}>
          <ImLinkedin2 style={{ color: "#2867B2" }} /> Continue with LinkedIn
        </button>
        <button onClick={handleEmail}>
          <AiOutlineMail />
          {type === "login" ? "Login with E-mail" : "Continue with E-mail"}
        </button>

        {type === "signup" && (
          <section>
            <input
              type="checkbox"
              name="t&cSignup"
              id="t&cSignup"
              onChange={(e) => {
                setAgreeTerms(e?.target?.checked);
              }}
            />

            <label htmlFor="t&cSignup">
              To proceed, kindly check the box to indicate your agreement with
              our{" "}
              <span
                style={{
                  color: "#0083FE",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e?.preventDefault();
                  window.open("https://www.anchors.in/termsConditions");
                }}
              >
                terms and conditions.
              </span>
            </label>
          </section>
        )}
      </div>

      <p>
        {type === "login"
          ? "Don’t have an account?"
          : "Already have an account?"}{" "}
        <span
          onClick={() => {
            type === "login" ? setType("signup") : setType("login");
          }}
        >
          {type === "login" ? "Signup" : "Login"}
        </span>
      </p>
    </>
  );
};

const LoginModal = ({ open, toClose, ModalType }) => {
  const [type, setType] = useState("login");
  const [formType, setFormType] = useState(0); // 0 for default , 1 for email , 2 for otp

  // data of the email signin ---------------
  const [formData, setFormData] = useState({ email: "", name: "", otp: null });

  useEffect(() => {
    if (open) {
      // Disable scrolling when the modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling when the modal is closed
      document.body.style.overflow = "auto";
    }

    // Cleanup function to enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  useEffect(() => {
    setType(ModalType);
  }, [ModalType]);

  const nextForm = () => {
    if (formType !== 2) {
      setFormType(formType + 1);
    }
  };

  const prevForm = () => {
    if (formType !== 0) {
      setFormType(formType - 1);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="checklist_outside_wrapper"
      // onClick={() => {
      //   toClose();
      // }}
    >
      <section
        className="checklist_main_container"
        onClick={(e) => {
          e?.stopPropagation();
        }}
      >
        {formType !== 0 && (
          <AiOutlineArrowLeft
            size={window.screen.width > 600 ? 25 : 20}
            className="chnageStatusModalCross"
            style={window.screen.width > 600 ? { left: "40px", top: "110px", right: "unset" } : {left:"20px",top:"20px"}}
            onClick={prevForm}
          />
        )}
        {formType === 0 && (
          <RxCross2
            size={window.screen.width > 600 ? 25 : 20}
            className="chnageStatusModalCross"
            style={window.screen.width > 600 ? { top: "110px" } :{top:"20px",right:"20px"}}
            onClick={() => {
              toClose();
            }}
          />
        )}

        {/* default form  ----------*/}
        {formType === 0 && (
          <DefaultForm type={type} setType={setType} nextForm={nextForm} />
        )}

        {formType === 1 && (
          <EmailFillingForm
            type={type}
            nextForm={nextForm}
            handleChange={handleChange}
            formData={formData}
          />
        )}

        {formType === 2 && (
          <OTPVerificationForm
            type={type}
            handleChange={handleChange}
            formData={formData}
          />
        )}
      </section>
    </div>
  );
};

export default LoginModal;
