const ItemColumn = ({ columnName, color }) => {
  return (
    <th
      className={
        "px-6  py-3 text-xs uppercase text-left " +
        (color === "light"
          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
      }
    >
      {columnName}
    </th>
  );
};

export default ItemColumn;
