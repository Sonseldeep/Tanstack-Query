import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import SideNavbar from "./SideNavbar";
import { PAGE_SIZE } from "../utils/constant";
import ShimmerUI from "./ShimmerUI";

const ProductList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=194");
    const data = await response.json();
    return data.products;
  };

  const { isError, isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <ShimmerUI />;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">Something went wrong</p>
    );

  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const totalProducts = filteredProducts.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (n) => setCurrentPage(n);
  const handlePrev = () => setCurrentPage((prev) => prev - 1);
  const handleNext = () => setCurrentPage((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            className="w-full max-w-xl h-12 px-5 rounded-full bg-white shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 transition-all duration-300"
            type="text"
            value={searchText}
            placeholder="🔍 Search for products..."
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="hidden sm:block sm:1/4 ">
            <SideNavbar />
          </div>

          {/* Product Cards */}
          <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.slice(start, end).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="bg-white rounded-2xl shadow-md p-5 transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-500 capitalize">
                    {product.category}
                  </p>
                  <p className="text-blue-600 font-bold text-md mt-1">
                    $ {product.price}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-10 col-span-full">
                No products found.
              </p>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-12 space-x-2">
          <button
            disabled={currentPage === 0}
            onClick={handlePrev}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition 
              ${
                currentPage === 0
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
          >
            ⬅️ Previous
          </button>

          {[...Array(noOfPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx)}
              className={`px-4 py-2 rounded-full transition text-sm font-medium ${
                currentPage === idx
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-blue-100"
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            disabled={currentPage === noOfPages - 1}
            onClick={handleNext}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition 
              ${
                currentPage === noOfPages - 1
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
          >
            Next ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
