import React, { useContext } from "react";
import "./Model.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { creatorContext } from "../../Context/CreatorState";

function ShowReviewModel({ id, open, onClose, status }) {
  const { updateFeedbackStatus } = useContext(creatorContext);

  const handleChange = async () => {
    const success = await updateFeedbackStatus(id);
    if (success) {
      toast.success("Display Status Changed Successfull", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      toast.error("Some error occured", {
        position: "top-center",
        autoClose: 2000,
      });
    }
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  if (!open) {
    return null;
  }

  return (
    <>
      <div onClick={onClose} className="model_delete">
        <div
          onClick={(e) => e.stopPropagation()}
          className="model_main_box_delete"
        >
          <div className="deletemodal_wrap">
            <span className="model_question_delete">
              Are you sure you want to change the display status to{" "}
              {status == 0 ? <b>"OFF"</b> : <b>"ON"</b>}?
            </span>
            <span className="model_gyan">
              {status === 0 ? (
                <>
                  This will prevent the review from being displayed on your
                  public profile.
                </>
              ) : (
                <>This will display the review on your public profile.</>
              )}
            </span>
            <div className="model_button_delete">
              <button className="model_button1_delete" onClick={handleChange}>
                Save Changes
              </button>
              <button className="model_button2_delete" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ShowReviewModel;
