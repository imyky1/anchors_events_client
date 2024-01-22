import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../config/config";
import { toast } from "react-toastify";
import mixpanel from "mixpanel-browser";

export const linkedinContext = createContext();

const LinkedinState = (props) => {
  const navigate = useNavigate();
  const [loginInfo, setloginInfo] = useState({});
  const [truecallervalue, settruecallervalue] = useState({});

  const [verifiedData, setVerifiedData] = useState(null);

  const creatorLinkedinLogin = async () => {
    fetch(`${host}/login/creator/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(async (resJSON) => {
        if (resJSON.success) {
          const login = resJSON.res;
          setloginInfo(login);
          await registerCreatorLogin(
            login.id,
            "",
            login.name,
            login.email,
            login.photo
          );
        } else {
          toast.error("Login Failed! Please Try Again", {
            position: "top-center",
            autoClose: 1500,
          });
          navigate("/login");
        }
      })
      .catch((error) => {
        toast.error("Login Failed! Please Try Again", {
          position: "top-center",
          autoClose: 1500,
        });
        navigate("/login");
      });
  };

  const creatorGoogleLogin = async () => {
    fetch(`${host}/google/login/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(async (resJson) => {
        if (resJson.success) {
          const login = resJson.res;
          setloginInfo(login);
          await registerCreatorLogin(
            "",
            login.id,
            login.name,
            login.email,
            login.photo
          );
        } else {
          toast.error("Login Failed! Please Try Again", {
            position: "top-center",
            autoClose: 1500,
          });
          navigate("/login");
        }
      })
      .catch((error) => {
        toast.error("Login Failed! Please Try Again", {
          position: "top-center",
          autoClose: 1500,
        });
        navigate("/login");
      });
  };

  // Creator signup function --------------------------------------------------
  const registerCreatorLogin = async (
    linkedinID,
    googleID,
    name,
    email,
    photo
  ) => {
    try {
      const userdata = await userIp();
      let slugurl = name.split(" ").join("");
      const count = await getslugcountcreator(slugurl.toLowerCase());
      let slugurl2 =
        count?.count === 0
          ? slugurl.toLowerCase()
          : slugurl.toLowerCase().concat("", `${count?.count}`);

      const response = await fetch(`${host}/api/creator/eventSide/newCreator`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          linkedinID,
          googleID,
          name,
          email,
          photo,
          slug: slugurl2,
          location: userdata,
        }),
      });
      const res = await response.json();
      if (res?.success) {
        //Identify and track the user in Mixpanel
        mixpanel.identify(email);

        // if mixpanel has already props set then it would not be updated
        mixpanel.people.set_once({
          $first_name: name.split(" ")[0],
          $last_name: name.split(" ")[1],
          $email: email,
          isCreator: true,
        });

        localStorage.setItem("jwtToken", res.jwtToken);
        localStorage.setItem("c_id", res.slug);
        window.open("/dashboard", "_self");
      } else {
        toast.error("Login Failed! Please Try Again", {
          position: "top-center",
          autoClose: 1500,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      toast.info("Some error occured!!", {
        position: "top-center",
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  // login for manual email process -----------------
  const CreatorLoginThoughEmail = async (email) => {
    try {
      const response = await fetch(
        `${host}/api/creator/eventSide/loginCreatorThroughEmail`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({
            email,
          }),
        }
      );
      const res = await response.json();
      return res;
    } catch (error) {
      console.error(error);
      toast.info("Some error occured!!", {
        position: "top-center",
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  // get slug count for creator
  const getslugcountcreator = async (slug,creatorID) => {
    const response = await fetch(`${host}/api/creator/getslugcount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({ slug: slug,creatorID:creatorID }),
    });
    const json = await response.json();
    if (json.success) {
      return json;
    } else {
      console.log("Some error Occured");
    }
  };

  // get status of a creator
  const getStatus = async (jwtToken) => {
    const response = await fetch(`${host}/api/creator/getstatus`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "jwt-token": jwtToken,
      },
    });
    const json = await response.json();
    if (json.success) {
      return json.res.status;
    } else {
      console.log(json.error);
    }
  };

  // Google user login
  const usergooglelogin = async () => {
    fetch(`${host}/google/login/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resJson) => {
        if (resJson.success) {
          const login = resJson.res;
          localStorage.setItem("user", login.name);
          setloginInfo(login);
          registerUserLogin(login.id, login.name, login.email, login.photo);
        } else {
          toast.error("Login Failed! Please Try Again", {
            position: "top-center",
            autoClose: 1500,
          });
        }
      })
      .catch((error) => {
        toast.error("Login Failed! Please Try Again", {
          position: "top-center",
          autoClose: 1500,
        });
      });
  };

  const loginlinkedinUser = async () => {
    fetch(`${host}/login/user/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((resJson) => {
        if (resJson.success) {
          const login = resJson.res;
          localStorage.setItem("user", login.name);
          setloginInfo(login);
          registerUserLogin(login.id, login.name, login.email, login.photo);
        } else {
          toast.error("Login Failed! Please Try Again", {
            position: "top-center",
            autoClose: 1500,
          });
        }
      })
      .catch((error) => {
        toast.error("Login Failed! Please Try Again", {
          position: "top-center",
          autoClose: 1500,
        });
      });
  };

  const registerUserLogin = async (id, name, email, photo) => {
    const userdata = await userIp();
    const response = await fetch(`${host}/api/user/newUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        linkedinID: `${localStorage.getItem("from") === "google" ? "" : id}`,
        googleID: `${localStorage.getItem("from") !== "google" ? "" : id}`,
        name,
        email,
        photo,
        location: userdata,
      }),
    });
    localStorage.removeItem("from");
    const res = await response.json();
    if (res.success) {
      // Determine if user is signing up or logging in
      const isSigningUp = !res.already;

      // Set user-related data in local storage
      localStorage.setItem("isUser", true);
      localStorage.setItem("jwtToken", res.jwtToken);

      //Identify and track the user in Mixpanel
      mixpanel.identify(email);

      // if mixpanel has already props set then it would not be updated
      mixpanel.people.set_once({
        $first_name: name.split(" ")[0],
        $last_name: name.split(" ")[1],
        $email: email,
      });

      // // Track user signup event and set initial properties if applicable
      if (isSigningUp) {
        mixpanel.people.set_once({
          $first_name: name.split(" ")[0],
          $last_name: name.split(" ")[1],
          $email: email,
        });
      }

      // Perform any necessary navigation
      navigate(localStorage.getItem("url"));
    } else {
      toast.error("Login Failed! Please Try Again", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  const truecallerlogin = async () => {
    window.location =
      "truecallersdk://truesdk/web_verify?requestNonce=515115151215&partnerKey=VfJBw0e9c586386864769b56aa850f1f66efc&partnerName=Anchors&lang=en&title=signUp";

    setTimeout(function () {
      if (document.hasFocus()) {
        alert("Truecaller not present");
      } else {
        // Truecaller app present on the device and the profile overlay opens
        // The user clicks on verify & you'll receive the user's access token to fetch the profile on your
        // callback URL - post which, you can refresh the session at your frontend and complete the user  verification
        setTimeout(async () => {
          const response = await fetch(
            "https://www.anchors.in:5000/truecaller/auth",
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
            }
          );
          const json = await response.json();
          settruecallervalue(json);
          localStorage.setItem("isUser", true);
          localStorage.setItem("from", "truecaller");
          localStorage.setItem("url", "c/himanshu-shekhar");
          localStorage.setItem(
            "user",
            json.userdata?.name?.first + " " + json.userdata?.name?.last
          );

          await registerTruecallerLogin(
            json.userdata?.id,
            json.userdata?.name?.first + " " + json.userdata?.name?.last,
            json.userdata?.onlineIdentities?.email,
            json.userdata?.avatarUrl ? json.userdata?.avatarUrl : "",
            json.userdata?.phoneNumbers[0]
          );
        }, 3000);
      }
    }, 600);
  };

  const registerTruecallerLogin = async (
    id,
    name,
    email,
    photo,
    phoneNumber
  ) => {
    const userdata = await userIp();
    const response = await fetch(`${host}/api/user/newUsertruecaller`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        linkedinID: "",
        googleID: "",
        truecallerID: id,
        name,
        photo,
        email,
        location: userdata,
        phoneNumber,
      }),
    });
    localStorage.removeItem("from");
    const res = await response.json();
    if (res.success) {
      if (!res.already) {
        mixpanel.alias(email);
        mixpanel.people.set_once({
          Type: "user",
          $first_name: name.split(" ")[0],
          $last_name: name.split(" ")[1],
          $email: email,
        });
      }
      localStorage.setItem("isUser", true);
      localStorage.setItem("jwtToken", res.jwtToken);
      mixpanel.identify(email);
      setTimeout(() => {
        navigate(localStorage.getItem("url"));
      }, 1000);
    } else {
      toast.error("Login Failed! Please Try Again", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  };

  // Route : GET user IP ADDRESS and location
  const userIp = async () => {
    const response = await fetch(
      "https://api64.ipify.org/?format=json"
      //method:"GET",
      //{mode:"no-cors"}
      //headers: {
      //  Accept: "application/json",
      //  "Access-Control-Allow-Credentials": true
      //}
    );
    const json = await response.json();
    const loc = await userLocData(json.ip);

    const data = {
      ip: loc.ip,
      city: loc.city,
      country: loc.country_name,
      latitude: loc.latitude,
      longitude: loc.longitude,
    };
    return data;
  };

  const userLocData = async (ip) => {
    const response = await fetch(
      `https://ipapi.co/${ip}/json/`
      //method:"GET",
      //mode:"no-cors",
      //headers: {
      //  Accept: "application/json",
      //  "Access-Control-Allow-Credentials": true
    );
    const json = await response.json();
    return json;
  };

  // check and verify the user login ------------------------
  const checkAndGetUserData = async () => {
    const response = await fetch(`${host}/login/event/verifyAndGetUser`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "jwt-token": localStorage.getItem("jwtToken"),
      },
    });
    const res = await response.json();

    // no problem in accessing i.e user is verified
    if (res?.success) {
      setVerifiedData({
        data: res?.data,
        planActivated: res?.planActivated,
      });
    } else {
      if (res?.logout) {
        // logout the user ----------------
        localStorage.removeItem("isUser");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("from");
        localStorage.removeItem("url");
        localStorage.removeItem("user");
        localStorage.removeItem("c_id");
        mixpanel.reset();
        
        toast.info(res?.error, {
          position: "top-center",
          autoClose: 2500,
        });

        setTimeout(() => {
          if(res?.inviteOnly){
            window.open("https://www.anchors.in","_self")
          }
          else{
            navigate("/");
          }
        }, 2500);

      } else {
        toast.error(res?.error,
          {
            position: "top-center",
            autoClose: 1500,
          }
        );
      }
    }
  };

  return (
    <linkedinContext.Provider
      value={{
        usergooglelogin,
        loginlinkedinUser,
        creatorLinkedinLogin,
        creatorGoogleLogin,
        getStatus,
        registerTruecallerLogin,
        truecallerlogin,
        loginInfo,
        truecallervalue,
        registerCreatorLogin,
        CreatorLoginThoughEmail,
        checkAndGetUserData,
        verifiedData,
        getslugcountcreator
      }}
    >
      {props.children}
    </linkedinContext.Provider>
  );
};

export default LinkedinState;
