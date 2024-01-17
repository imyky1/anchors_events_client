import { useState } from "react";
import { createContext } from "react";
import { host } from "../config/config";

export const siteControlContext = createContext();

const SiteControlsState = (props) => {
    const [shortSidebar, setShortSidebar] = useState(false)     // uses short sidebaar and also hides navbar on dashboard
    const [pricingPlans, setPricingPlans] = useState(null)


    const getAllPricingPlans = async () => {
      const response = await fetch(`${host}/sitemap/fetchAllPlans`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      const json = await response.json();
      setPricingPlans(json?.plans)
    };

  return (
    <siteControlContext.Provider value={{shortSidebar,setShortSidebar,getAllPricingPlans,pricingPlans}}> {props.children}</siteControlContext.Provider>
  );
};


export default SiteControlsState;