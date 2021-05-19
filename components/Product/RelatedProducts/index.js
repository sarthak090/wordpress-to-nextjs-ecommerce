import React from "react";
import RelatedSingle from "./RelatedSingle";
export default function index({ products, type }) {
  return (
    <div className="row">
      {products.map((product) => (
        <RelatedSingle {...product} key={product.id} />
      ))}
    </div>
  );
}
