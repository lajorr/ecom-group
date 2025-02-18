import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import { Home } from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import { BrandProvider } from "./providers/BrandContext";
import { CartProvider } from "./providers/CartContext";
import { CategoryProvider } from "./providers/CategoryContext";
import { ProductProvider } from "./providers/ProductContext";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="cart/checkout" element={<Checkout />} />
        <Route path="cart/checkout/success" element={<CheckoutSuccess />} />
        <Route path="category/:categoryName" element={<CategoryPage />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="productdetail/:id" element={<ProductDetail />} />
        <Route
          path="category/:categoryName/productdetail/:id"
          element={<ProductDetail />}
        />
      </Route>,
    ])
  );

  return (
    <CartProvider>
      <ProductProvider>
        <CategoryProvider>
          <BrandProvider>
            <RouterProvider router={router}></RouterProvider>
          </BrandProvider>
        </CategoryProvider>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
