import { useEffect, useState } from "react";
import "../CSS/Product.css";
import cartButton from "../image/cart-button.png";
import { useNavigate } from "react-router-dom";

export function Product(props) {
  const [displayButton, setDisplayButton] = useState("none");
  const [showMessage, setShowMessage] = useState("none");
  const [opacity, setOpacity] = useState(1);

  const inStock = props.inStock;
  let navigate = useNavigate();

  //functions to toggle add to cart button
  function showButton() {
    if (inStock === true) {
      setDisplayButton("block");
    }
  }
  function hideButton() {
    setDisplayButton("none");
  }

  //toggle opacity and display message of "OUT OF STOCK" if the product is not available
  useEffect(() => {
    if (inStock === false) {
      setOpacity(0.5);
      setShowMessage("block");
    }
  }, []);

  function changeNumberOfProducts() {
    // props.setProductNumber(props.productNumber + 1);
    props.setProductData({
      id: props.id,
      name: props.name,
      prices: props.prices,
      image: props.image,
    });
    console.log("product was pressed");
    // console.log(props, "product component props");
  }

  return (
    <div
      className="card"
      onMouseEnter={() => showButton()}
      onMouseLeave={() => hideButton()}
      style={{ opacity: opacity }}
      // onClick={() => navigate(`/productDetails/${props.id}`)}
    >
      <div
        className="card-image"
        onClick={() => navigate(`/productDetails/${props.id}`)}
      >
        <p style={{ display: showMessage }} className="card-image-message">
          OUT OF STOCK
        </p>
        <img src={props.image}></img>
      </div>
      <button
        className="card-cartButton"
        style={{ display: displayButton }}
        onClick={() => changeNumberOfProducts()}
      >
        <img className="card-button-image" src={cartButton} />
      </button>
      <div className="card-description">
        <p>{props.name}</p>
        <p className="card-description-price">
          {props.prices.map((price) => {
            if (price.currency.label === props.selectedCurrency) {
              return `${price.currency.symbol}${price.amount}`;
            }
          })}
        </p>
      </div>
    </div>
  );
}
