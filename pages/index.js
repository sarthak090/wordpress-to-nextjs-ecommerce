import Header from "../components/Layout/Header";
import ProductContainer from "../components/ProductContainer";

export default function Home({ products, error }) {
  return (
    <>
      <Header />
      <div className="container">
        <ProductContainer products={products} />
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
      error: false,
    },
  };
};
