import { caluclateDiscount, getSubTotal } from "../../utils/calculate-discount";
export default function SubTotal(cartData) {
  return (
    <div className=" p-2 text-xl text-gray-800">
      <div className="flex gap-2 my-4">
        <strong className="col-6"> Total Price:</strong>${getSubTotal(cartData)}
      </div>
      <div className="">
        <div className="flex flex-col gap-1 ">
          {Object.keys(caluclateDiscount(cartData)).map((key) => (
            <div>
              <strong className=" mr-2"> {key}:</strong>$
              {caluclateDiscount(cartData)[key]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
