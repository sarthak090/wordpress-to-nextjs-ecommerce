import React from "react";
import { caluclateDiscount, getSubTotal } from "../../utils/calculate-discount";
export default function SubTotal(cartData) {
  return (
    <div className="border p-2">
      <div className="row my-4">
        <strong className="col-6"> Total Price:</strong>
        {getSubTotal(cartData)}
      </div>
      <div>
        <div className="row">
          {Object.keys(caluclateDiscount(cartData)).map((key) => (
            <>
              <strong className="text-uppercase col-6"> {key}:</strong>
              {caluclateDiscount(cartData)[key]}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
