const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[]; // Keep this type for TypeScript
}) => {
  // Fallback to an empty array if data is not an array
  const validData = Array.isArray(data) ? data : [];

  return (
    <table className="mt-4 w-full">
      <thead>
        <tr className="text-left text-gray-500 text-sm ml-0">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{validData.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
