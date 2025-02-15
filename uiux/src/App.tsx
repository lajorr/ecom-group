import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import { Home } from "./pages/Home";
import { CartProvider } from "./providers/CartContext";
import { CategoryProvider } from "./providers/CategoryContext";
import { ProductProvider } from "./providers/ProductContext";
import { BrandProvider } from "./providers/BrandContext";
import SearchResults from "./pages/SearchResults";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="category/:categoryName" element={<CategoryPage />} />
        <Route path="search" element={<SearchResults />} />
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
