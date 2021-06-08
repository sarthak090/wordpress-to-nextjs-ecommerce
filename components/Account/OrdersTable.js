import Link from "next/link";
import React from "react";
import { getFullDate } from "../../utils/format-date";
export default function OrdersTable({ customerOrdersData }) {
  return (
    <table className="table w-full mt-4">
      <thead className="border border-gray-900 h-16 mb-2">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Status</th>
          <th scope="col">Total</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {customerOrdersData.map((order) => (
          <tr
            key={order.id}
            className="bg-gray-700 cursor-pointer hover:bg-gray-800 text-gray-50"
          >
            <th scope="row" className="border border-gray-600 py-4 ">
              {order.id}
            </th>
            <td className="border border-gray-600 py-4 ">
              {getFullDate(order.date_created)}
            </td>
            <td className="border border-gray-600 py-4 ">{order.status}</td>
            <td className="border border-gray-600 py-4 ">
              {" "}
              {order.total} for {order.line_items.length} items
            </td>
            <td className="border text-center border-gray-600 py-4 ">
              <Link href={`/account/orders/${order.id}`}>
                <a
                  className="  bg-blue-500   w-full px-4 py-2 rounded"
                  href={`/account/orders/${order.id}`}
                >
                  View
                </a>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
