const productInputFields = [
  {
    id: 1,
    name: "name",
    type: "text",
    title: "Product Name",
    placeholder: "Product Name",
    isRequired: true,
  },
  {
    id: 2,
    name: "price",
    type: "number",
    title: "Price",
    placeholder: "Price",
    isRequired: true,
  },
  {
    id: 3,
    name: "offer_price",
    type: "number",
    title: "Sale Price [Optional]",
    placeholder: "Sale Price",
    isRequired: false,
  },
  {
    id: 4,
    name: "product_details",
    type: "text",
    title: "Description [Optional]",
    placeholder: "Description",
    isRequired: false,
  },
  {
    id: 5,
    name: "stock",
    type: "number",
    title: "Stock",
    placeholder: "Stock",
    isRequired: true,
  },

  {
    id: 6,
    name: "image",
    type: "text",
    title: "Product Image",
    placeholder: "https://example.com/image.jpg",
    isRequired: true,
  },
];

export { productInputFields };
