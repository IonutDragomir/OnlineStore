import { useState, useEffect } from "react";
import "../../CSS/CartBox.css";
import { Items } from "./Items";

export function CartBox(props) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [symbol, setSymbol] = useState("$");
  let displayedElements = 0;

  // function getConvertedPrice(listOfAllProducts, listOfSelectedProducts) {
  //   let amount;
  //   let priceSymbol;
  //   listOfSelectedProducts.map((selectedProduct) => {
  //     listOfAllProducts.map((product) => {
  //       if (selectedProduct.id === product.id) {
  //         product.prices.map((price) => {

  //         }
  //       }
  //     });
  //   });
  // }

  useEffect(() => {
    // console.log(props);
    let convertedPriceTotal = 0;
    let curentSymbol;
    props.productData.map((element) => {
      element.prices.map((price) => {
        if (price.currency.label === props.selectedCurrency) {
          convertedPriceTotal += price.amount;
          curentSymbol = price.currency.symbol;
        }
      });

      // setTotalAmount(
      //   parseFloat((totalAmount + element.priceAmount).toFixed(2))
      // );
    });
    setTotalAmount(parseFloat(convertedPriceTotal.toFixed(2)));
    setSymbol(curentSymbol);
  }, [props.productData, props.selectedCurrency]);

  return (
    <div
      className="cartBox-component"
      style={
        props.display === "closed" ? { display: "none" } : { display: "block" }
      }
    >
      <p>
        <em style={{ fontWeight: "bold", fontStyle: "normal" }}>My Bag</em>,{" "}
        {props.productData.length} item
      </p>
      <div className="cartBox-items-wrapper">
        {props.productData.map((element) => {
          ++displayedElements;
          console.log(props.data, "props.data in cartBox");
          if (displayedElements < 3) {
            return (
              <Items
                name={element.name}
                image={element.image}
                prices={element.prices}
                quantity={element.quantity}
                selectedCurrency={props.selectedCurrency}
                key={element.id}
              />
            );
          } else {
            return;
          }
        })}
      </div>
      <div className="cartBox-totalAmount">
        <p>Total</p>
        <p>
          {symbol}
          {totalAmount}
        </p>
      </div>
      <div className="cartBox-footer">
        <div className="cartBox-viewBag">VIEW BAG</div>
        <div className="cartBox-checkOut">CHECK OUT</div>
      </div>
    </div>
  );
}

// let amount;
// let priceSymbol;
// props.data.map((product) => {
//   if (product.id === element.id) {
//     {
//       /* console.log(element, "element from cartBox"); */
//     }
//     product.prices.map((price) => {
//       {
//         /* console.log(price, "price from cartBox");

//                   console.log(
//                     props.selectedCurrency,
//                     "props.selectedCurrency from cartBox"
//                   ); */
//       }

//       if (price.currency.label === props.selectedCurrency) {
//         {
//           /* console.log(
//                       price.currency.label,
//                       "selectedCurrency from cartBox"
//                     ); */
//         }
//         amount = price.amount;
//         priceSymbol = price.currency.symbol;
//       }
//     });
//   }
// });
