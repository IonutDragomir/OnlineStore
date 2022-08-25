import React from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import "../CSS/ProductDetails.css";
import { useState } from "react";

export function ProductDetails(props) {
  let { productId } = useParams();
  const [imageAddress, setImageAddress] = useState("");
  return (
    <>
      {console.log(props.data, "props.data in productPage")}
      {/* {console.log(allProducts, "allProducts in productPage")} */}
      {props.data != undefined
        ? props.data.categories[0].products.map((product) => {
            if (product.id === productId) {
              console.log(
                product,
                "displayed product in product details component"
              );
              return (
                <div className="product-container" key={product.id}>
                  <div className="product-sidePictures">
                    {product.gallery.map((pictureAddress) => {
                      return (
                        <img
                          src={pictureAddress}
                          key={pictureAddress}
                          onClick={() => setImageAddress(pictureAddress)}
                        />
                      );
                    })}
                  </div>
                  <img
                    className="product-mainPicture"
                    src={imageAddress == "" ? product.gallery[0] : imageAddress}
                  />
                  {
                    //product properties
                  }
                  <div className="product-atributes-container">
                    <p className="atributes-brand">{product.brand}</p>
                    <p className="atributes-name">{product.name}</p>
                    {
                      //atributes, color, size, tech properties
                      product.attributes.map((type) => {
                        return (
                          <div
                            className="product-properties-container"
                            key={type.id}
                          >
                            <p className="properties-name">{type.name}:</p>
                            <div className="properties-container">
                              {type.items.map((property) => {
                                return (
                                  <div
                                    className="box"
                                    key={property.id}
                                    style={
                                      type.name == "Color"
                                        ? {
                                            backgroundColor: property.value,
                                          }
                                        : {
                                            backgroundColor: "white",
                                          }
                                    }
                                  >
                                    {type.name != "Color" ? property.value : ""}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })
                    }
                    <p className="atributes-price">PRICE:</p>
                    {/* <p className="atributes-price-amount"> */}
                    {/* ${product.prices[0].amount} */}
                    {product.prices.map((price) => {
                      if (price.currency.label === props.selectedCurrency) {
                        return (
                          <p
                            className="atributes-price-amount"
                            key={price.amount}
                          >
                            {price.currency.symbol}
                            {price.amount}
                          </p>
                        );
                      }
                    })}
                    {/* </p> */}
                    <button className="atributes-addButton">Add to Cart</button>
                    <div className="atributes-description">
                      {parse(product.description)}
                    </div>
                  </div>
                </div>
              );
            }
          })
        : " "}
    </>
  );
}

{
  /* <img src={product.gallery[0]} />
  <p className="product-title">{product.name}</p>
    {parse(product.description)} */
}
