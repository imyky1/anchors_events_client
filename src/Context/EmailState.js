import React, { createContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { host } from "../config/config";

export const emailcontext = createContext();

const EmailState = (props) => {


  // Save bulk email details
  const saveEmailData = async (
    serviceID,
    subject,
    content,
    messageId,
    type,
    recievers
  ) => {
    const response = await fetch(`${host}/api/email/sendEmail`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "jwt-token": localStorage.getItem("jwtToken"),
      },
      body: JSON.stringify({
        serviceID: serviceID,
        subject: subject,
        content: content,
        type: type,
        messageId:messageId,
        recievers: recievers,
      }),
    });
    const json = await response.json();
    return json.success;
  };



  //EMail Sending API Context
  const sendEmail = async (recievers, sname, url, imageurl,cname) => {
    const response = await fetch(`${host}/api/email/sendEmailfromSendGrid`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        recievers,
        sname,
        cname,
        url,
        imageurl,
      }),
    });
    const json = await response.json();
    return json;
  };


  // Check for the sent email

  const checkEmailSent = async(serviceID,type)=>{
    const response = await fetch(`${host}/api/email/checkSentEmail/${serviceID}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body:JSON.stringify({
            type
        })
  })
    const json = await response.json()
    return json.success
}


const sendBulkEmailFromBackend = async(serviceID,recievers, sname, cname, serviceSlug, imageurl, Subject,Content)=>{
  const token = localStorage.getItem("jwtToken")
  const response = await fetch(`${host}/api/email/sendBulkEmailFromBackend/${serviceID}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body:JSON.stringify({
        recievers, sname, cname, serviceSlug, imageurl, Subject,Content,token
      })
})
  const json = await response.json()
  return json.success
}



const sendEmailForOrderPayments = async(sname,userEmail,amount,paymentId,date,time)=>{
  const d = new Date()
  const response = await fetch(`${host}/api/email/sendEmailfromZohoForPayments`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body:JSON.stringify({
        sname,userEmail,amount,paymentId,date:d.toLocaleDateString(),time:d.toLocaleTimeString()
      })
})
  const json = await response.json()
  return json.success
}




  return (
    <emailcontext.Provider value={{ saveEmailData,sendEmail,checkEmailSent,sendBulkEmailFromBackend,sendEmailForOrderPayments}}>
      {props.children}
    </emailcontext.Provider>
  );
};

export default EmailState;
