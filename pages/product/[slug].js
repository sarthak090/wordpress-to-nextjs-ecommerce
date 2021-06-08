import React, { useEffect, useState } from "react";
import Error from "../../components/UI/Error";
import Product from "../../components/Product";
import Header from "../../components/Layout/Header";

const ProductBySlug = ({ postsData, error }) => {
  if (!error) {
    return (
      <>
        <Header />
        <Product {...postsData} />
      </>
    );
  }

  return (
    <div>
      <Header />
      {error ? <Error errorMsg={postsData.msg} /> : <Error errorMsg={""} />}
    </div>
  );
};
export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP}/wpc/v1/products`
  ).then();
  const data = await res.json();

  const paths = data.map((post) => {
    return {
      params: { slug: post.slug.toString() },
    };
  });
  return {
    paths,
    fallback: true,
    // paths:[{slug:}]
  };
};
export const getStaticProps = async (ctx) => {
  const slug = ctx.params !== undefined ? ctx.params.slug : "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP}/wpc/v1/products/${slug}`
  ).then();

  const postsData = await res.json();

  if (postsData.msg) {
    return {
      props: {
        postsData,
        error: true,
      },
    };
  }
  return {
    props: {
      postsData,
      error: false,
    },
  };
};
export default ProductBySlug;
