import React from "react";

export default function ErroHandler({ errorMsg }) {
  if (errorMsg) {
    return <div className="d-flex justify-content-center">{errorMsg}</div>;
  }
  return (
    <div className="d-flex justify-content-center">
      <img src={"/loading.svg"} className="img-fluid" />
    </div>
  );
}
