import { getFullDate } from "../../utils/format-date";

import React from "react";

export default function OrdersTable({ customerOrdersData }) {
  return (
    <table className="table w-full">
      <thead className="py-4 h-12 border">
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Download Remaining</th>
          <th scope="col">Expires</th>
          <th scope="col">Download</th>
        </tr>
      </thead>
      <tbody>
        {customerOrdersData.map((order) => (
          <tr key={order.id} className="border-b-2 text-center ">
            <th scope="row">{order.product_name}</th>
            <td>{order.downloads_remaining}</td>
            <td className="text-center">{getFullDate(order.access_expires)}</td>
            <td>
              <a href={order.download_url}>
                <button className="btn w-full">{order.file.name} </button>
              </a>{" "}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
