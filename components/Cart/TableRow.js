import React from "react";
import useUpdateItem from "../../hooks/useUpdateItem";
export default function TableRow(product) {
  const [quantity, updateItemQty, deleteItem] = useUpdateItem(product.quantity);
  const handleUpdate = (e) => {
    //make change and fetch new data
    updateItemQty(e.target.value, product.id);
    product.fetchCartProducts();
  };
  const handleDeletBtn = () => {
    deleteItem(product.id);
    product.fetchCartProducts();
  };
  return (
    <tr>
      <td className="d-flex justify-content-center">
        <img className="img-fluid cart-item-img" src={product.featuredImage} />
      </td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <input
          type="number"
          className="form-control"
          onChange={handleUpdate}
          value={quantity}
          max="10"
          min="1"
        />
      </td>
      <td>{product.total}</td>
      <td>
        <button className="btn btn-primary">V</button>
        <button className="btn btn-danger ml-2" onClick={handleDeletBtn}>
          X
        </button>
      </td>
    </tr>
  );
}
