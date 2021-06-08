import React from "react";

export default function ErroHandler({ errorMsg }) {
  if (errorMsg) {
    return (
      <div className="flex justify-center text-2xl items-center md:h-full">
        {errorMsg}
      </div>
    );
  }
  return (
    <div className="flex items-center  justify-center">
      <img src={"/loading.svg"} className="img-fluid" />
    </div>
  );
}
