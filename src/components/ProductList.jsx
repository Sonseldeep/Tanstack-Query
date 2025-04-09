import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProductList = () => {
  const [searchText, setSearchText] = useState("");
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

  const searchFilterProducts = data.filter((product) => {
    return product.title.toLowerCase().includes(searchText.toLowerCase());
  });

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

      <div className="Product-card-caller flex flex-wrap mt-20">
        {searchFilterProducts.length > 0 &&
          searchFilterProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard
                title={product.title}
                price={product.price}
                category={product.category}
                image={product.thumbnail}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
