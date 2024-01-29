import React, { useContext, useEffect, useMemo, useState } from "react";
import "./Users.css";
import ServiceContext from "../../../../Context/services/serviceContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { creatorContext } from "../../../../Context/CreatorState";
import { LoadTwo } from "../../../Modals/Loading";
import { SuperSEO } from "react-super-seo";
import Moment from "moment";
import { BsArrowLeftShort, BsArrowRight } from "react-icons/bs";
import { SlGraph } from "react-icons/sl";
import { Table1 } from "../Create Services/InputComponents/fields_Labels";
import { IoCopyOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { Button5 } from "../Create Services/InputComponents/buttons";
import { FaFileCsv } from "react-icons/fa";
import { CSVLink } from "react-csv";
function Users(props) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getUserDetails, allUserDetails } = useContext(creatorContext);
  const {compareJWT, geteventinfo, eventInfo } =
    useContext(ServiceContext);
  const [openLoading, setopenLoading] = useState(false);
  const [approvedUser, setapprovedUser] = useState(false); // check if user searching is appropriate
  const [category,setCategory] = useState("Registered_Users")

  // Checking if the user is only able to check its data not others-------------------
  useEffect(() => {
    props.progress(0);
      geteventinfo(slug).then((e) => {
        compareJWT(e[0]?._id).then((e) => {
          if (e) {
            setapprovedUser(true);
            props.progress(100);
          } else {
            navigate("/dashboard/mycontents");
          }
        });
      }); 
  }, []);
  useEffect(() => {
    // Get the current URL search parameters
    const params = new URLSearchParams(window.location.search);

    // Access query parameters
    const param1 = params.get('category');
    setCategory(param1 || "Registered_Users")
  }, []);

  useEffect(() => {
    setopenLoading(true);
    getUserDetails(eventInfo?.event?._id,).then((e) => {
      setopenLoading(false);
    });
  }, [eventInfo]);

  const renderdate1 = (date) => {
    let a = new Date(date);
    let b = a.toISOString();
    const splity = b.split("T");
    return splity[0];
  };

  const renderdate2 = (date) => {
    let a = new Date(date);
    // console.log(a)
    let b = a.toString();
    // console.log(b)
    const splity = b.split(" ");
    return splity[4].slice(0, 8);
  };

  const date = Moment(
    eventInfo?.event?.createdOn
  ).format().split("T")[0];

  const time = Moment(eventInfo?.event?.createdOn)
          .format()
          .split("T")[1]
          .split("+")[0];

  // hides the email -----------------------
  // const hiddenEmail = (email) => {
  //   let email2 =
  //     email?.split("@")[0].length > 6
  //       ? email?.split("@")[0].substr(0, 5) + "....@" + email?.split("@")[1]
  //       : email?.split("@")[0].substr(0, 3) + "....@" + email?.split("@")[1];

  //   return email2;
  // };
  const handleCategory = (category) =>{
    setCategory(category)
  }
  const totalAmount = allUserDetails.reduce(
    (acc, ele) => acc + (ele?.amount || 0),
    0
  );
  const getTableHeadArray = () => {
    if (category === "Registered_Users"){
      return [
        "Name",
        "Email ID",
        "Phone Number",
        "Location",
        "Registered on",
        "Amount Paid",
        "No. of WhatsApp Sent",
        "No. of Emails Sent",
        "Referred By"
      ]
    }
    else if (category === "Activity_Email_WA"){
      return [
        "Name",
        "Email ID",
        "Phone Number",
        "Location",
        "Registered on",
        "Amount Paid",
        "No. of WhatsApp Sent",
        "No. of Emails Sent",
        "Referred By"
      ]
    }
    else {
      return [
        "Name",
        "Email ID",
        "Phone Number",
        "Location",
        "Registration Attempted",
        "Status"
      ]
    }
  }
  const getGridConfig = () => {
    if (category === "Registered_Users"){
      return "11% 21% 11% 8% 7% 7% 13% 13% 7%"
    }
    else if(category === "Activity_Email_WA"){
      return "6% 15% 10% 10% 10% 10% 14% 12% 8%"
    }
    else{
      return "6% 25% 20% 15% 20% 14%"
    }
  }
  const [csvData, setCsvData] = useState([]);

  const handleExportCsv = () => {
    const data = allUserDetails?.filter((e)=>{return category === "Registered_Users" ? e?.status === 1 : category === "Abandoned_Cart" ? e?.status === 0 : !e})?.map((elem) => {
      if(category === "Registered_Users"){
        return {
          Name: elem?.userID?.name || "--",
          Email: elem?.userID?.email || "--",
          Mobile_Number:elem?.userID?.phoneNumber || "--",
          location : elem?.userID?.location?.city ||  "---",
          Order_Date : renderdate1(elem?.orderDate) + "," + renderdate2(elem?.orderDate),
          Amount : elem?.amount || "--",
          // whatsapp : elem?.whatsapp || "--",
          // Email : elem?.email || "--",
          Reffered_from : elem?.referredFrom ? "Yes" : "No"
        };
      }
      
      // else if (category === "Activity_Email_WA"){
      //   return {
      //     Name: elem?.userID?.name || "--",
      //     Email: elem?.userID?.email || "--",
      //     Mobile_Number:elem?.userID?.phoneNumber || "--",
      //     location : elem?.userID?.location?.city ||  "---",
      //     Order_Date :               <span>
      //                     {renderdate1(elem?.orderDate)}
      //                     <br></br>
      //                     {renderdate2(elem?.orderDate)}
      //                   </span> || "--",
      //     Amount : elem?.amount || "--",
      //     whatsapp : elem?.whatsapp || "--",
      //     Email : elem?.email || "--",
      //     Reffered_from :elem?.referredFrom ? "Yes" : "No"
      //   }
      // }
      else {
        return {
          Name: elem?.userID?.name || "--",
          Email: elem?.userID?.email || "--",
          Mobile_Number:elem?.userID?.phoneNumber || "--",
          location : elem?.userID?.location?.city ||  "---",
          Order_Date : renderdate1(elem?.orderDate) + "," + renderdate2(elem?.orderDate),
          Status : elem?.status || "--"
        }
      }
    });

    // Update the CSV data state
    setCsvData(data);
  };
  useEffect(() => {
    handleExportCsv();
  }, [allUserDetails,category]);

  
  return (
    <>
      {(openLoading || !approvedUser) && <LoadTwo open={openLoading} />}

      {/* it can be seen only if the user is approved ----------------------------- */}
      {approvedUser && (
        <div className="servicelist-wrapper">
          {/* MObile ui navbar ---------------- */}
          {window.screen.width < 600 && (
            <section className="navbar_ui_covering_section_mobile_active">
              <BsArrowLeftShort
                size={22}
                onClick={() => {
                    navigate(-1)
                }}
              />
              User List for {eventInfo?.event?.sname}
            </section>
          )}

          {window.screen.width > 600 && (
            <section
              className="service_stats_page_title_section"
              style={{ marginBottom: "20px" }}
            >
              <h1 style={{color:"#E2E8F0"}}>
                Event Name : <span style={{fontWeight:"400",fontSize:""}}>{eventInfo?.event?.sname.slice(0,40)}...</span>
              </h1>
            </section>
          )}
          <div className="service_category_selection_buttons">
                <Button5 className={category==="Registered_Users"?"Selected":""} onClick={()=>{handleCategory("Registered_Users")}} text={"Registered Users"}></Button5>
                <Button5 className={category==="Activity_Email_WA"?"Selected":""} onClick={()=>{handleCategory("Activity_Email_WA")}}text={"Activity ( Email  & WA )"}></Button5>
                <Button5 className={category==="Abandoned_Cart"?"Selected":""} onClick={()=>{handleCategory("Abandoned_Cart")}}text={"Abandoned Cart"}></Button5>
          </div>
          <div className="service_category_header_breaker">
          </div>
          <div className="service_userlist_header">
            <h1 style={{fontWeight:700,fontSize:"20px",lineHeight:"24.2px",color:"#F8FAFC"}}>{category==="Registered_Users"?"Registered Users":category==="Activity ( Email  & WA )"?"Activity_Email_WA":category==="Abandoned_Cart"?"Abandoned Cart":""}</h1>
            <div className="service_export_csv_button" style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <h2 style={{fontWeight:"400",fontSize:"16px",color:"#94A3B8",lineHeight:"19.36px",width:"942px"}}>{category==="Registered_Users"?"Registered Users for this Event":category==="Activity_Email_WA"?"Track Email & WA sent to users)":category==="Abandoned_Cart"?"Below are users who expressed interest but didn't complete registration. Feel free to reach out to encourage them to register. For technical assistance, contact us at +918799710137.":""}</h2>
              <button><CSVLink
              data={csvData}
          filename={`user_data_${eventInfo?.event?.sname}_${category?.toLowerCase().replace(/\s/g, "_")}.csv`}
        >
          <FaFileCsv /> Export
        </CSVLink></button>
            </div>
            
          </div>
          <div style={{overflowX:'auto'}} className="userrequest-table">
            <Table1
              headArray={getTableHeadArray()}
              bodyArray={allUserDetails?.filter((e)=>{return category === "Registered_Users" ? e?.status === 1 : category === "Abandoned_Cart" ? e?.status === 0 : !e})?.map((elem, i) => {
                return (category === "Registered_Users"? [
                      elem?.userID?.name ? elem?.userID?.name : "--",
                      elem?.userID?.email ?? "--",
                      elem?.userID?.phoneNumber ?? "--",  
                      elem?.userID?.location?.city ?? "--",
                      <span>
                        {renderdate1(elem?.orderDate)}
                        <br></br>
                        {renderdate2(elem?.orderDate)}
                      </span>,
                      elem?.amount,
                      elem?.whatsapp ? elem?.whatsapp : "--",
                      elem?.email ? elem?.email : "--",
                      elem?.referredFrom ? "Yes" : "No"
                    ]:category === "Activity_Email_WA"?[
                      elem?.userID?.name ? elem?.userID?.name : "--",
                      elem?.userID?.email ?? "--",
                      elem?.userID?.phoneNumber ?? "--",  
                      elem?.userID?.location?.city ?? "--",
                      <span>
                        {renderdate1(elem?.orderDate)}
                        <br></br>
                        {renderdate2(elem?.orderDate)}
                      </span>,
                      elem?.amount,
                      elem?.whatsapp ? elem?.whatsapp : "--",
                      elem?.email ? elem?.email : "--",
                      elem?.referredFrom ? "Yes" : "No"
                    ]:category === "Abandoned_Cart"?[
                      elem?.userID?.name ? elem?.userID?.name : "--",
                      elem?.userID?.email ?? "--",
                      elem?.userID?.phoneNumber ?? "--",  
                      elem?.userID?.location?.city ?? "--",
                      <span>
                        {renderdate1(elem?.orderDate)}
                        <br></br>
                        {renderdate2(elem?.orderDate)}
                      </span> ,
                      elem?.status === 0 ? "Unsuccessful" : "--"
                    ]:"")
              })}
              gridConfig={
               getGridConfig()
              }
            />
          </div>
        </div>
      )}
      <SuperSEO title="Anchors - User Downloads" />
    </>
  );
}

export default Users;
