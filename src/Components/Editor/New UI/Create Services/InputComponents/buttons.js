import React, { useState } from "react";
import "./components.css";
import { TooltipBox } from "./fields_Labels";
import { AiFillInfoCircle } from "react-icons/ai";

// Normal for black theme
function Buttons1(props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{display:"flex",alignItems:"center",gap:"10px", position:'relative'}}>
      <button
        className="button_01_css"
        style={props?.height && { height: props?.height }}
        onClick={props.onClick}
      >
        {props.text}
        {props.icon && props.icon}
      </button>
      {props?.info && <AiFillInfoCircle
        color="#9a9a9a"
        size={20}
        style={{cursor:"pointer"}}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      />}
      {isHovered && <TooltipBox text={props?.info} />}
    </div>
  );
}

function Buttons2(props) {
  return (
    <button
      className="button_02_css"
      style={props?.height && { height: props?.height }}
      onClick={props.onClick}
    >
      {props.icon && props.icon}
      {props.text}
    </button>
  );
}

// Without border etc
function Buttons3(props) {
  return (
    <button
      className="button_03_css"
      style={props?.height && { height: props?.height }}
      onClick={props.onClick}
    >
      {props.icon && props.icon}
      {props.text}
    </button>
  );
}

export const Button1 = Buttons1;
export const Button2 = Buttons2;
export const Button3 = Buttons3;
