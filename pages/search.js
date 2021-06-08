import { useContext, useState } from "react";
import Header from "../components/Layout/Header";
import ProductContainer from "../components/ProductContainer";
import NotificationContext from "../context/NotificationContext";
import axios from "axios";
export default function SearchPage() {
  const { setNotification } = useContext(NotificationContext);
  const [searhInput, setSearchInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const searchHandler = (title) => {
    setSearchInput(title);
    if (title.length > 3) {
      searchProduct(title);
    } else {
      setShowResult(false);
    }
  };
  const searchProduct = (title) => {
    axios
      .get(`/api/search?title=${title}`)
      .then((res) => {
        if (res.data.length) {
          setSearchResult(res.data);
          setShowResult(true);
        } else {
          setShowResult(false);
        }
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <>
      <Header />

      <div className="container mx-auto">
        <form
          onSubmit={(evt) => evt.preventDefault()}
          className="flex justify-center mt-8"
        >
          <input
            onChange={(evt) => searchHandler(evt.target.value)}
            value={searhInput}
            className="form-control"
          />
          <button className="btn ml-4">Search</button>
        </form>
        {showResult && <ProductContainer products={searchResult} />}
      </div>
    </>
  );
}
