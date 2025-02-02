export const getColumns = (allItems) => {
  if (allItems.length === 0) {
    return [];
  }
  const item = allItems[0];

  const keyss = Object.keys(item);
  const columns = keyss.filter(
    (key) => key !== "createdAt" && key !== "updatedAt" && key !== "__v"
  );
  columns[columns.length] = "";

  return columns;
};
