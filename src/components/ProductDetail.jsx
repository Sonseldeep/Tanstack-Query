import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  };

  const { isError, isLoading, data } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
    enabled: !!id, // Only run the query if id is available
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <p>Loading....</p>;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-5">
      <button
        onClick={() => goBack()}
        className="bg-green-500 rounded-lg px-4 py-2 m-5 text-white font-semibold shadow-md hover:bg-green-600 hover:scale-95 transition-transform"
      >
        Go to Products
      </button>
      <div className="product-details-wrapper bg-white shadow-lg rounded-lg m-5 p-5 flex flex-col md:flex-row items-center md:items-start">
        <div className="image-thumbnail w-full md:w-1/2 flex justify-center">
          <img
            className="object-cover rounded-lg max-w-full h-auto"
            src={data?.thumbnail}
            alt={`Image of ${data?.title}`}
          />
        </div>
        <div className="image-description w-full md:w-1/2 mt-5 md:mt-0 md:ml-5">
          <h1 className="text-2xl font-bold text-gray-800">{data?.title}</h1>
          <p className="text-gray-600 mt-3">{data?.description}</p>
          <div className="mt-5">
            <span className="text-lg font-semibold text-yellow-500">
              Rating: {data?.rating} ⭐
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
