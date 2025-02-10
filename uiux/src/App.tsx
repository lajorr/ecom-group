import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Cart from "./pages/Cart";
import { Home } from "./pages/Home";
import { CartProvider } from "./providers/CartContext";
import { CategoryProvider } from "./providers/CategoryContext";
import { ProductProvider } from "./providers/ProductContext";


function App() {

  const router = createBrowserRouter(createRoutesFromElements([
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
    </Route>
  ]))

  return (

    <CartProvider>
      <ProductProvider>
        <CategoryProvider>
          <RouterProvider router={router}></RouterProvider>
        </CategoryProvider>
      </ProductProvider>
    </CartProvider>
  );
}

export default App
