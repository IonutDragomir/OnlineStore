import "./CSS/App.css";
import { MainPage } from "./components/MainPage";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductDetails } from "./Pages/ProductDetails";
import { CartPage } from "./Pages/CartPage";
import { Header } from "./components/Header";

const TRACKS = gql`
  query GetAllProducts {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        category
        brand
        prices {
          currency {
            symbol
            label
          }
          amount
        }
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(TRACKS);

  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [productData, setProductData] = useState("");

  useEffect(() => {
    if (loading) return "Loadiing ...";
    if (error) return `Error! ${error.message}`;
  }, [data]);

  console.log(data, "data from app.js");
  return (
    <>
      {/* <MainPage data={data} /> */}
      <Router>
        <Header
          // data={data}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
          productData={productData}
          data={
            data && true
              ? data.categories[0].products
              : "...expecting results from graphql"
          }
          prices={
            data && true
              ? data.categories[0].products[0].prices
              : "...expecting results from graphql"
          }
        />
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                data={data}
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
                setProductData={setProductData}
              />
            }
          />
          <Route
            path="/productDetails/:productId"
            element={
              <ProductDetails data={data} selectedCurrency={selectedCurrency} />
            }
          />
          <Route path="/cartPage" element={<CartPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
