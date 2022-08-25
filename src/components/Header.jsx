import pic from "../image/bag2.png";
import cart from "../image/cart.png";
import arrowUp from "../image/arrowUp.png";
import arrowDown from "../image/arrowDown.png";
import "../CSS/Header.css";
import { useState, useEffect } from "react";
import { CartBox } from "./Cart Components/CartBox";
import { OutsideAlerter } from "../functions/OutsideAlerter.js";

export function Header(props) {
  const [display, setDisplay] = useState("closed");
  const [productsInCart, setProductsInCart] = useState([]);
  const [openCart, setOpenCart] = useState("closed");
  const [currencySymbol, setCurrencySymbol] = useState("$");

  let isAdded = false;

  useEffect(() => {
    productsInCart.map((element) => {
      if (props.productData.id === element.id) {
        isAdded = true;
      }
    });

    if (!isAdded && props.productData !== "") {
      setProductsInCart([...productsInCart, props.productData]);
    }
  }, [props.productData]);

  function openCloseCart() {
    if (productsInCart.length > 0 && openCart === "closed") {
      setOpenCart("open");
    } else {
      setOpenCart("closed");
    }
  }

  function closeCurrencyBox() {
    if (display === "closed") {
      setDisplay("open");
    } else {
      setDisplay("closed");
    }
  }

  return (
    <>
      {
        //tags
      }
      <div className="header">
        <div className="tags">
          <div className="tags-women">
            <p>WOMEN</p>
          </div>
          <div className="tags-men">
            <p>MEN</p>
          </div>
          <div className="tags-kids">
            <p>KIDS</p>
          </div>
        </div>

        {
          //bag image
        }
        <div className="bag">
          <img className="bag-image" src={pic} />
        </div>

        {
          // cart and currency button container
        }
        <div className="cart">
          {
            //selector for currency
          }
          <OutsideAlerter display={display} closeFunction={setDisplay}>
            <div className="cart-select">
              <button
                className="cart-select-dollar-button"
                onClick={() => closeCurrencyBox()}
              >
                {currencySymbol}
                <img src={display === "closed" ? arrowDown : arrowUp} />
              </button>
            </div>
            <div
              className="curency-selector"
              style={
                display === "closed"
                  ? { display: "none" }
                  : { display: "block" }
              }
            >
              {props.prices !== "...expecting results from graphql"
                ? props.prices.map((price) => {
                    return (
                      <button
                        className="currency-option"
                        key={price.amount}
                        onClick={() => {
                          props.setSelectedCurrency(`${price.currency.label}`);
                          setCurrencySymbol(`${price.currency.symbol}`);
                          closeCurrencyBox();
                        }}
                      >
                        {price.currency.symbol} {price.currency.label}
                      </button>
                    );
                  })
                : ""}
            </div>
          </OutsideAlerter>

          {
            //cart box
          }
          <OutsideAlerter display={openCart} closeFunction={setOpenCart}>
            <div onClick={() => openCloseCart()} className="cart-wrapper-icon">
              <img className="cart-icon" src={cart} />
              {
                //cart component
              }
              <CartBox
                data={props.data}
                display={openCart}
                productData={productsInCart}
                selectedCurrency={props.selectedCurrency}
              />
            </div>
          </OutsideAlerter>

          {
            //number of products
          }
          <div
            className="cart-circle-wrapper"
            style={
              props.productData !== ""
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <p className="cart-circle-wrapper-number">
              {productsInCart.length}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
