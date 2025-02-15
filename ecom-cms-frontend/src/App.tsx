import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultLayout from './layout/DefaultLayout';
import AddBrand from './pages/Admin/Brand/AddBrand';
import ViewBrands from './pages/Admin/Brand/ViewBrands';
import AddCategory from './pages/Admin/Category/AddCategory';
import ViewCategory from './pages/Admin/Category/ViewCategory';
import Dashboard from './pages/Admin/Dashboard';
import AddProductPage from './pages/Admin/Product/AddProduct';
import ViewProducts from './pages/Admin/Product/ViewProducts';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import { BrandProvider } from './provider/BrandProvider';
import { CategoryProvider } from './provider/CategoryProvider';
import { ProductProvider } from './provider/ProductProvider';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);



  return loading ? (
    <Loader />
  ) : (
    <ProductProvider>
      <CategoryProvider>
        <BrandProvider>
          <DefaultLayout>
            <Routes>
              <Route
                index
                element={
                  <>
                    <PageTitle title="eCommerce Dashboard" />
                    <Dashboard />
                  </>
                }
              />
              <Route path='/dashboard' element={<Navigate to={'/'} />} />

              <Route
                path="/products/add"
                element={
                  <>
                    <PageTitle title="eCommerce Dashboard | Add Product" />
                    <AddProductPage />
                  </>
                }
              />
              <Route
                path="/products/all"
                element={
                  <>
                    <PageTitle title="eCommerce Dashboard | All Products" />
                    <ViewProducts />
                  </>
                }
              />
              <Route
                path="/brands/add"
                element={
                  <>
                    <PageTitle title="eCommerce Dashboard | Add Brand" />
                    <AddBrand />
                  </>
                }
              />
              <Route
                path="/brands/all"
                element={
                  <>
                    <PageTitle title="eCommerce Dashboard | All Brands" />
                    <ViewBrands />
                  </>
                }
              />
              <Route
                path="/categories/add"
                element={
                  <>
                    <PageTitle title="eCommerce Dashboard | Add Category" />
                    <AddCategory />
                  </>
                }
              />
              <Route
                path="/categories/all"
                element={
                  <>
                    <PageTitle title="eCommerce Dashboard | All Categories" />
                    <ViewCategory />
                  </>
                }
              />
              <Route
                path="/calendar"
                element={
                  <>
                    <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Calendar />
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <>
                    <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Profile />
                  </>
                }
              />
              <Route
                path="/forms/form-elements"
                element={
                  <>
                    <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <FormElements />
                  </>
                }
              />
              <Route
                path="/forms/form-layout"
                element={
                  <>
                    <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <FormLayout />
                  </>
                }
              />
              <Route
                path="/tables"
                element={
                  <>
                    <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Tables />
                  </>
                }
              />
              <Route
                path="/settings"
                element={
                  <>
                    <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Settings />
                  </>
                }
              />
              <Route
                path="/chart"
                element={
                  <>
                    <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Chart />
                  </>
                }
              />
              <Route
                path="/ui/alerts"
                element={
                  <>
                    <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Alerts />
                  </>
                }
              />
              <Route
                path="/ui/buttons"
                element={
                  <>
                    <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Buttons />
                  </>
                }
              />
              <Route
                path="/auth/signin"
                element={
                  <>
                    <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <SignIn />
                  </>
                }
              />
              <Route
                path="/auth/signup"
                element={
                  <>
                    <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <SignUp />
                  </>
                }
              />
            </Routes>
          </DefaultLayout>
        </BrandProvider>
      </CategoryProvider>
    </ProductProvider>
  );
}

export default App;
