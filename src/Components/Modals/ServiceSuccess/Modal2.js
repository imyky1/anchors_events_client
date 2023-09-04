import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Modal.css";
import CloudRight from "./icons/cloud_right.svg";
import { BsCloudArrowDown } from "react-icons/bs";
import { IoCopy } from "react-icons/io5";

// This modal is the status changing modal of any service or reviews etc...

const ChangeStatusModal = ({ ChangeStatusTo, url, toClose }) => {
  return (
    <div className="congratualtion_popup_outer">
      <div className="congratualtion_popup_inside">
        <i
          class="fa-solid fa-xmark fa-xl chnageStatusModalCross"
          onClick={() => {
            toClose()
          }}
        ></i>
        <div className="congratualtion_popup_inside_symbol">
          <BsCloudArrowDown
            className="congratualtion_popup_inside_symbol_design"
            size={50}
          />
        </div>
        <div className="congratualtion_popup_inside_symbol_middle">
          Content {ChangeStatusTo === 0 ? "Inactive" : "Active"}
          <section>
            Your content is now {ChangeStatusTo === 0 ? "inactive" : "active"}{" "}
            and will {ChangeStatusTo === 0 ? "not be visible" : "visible"} to
            your auidence
          </section>
        </div>

        {ChangeStatusTo === 1 && (
          <div className="congratualtion_popup_inside_symbol_last">
            <div
              className="congratualtion_popup_inside_symbol_last_01"
              onClick={() => {
                toast.info("Copied link successfully");
                {
                  url?.length > 7
                    ? navigator.clipboard.writeText(url)
                    : navigator.clipboard.writeText(
                        `https://www.anchors.in/e/${url}`
                      );
                }
              }}
            >
              {url}
              <IoCopy size={20} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ChangeStatus = ChangeStatusModal;
