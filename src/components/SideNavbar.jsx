import { useQuery } from "@tanstack/react-query";

const SideNavbar = () => {
  const fetchCategories = async () => {
    const res = await fetch("https://dummyjson.com/products/categories");

    return res.json();
  };

  const { error, isLoading, data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  if (error instanceof Error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <div className=" bg-zinc-100 rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Categories</h2>
      <ul className="space-y-2">
        {data.map((category, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-blue-300 hover:scale-90 hover:font-semibold p-2 rounded-md"
          >
            {typeof category === "string"
              ? category
              : category.name || category.slug}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavbar;
