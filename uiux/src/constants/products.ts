// import Product from "../types/Product";

// const height = 200;
// const width = 300;

// export const productList: Product[] = [
//   {
//     "id": 1,
//     "name": "Apple Watch",
//     "description": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
//     "price": 452.52,
//     "category": { _id: "1", name: "Electronics" },
//     "brand": { _id: "2", name: "Apple" },
//     "stock": 162,
//     "image": `https://picsum.photos/id/101/${width}/${height}`,
//     "is_featured": true,
//     "offer_price": 392.52
//   },
//   {
//     "id": 2,
//     "name": "Nike Air Max",
//     "description": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
//     "price": 448.56,
//     "category": { _id: "3", name: "Sports & Outdoors" },
//     "brand": { _id: "4", name: "Nike" },
//     "stock": 775,
//     "image": `https://picsum.photos/id/102/${width}/${height}`,
//     "is_featured": false,
//     "offer_price": 398.56
//   },
//   {
//     "id": 3,
//     "name": "Sony TV",
//     "description": "Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
//     "price": 381.52,
//     "category": { _id: "1", name: "Electronics" },
//     "brand": { _id: "5", name: "Sony" },
//     "stock": 921,
//     "image": `https://picsum.photos/id/103/${width}/${height}`,
//     "is_featured": false,
//     "offer_price": 331.52
//   },
//   {
//     "id": 4,
//     "name": "Adidas Superstar",
//     "description": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
//     "price": 861.77,
//     "category": { _id: "3", name: "Sports & Outdoors" },
//     "brand": { _id: "6", name: "Adidas" },
//     "stock": 876,
//     "image": `https://picsum.photos/id/104/${width}/${height}`,
//     "is_featured": false,
//     "offer_price": 761.77
//   },
//   {
//     "id": 5,
//     "name": "Canon EOS",
//     "description": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
//     "price": 514.44,
//     "category": { _id: "2", name: "Cameras" },
//     "brand": { _id: "7", name: "Canon" },
//     "stock": 336,
//     "image": `https://picsum.photos/id/111/${width}/${height}`,
//     "is_featured": false,
//     "offer_price": 464.44
//   },
//   {
//     "id": 6,
//     "name": "Samsung Galaxy",
//     "description": "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
//     "price": 808.44,
//     "category": { _id: "1", name: "Electronics" },
//     "brand": { _id: "8", name: "Samsung" },
//     "stock": 764,
//     "image": `https://picsum.photos/id/106/${width}/${height}`,
//     "is_featured": false,
//     "offer_price": 708.44
//   },
//   {
//     "id": 7,
//     "name": "Sony Headphones",
//     "description": "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
//     "price": 389.42,
//     "category": { _id: "4", name: "Audio" },
//     "brand": { _id: "5", name: "Sony" },
//     "stock": 772,
//     "image": `https://picsum.photos/id/107/${width}/${height}`,
//     "is_featured": false,
//     "offer_price": 329.42
//   },
//   {
//     "id": 8,
//     "name": "Nike Air Force",
//     "description": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
//     "price": 321.42,
//     "category": { _id: "3", name: "Sports & Outdoors" },
//     "brand": { _id: "4", name: "Nike" },
//     "stock": 917,
//     "image": `https://picsum.photos/id/108/${width}/${height}`,
//     "is_featured": false,
//     "offer_price": 271.42
//   },
//   {
//     "id": 9,
//     "name": "Adidas Ultraboost",
//     "description": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
//     "price": 481.06,
//     "category": { _id: "3", name: "Sports & Outdoors" },
//     "brand": { _id: "6", name: "Adidas" },
//     "stock": 987,
//     "image": `https://picsum.photos/id/109/${width}/${height}`,
//     "is_featured": false,
//     "offer_price": 431.06
//   },
//   {
//     "id": 10,
//     "name": "Canon EOS Rebel",
//     "description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.",
//     "price": 728.72,
//     "category": { _id: "2", name: "Cameras" },
//     "brand": { _id: "7", name: "Canon" },
//     "stock": 287,
//     "image": `https://picsum.photos/id/110/${width}/${height}`,
//     "is_featured": false,
//     "offer_price": 678.72
//   }
// ];

