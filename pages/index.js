import { useState } from "react";
import Header from "../components/Layout/Header";
import ProductContainer from "../components/ProductContainer";

export default function Home({ products }) {
  const minPriceFilter = 50;
  const [productsData, setProductsData] = useState(products);
  const [filterPrice, setFilterPrice] = useState(minPriceFilter);
  const applyFilter = (e) => {
    setFilterPrice(e.target.value);
    const filterdProducts = products.filter((product) => {
      return product.price <= e.target.value;
    });
    setProductsData([...filterdProducts]);
  };

  return (
    <>
      <Header />

      <div className="container mx-auto">
        <div className="grid grid-cols-5">
          <section className="col-span-1 hidden md:block mt-8">
            <div className="flex flex-col border border-gray-200 px-2 py-8 mb-8">
              <p className="text-xl mb-2">Filter By Price</p>
              <label className="text-xl text-gray-700">${filterPrice}</label>
              <input
                type="range"
                step="5"
                min="5"
                value={filterPrice}
                max="100"
                onChange={applyFilter}
              />
            </div>
            <div className="flex flex-col border border-gray-200 px-2 py-8 mb-8">
              <p className="text-xl mb-2">Sort Products</p>

              <select className="form-control">
                <option>ASC</option>
                <option>DSC</option>
              </select>
            </div>
          </section>
          <section className="col-span-5 md:col-span-4">
            <ProductContainer products={productsData} />
          </section>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP}/wpc/v1/products`);
  const productsList = await res.json();
  return {
    props: {
      products: productsList,
    },
  };
};
