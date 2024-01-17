import React from "react";
import "./Modal.css";

function HelpModal({ open, toClose,content,type }) {
  return (
    open ? <div className="help_outside_container">
      <div
        className="help_inside_container"
        onClick={(e) => e?.stopPropagation()}
      >
        <div className="help_MOdal_header">
        <h1 className="header_help01">Your {type === 0 ? "Venue Address" : "Joining Link"}</h1><span style={{cursor:'pointer'}} onClick={()=>toClose()}>×</span>
        </div>
        <div className="help_MOdal_content" >
        {content}
        </div>
      </div>
    </div> : null
  );
}

export default HelpModal;
