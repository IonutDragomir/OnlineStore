import "../CSS/MainPage.css";
import arrowUp from "../image/arrowUp.png";
import arrowDown from "../image/arrowDown.png";
import { Product } from "./Product";
import { useState } from "react";
import { OutsideAlerter } from "../functions/OutsideAlerter.js";
import { Header } from "./Header";

export function MainPage(props) {
  const [openCategorySelection, setOpenCategorySelection] = useState("closed");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // const [selectedCurrency, setSelectedCurrency] = useState("USD");
  // const [productData, setProductData] = useState("");

  //update the category based on user choice
  function changeCategory(message) {
    if (message === "clothes") {
      setSelectedCategory("clothes");
    } else if (message === "tech") {
      setSelectedCategory("tech");
    } else {
      setSelectedCategory("all");
    }

    setOpenCategorySelection("closed");
  }

  return (
    <div className="container">
      {
        //header component
      }
      {/* <Header
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        productData={productData}
        prices={
          props.data && true
            ? props.data.categories[0].products[0].prices
            : "...expecting results from graphql"
        }
      /> */}

      {
        //select category button
      }
      <OutsideAlerter
        display={openCategorySelection}
        closeFunction={setOpenCategorySelection}
      >
        <button
          onClick={
            openCategorySelection === "closed"
              ? () => setOpenCategorySelection("open")
              : () => setOpenCategorySelection("closed")
          }
          className="title"
        >
          Category {selectedCategory}
          <img
            src={openCategorySelection === "closed" ? arrowDown : arrowUp}
          ></img>
        </button>

        <div
          style={
            openCategorySelection === "open"
              ? { display: "block" }
              : { display: "none" }
          }
          className="category-selector"
        >
          <button
            className="category-selector-button"
            onClick={() => changeCategory("clothes")}
          >
            clothes
          </button>
          <br />
          <button
            className="category-selector-button"
            onClick={() => changeCategory("tech")}
          >
            tech
          </button>
          <br />
          <button
            className="category-selector-button"
            onClick={() => changeCategory("all")}
          >
            all
          </button>
        </div>
      </OutsideAlerter>

      {
        //rendering each product
      }
      <div className="products-container">
        {props.data && true
          ? props.data.categories.map((category) => {
              if (category.name === selectedCategory) {
                return category.products.map((product) => {
                  console.log(product, "product in main page");
                  return (
                    <Product
                      category={product.category}
                      image={product.gallery[0]}
                      key={product.id}
                      id={product.id}
                      inStock={product.inStock}
                      name={product.name}
                      prices={product.prices}
                      setProductData={props.setProductData}
                      selectedCurrency={props.selectedCurrency}
                    />
                  );
                });
              }
            })
          : ""}
      </div>
    </div>
  );
}

// props.data.categories.map((category) => {
//   if (category.name === selectedCategory) {
//     return category.products.map((product) => {
//       console.log(product, " in product list");
//       let amount;
//       let priceSymbol;
//       product.prices.map((price) => {
//         if (price.currency.label === props.selectedCurrency) {
//           amount = price.amount;
//           priceSymbol = price.currency.symbol;
//         }
//       });
//       return (
//         <Product
//           category={product.category}
//           image={product.gallery[0]}
//           key={product.id}
//           id={product.id}
//           inStock={product.inStock}
//           name={product.name}
//           // priceAmount={product.prices[0].amount}
//           // priceSymbol={product.prices[0].currency.symbol}
//           priceAmount={amount}
//           priceSymbol={priceSymbol}
//           // productData={props.productData}
//           setProductData={props.setProductData}
//         />
//       );
//     });
//   }
// })
