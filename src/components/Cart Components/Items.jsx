import "../../CSS/Items.css";
import { useEffect } from "react";

export function Items(props) {
  useEffect(() => {
    console.log("the quantity of a product was changed", props.quantity);
  }, [props.quantity]);

  // console.log(props);
  return (
    <div className="items-card">
      <div className="title-price-container">
        <p>{props.name}</p>
        <p className="price">
          {/* {props.priceSymbol}
          {props.priceAmount} */}
          {props.prices.map((price) => {
            if (price.currency.label === props.selectedCurrency) {
              return `${price.currency.symbol}${price.amount}`;
            }
          })}
        </p>
      </div>
      <div className="increase-decrease-button">
        <div className="button-wrapper">
          <button>+</button>
          <p>1</p>
          <button>-</button>
        </div>
      </div>
      <div className="item-picture">
        <img src={props.image} alt={"item picture"} />
      </div>
    </div>
  );
}

// id: props.id,
//       name: props.name,
//       priceAmount: props.priceAmount,
//       priceSymbol: props.priceSymbol,
//       image: props.image,
//
