import React from "react";
import RelatedSingle from "./RelatedSingle";
export default function index({ products, type }) {
  return (
    <div className="grid md:grid-cols-4">
      {products.map((product) => (
        <RelatedSingle {...product} key={product.id} />
      ))}
    </div>
  );
}
