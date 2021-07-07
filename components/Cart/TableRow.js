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
    <div className="flex flex-col sm:flex-row gap-8  border-gray-200 rounded py-4  px-8 my-4 border">
      <div className="max-w-md  sm:max-h-48 flex items-center justify-center">
        <img
          className="h-56 sm:h-full md:h-full object-contain "
          src={product.featuredImage}
        />
      </div>
      <div className="min-w-min">
        <div className="flex sm:flex-col  justify-between">
          <p className="text-2xl md:text-4xl font-semibold text-gray-800 mb-4">
            {product.name}
          </p>
          <p className="text-2xl mb-4">${product.price}</p>
        </div>

        <div className="flex items-center text-xl gap-8">
          <input
            type="number"
            className="px-4 py-2 w-1/2 border rounded border-gray-300 focus:border-blue-200 focus:outline-none"
            onChange={handleUpdate}
            value={quantity}
            max="10"
            min="1"
          />
          <div className="text-xl">${product.total}</div>
        </div>
        <div className="my-4 flex justify-around ">
          <button className="btn w-40 flex justify-center border hover:border-blue-300 hover:bg-transparent hover:text-blue-400 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
          <button
            className="px-4 py-2 w-40 flex justify-center rounded text-green-100 ml-4 bg-red-400 border hover:border-red-300 hover:bg-transparent hover:text-red-400 focus:outline-none "
            onClick={handleDeletBtn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
