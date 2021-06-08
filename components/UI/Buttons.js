import React from "react";

export default function Buttons(props) {
  const { onClick, color, width, margin } = props;
  return (
    <button
      className={`outline-none 
                  bg-${color ? color : "blue"}-600
                  font-light  
                  py-4 border
                  hover:bg-${color ? color : "blue"}-400 
                hover:text-gray-800
                 rounded-md text-xl
                 font-semibold text-gray-200
                 ${width}
                 ${margin}
                 `}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
}
