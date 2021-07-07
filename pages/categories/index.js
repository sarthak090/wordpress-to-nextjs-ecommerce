import React from "react";
import Header from "../../components/Layout/Header";
import Link from "next/link";
export default function Categories({ categories }) {
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {categories.map((catg) => (
            <div className="col-lg-12 border my-2" key={catg.id} role="button">
              <div className="d-flex justify-content-center">
                {catg.featuredImage && (
                  <img className="img-fluid w-50" src={catg.featuredImage} />
                )}
              </div>
              <h4>
                <Link href={`/categories/${catg.slug}`}>
                  <a
                    href={`/categories/${catg.slug}`}
                    className="text-2xl text-gray-800"
                  >
                    {catg.name}
                  </a>
                </Link>
              </h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_WP}/wpc/v1/categories`);
  const json = await res.json();

  return {
    props: {
      categories: json,
    },
  };
};
