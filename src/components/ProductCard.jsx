const ProductCard = ({ title, image, price, category }) => {
  return (
    <div className="bg-zinc-200 w-[300px] h-fit m-5 rounded-lg p-5 hover:scale-90 transition duration-750 ease-in-out">
      <img
        className="object-cover mb-1"
        src={image}
        alt={`image of ${title}`}
      />
      <h1 className="mt-1 font-semibold">{title}</h1>
      <h1 className="mt-1 font-semibold">{category}</h1>
      <h1 className="font-semibold mt-1">$ {price}</h1>
    </div>
  );
};

export default ProductCard;
