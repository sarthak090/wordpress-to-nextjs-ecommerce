import Link from "next/link";
export default function RelatedSingle(product) {
  return (
    <div key={product.id} className="col-lg-4">
      <Link href={`/product/${product.slug}`}>
        <a href={`/product/${product.slug}`}>
          <div className="product-inner-col">
            <div className="product-img-container">
              <img
                src={product.featuredImage}
                className="img-fluid product-img"
              />
            </div>

            <div className="m-2">
              {product.name}
              {product.price}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
