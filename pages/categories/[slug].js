import React from "react";
import Header from "../../components/Layout/Header";
import ProductContainer from "../../components/ProductContainer";

export default function CategoriesBySlug({ products }) {
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <ProductContainer products={products} />
      </div>
    </>
  );
}
export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP}/wpc/v1/categories`
  ).then();
  const data = await res.json();

  const paths = data.map((post) => {
    return {
      params: { slug: post.slug.toString() },
    };
  });
  return {
    paths,
    fallback: false,
    // paths:[{slug:}]
  };
};
export const getStaticProps = async ({ params: { slug } }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP}/wpc/v1/categories/${slug}`
  );
  const productsList = await res.json();
  return {
    props: {
      products: productsList,
    },
  };
};
