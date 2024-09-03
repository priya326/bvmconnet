const Pagination = () => {
  return (
    <div className="gap-4 flex items-center justify-between text-gray-700 mt-5">
      {/* Button */}
      <button
        disabled
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      {/* Button */}
      <div className="flex items-center gap-2 text-sm">
        <button className="px-2 rounded-sm bg-light">1</button>
        <button className="px-2 rounded-sm">2</button>
        <button className="px-2 rounded-sm">3</button>
        ...
        <button className="px-2 rounded-sm">10</button>
      </div>
      {/* Button */}
      <button className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  );
};

export default Pagination;
