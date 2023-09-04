import React from "react";
import "./Modal.css";

function HelpModal({ open, toClose }) {

  open &&
    document?.addEventListener("click", () => {
      toClose();
    });

  if (!open) {
    return null;
  }

  return (
    <div className="help_outside_container">
      <div
        className="help_inside_container"
        onClick={(e) => e?.stopPropagation()}
      >
        <h1 className="header_help01">Need Help? Contact Us!</h1>
        If you're feeling frustrated or confused navigating our site or have any questions, we're here to help. Please don't hesitate to reach out to us at <span>info@anchors.in</span>
        <br /> <br /> Thank you for choosing Anchors. We're thrilled to have you onboard and are committed to providing you with the best possible experience on our site.
      </div>
    </div>
  );
}

export default HelpModal;
