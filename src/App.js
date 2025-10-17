import { lazy, Suspense } from "react";
import "./App.css";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import ProductContextProvider from "./context/ProductContext";
import ContactPage from "./pages/ContactPage";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./context/AuthContext";

const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const Product = lazy(() => import("./pages/Product"));
const ShoppingCartPage = lazy(() => import("./pages/ShoppingCartPage"));
const SignIn = lazy(() => import("./pages/SignIn"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));

function App() {
  return (
    <>
      <BrowserRouter>
        <ProductContextProvider>
          <AuthContextProvider>
            <Header />
            <main className="min-h-screen w-full px-4 py-2 dark:bg-gray-950 dark:text-white scroll-smooth">
              <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/product/:productId" element={<Product />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route
                      path="/shoppingcart"
                      element={<ShoppingCartPage />}
                    />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </Suspense>
                <ToastContainer theme="dark" />
              </ErrorBoundary>
            </main>
          </AuthContextProvider>
        </ProductContextProvider>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
