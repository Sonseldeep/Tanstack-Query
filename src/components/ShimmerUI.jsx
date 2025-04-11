const ShimmerUI = () => {
  return (
    <div className="p-6 space-y-6 animate-pulse bg-white min-h-screen">
      <div className="h-10 w-1/2 bg-gray-200 rounded-lg mx-auto"></div>

      <div className="flex gap-6 mt-6">
        <div className="w-1/4 bg-gray-200 rounded-lg h-[calc(100vh-100px)]"></div>

        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-80 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerUI;
