import React, { useContext } from "react";
import VariationContainer from "./VariationContainer";
import RelatedProducts from "./RelatedProducts";
import CartContext from "../../context/CartContext";
import { hasProductInCart } from "../../utils/cart-helpers";

export default function index(product) {
  const { addProductToCart, cart } = useContext(CartContext);
  const {
    name,
    id,
    ratings,
    description,
    salePrice,
    price,
    type,
    variations,
    attributes,
    crossSellProducts,
    upsellProducts,
    featuredImage,
  } = product;
  const handleCartBtn = () => {
    console.log(`Product With id => ${id} is To be added in localstorage cart`);
    addProductToCart(id);
  };
  const renderCartBtn = () => {
    const { inCart, productIndex } = hasProductInCart(id, cart);
    if (inCart) {
      return (
        <>
          <button className="btn btn-warning" onClick={handleCartBtn}>
            Add {cart[productIndex].quantity}
          </button>
        </>
      );
    }
    return (
      <button className="btn btn-warning" onClick={handleCartBtn}>
        Add To Cart
      </button>
    );
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-4 d-flex justify-content-center d-sm-block items-center">
          <img src={featuredImage} className="img-fluid product-img" />
        </div>
        <div className="col-md-8 product-desc">
          <div className="d-flex d-sm-none cta-container ">
            <button className="btn btn-outline-danger">Add To Cart</button>
            <button className="btn btn-success">Buy Now</button>
          </div>
          <h1 className="sm-h5 product-title">{name}</h1>

          <div className="ratings">{ratings > 0 && ratings}</div>
          <h4>
            ${salePrice < price && <del>{salePrice}</del>} {price}
          </h4>
          <div>
            {type === "variable" && (
              <VariationContainer
                variations={variations}
                attributes={attributes}
              />
            )}
          </div>
          <div className="description">{description}</div>
          <div className="d-none d-sm-flex cta-container ">
            {renderCartBtn()}
            <button className="btn btn-success">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="related-products">
        {crossSellProducts && (
          <RelatedProducts
            products={crossSellProducts}
            type="Cross Sell Products"
          />
        )}
        {upsellProducts && (
          <RelatedProducts products={upsellProducts} type="Upsell Products" />
        )}
      </div>
    </div>
  );
}
