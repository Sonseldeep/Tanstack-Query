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
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }
  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">Something went wrong</p>
    );
  }

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={goBack}
        className="bg-green-500 rounded-lg px-6 py-3 mb-6 text-white font-semibold shadow-md hover:bg-green-600 hover:scale-95 transition-transform cursor-pointer"
      >
        ← Back to Products
      </button>

      {/* Product Details */}
      <div className="product-details-wrapper bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Product Image */}
        <div className="image-thumbnail w-full md:w-1/2 flex justify-center">
          <img
            className="object-cover rounded-lg max-w-full h-auto hover:scale-105 transition-transform duration-300"
            src={data?.thumbnail}
            alt={`Image of ${data?.title}`}
          />
        </div>

        {/* Product Information */}
        <div className="image-description w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{data?.title}</h1>
          <p className="text-gray-600 text-lg">{data?.description}</p>
          <h2 className="text-2xl font-bold text-blue-600">$ {data?.price}</h2>

          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">
              Stock: <span className="font-bold">{data?.stock}</span>
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                data?.availabilityStatus === "Low Stock"
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {data?.availabilityStatus || "In Stock"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {data?.tags?.map((tag, index) => (
              <span
                key={index}
                className="bg-green-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4">
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
