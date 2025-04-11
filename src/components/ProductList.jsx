import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import SideNavbar from "./SideNavbar";
import { PAGE_SIZE } from "../utils/constant";

const ProductList = () => {
  const [searchText, setSearchText] = useState("");

  // tracking the current page for pagination
  const [currentPage, setCurrentPage] = useState(0);

  // fetching the API
  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=194");
    const data = await response.json();
    return data.products;
  };

  const { isError, isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
  }

  //filtering for searching

  const searchFilterProducts = data.filter((product) => {
    return product.title.toLowerCase().includes(searchText.toLowerCase());
  });

  // pagination logic
  const totalProducts = data.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (n) => {
    setCurrentPage(n);
  };
  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // end of pagination logic

  return (
    <div>
      <div className="searchbar flex justify-center">
        <input
          className="bg-zinc-300 rounded-lg mt-5 w-1/2 h-[40px] "
          type="text"
          value={searchText}
          placeholder="Search products... "
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="Product-card-caller flex  mt-20">
        <div className="w-1/4">
          <SideNavbar />
        </div>

        <div className="w-3/4 flex flex-wrap">
          {searchFilterProducts.length > 0 &&
            // slice for pagination and fixed number of product in UI
            searchFilterProducts.slice(start, end).map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard
                  title={product.title}
                  price={product.price}
                  category={product.category}
                  image={product.thumbnail}
                />
              </Link>
            ))}

          <div className="pagination flex justify-center mb-2 ml-2 sticky">
            <button
              disabled={currentPage === 0}
              onClick={() => handlePrev()}
              className="  h-[40px] mr-2 rounded-lg p-2 mt-5 font-semibold hover:scale-90 cursor-pointer bg-gray-200"
            >
              {" "}
              ⬅️
            </button>
            {[...Array(noOfPages).keys()].map((n) => (
              <button
                onClick={() => handlePageChange(n)}
                key={n}
                className={` mr-2 h-[40px] rounded-lg p-2 mt-5 font-semibold hover:scale-90 cursor-pointer ${
                  currentPage === n ? "bg-blue-300" : " bg-gray-200 "
                }`}
              >
                {n}
              </button>
            ))}
            <button
              disabled={currentPage === noOfPages - 1}
              onClick={() => handleNext()}
              className="  h-[40px] mr-2 rounded-lg p-2 mt-5 font-semibold hover:scale-90 cursor-pointer bg-gray-200"
            >
              ➡️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
