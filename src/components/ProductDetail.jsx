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
    navigate(-1);
  };

  return (
    <div>
      <button
        onClick={() => goBack()}
        className="bg-green-400 rounded-lg  p-2 m-5 text-black hover:bg-green-500 hover:scale-90 hover:text-white"
      >
        {" "}
        Go Back
      </button>
      <div className="prodcut-details-wrapper  bg-blue-400 rounded-lg m-5 p-5 flex">
        <div className="image-thumbnail">
          <img
            className="object-cover rounded"
            src={data?.thumbnail}
            alt={`image of ${data.title}`}
          />
        </div>
        <div className="image-description">
          <h1>{data?.title}</h1>
          <h1 className="w-[1/2]">{data?.description}</h1>
          <h1 className="font-semibold mt-1">{data?.rating}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
