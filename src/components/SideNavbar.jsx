import { useQuery } from "@tanstack/react-query";

const SideNavbar = ({ onSelectCategory }) => {
  const fetchCategories = async () => {
    const res = await fetch("https://dummyjson.com/products/categories");
    return res.json();
  };

  const { error, isLoading, data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return (
      <div className="p-4 text-sm text-gray-500 animate-pulse">
        Loading categories...
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="p-4 text-sm text-red-500">Failed to load categories.</div>
    );
  }

  return (
    <aside className="bg-white rounded-lg shadow-sm p-4 ">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Categories</h2>
      <ul className="flex flex-col gap-2">
        {data.map((category, index) => (
          <li
            key={index}
            onClick={() => onSelectCategory(category)}
            className="text-gray-700 capitalize px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors"
          >
            {category.name.replace("-", " ")}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideNavbar;
