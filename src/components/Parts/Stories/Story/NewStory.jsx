import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
Modal.setAppElement("#root");
function NewStory({ image, name, storyNum }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <li className="list__item" onClick={() => setOpen(true)}>
        <figure className="item__pigPic mb-0 ">
          <img className="w-100" src={image} alt="" />
        </figure>
        <figure className="item__smallPic mb-0 ">
          <img className="rounded-circle" src={image} alt="" />
        </figure>
        <div className="item__name text-center py-1">
          {!storyNum && (
            <div className="item__add d-flex justify-content-center align-items-center">
              <i className="fas fa-plus"></i>
            </div>
          )}
          <h6 className="text-capitalize text-white mb-0">
            {storyNum > 0 ? name : "add your story"}
          </h6>
        </div>
      </li>
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={{
          overlay: {
            backgroundColor: "#1A1A1A",
            zIndex: "1000000",
            height: "100vh",
          },
          content: {
            width: "30%",
            height: "90%",
            background: " #060606",
            margin: "auto",
            border: "none",
            borderRadius: "10px",
          },
          position: "relative",
          zIndex: "1000",
        }}
        parentSelector={() => document.querySelector("#root")}
      >
        <>
          <progress className="load" value="50" max="100" />
          <div className="list__item">
            <div className="storyHeadr">
              <div className="left">
                <figure className="item__smallPic mb-0 ">
                  <img
                    className="profileImage rounded-circle"
                    src={image}
                    alt=""
                  />
                </figure>
                <span className="title text-capitalize text-white me-2">
                  {name}
                </span>
                <span className="time">19h</span>
              </div>
              <ul className="right">
                <li className="me-2">
                  <i class="fas fa-pause"></i>
                </li>
                <li className="me-2">
                  <i class="fas fa-volume-mute"></i>
                </li>
                <li onClick={() => setOpen(false)}>
                  <i class="fas fa-times"></i>
                </li>
              </ul>
            </div>
            <figure className="story_image mb-0 ">
              <img className="w-100" src={image} alt="" />
            </figure>
          </div>
        </>
      </Modal>
    </>
  );
}

export default NewStory;
