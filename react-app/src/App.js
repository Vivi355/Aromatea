import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ProductsIndex } from "./components/Products/ProductsIndex";
import { ProductDetail } from "./components/Products/ProductDetail";
// import CreateProduct from "./components/Products/CreateProduct";
import CreateForm from "./components/Products/CreateForm";
import EditForm from "./components/Products/EditForm";
import UserProducts from "./components/Products/UserProducts";
import LandingPage from "./components/LandingPage";
import CartPage from "./components/CartPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/products/all">
            <ProductsIndex />
          </Route>
          <ProtectedRoute path="/products/new">
            <CreateForm />
          </ProtectedRoute>
          <ProtectedRoute path="/products/current">
            <UserProducts />
          </ProtectedRoute>
          <ProtectedRoute path="/products/:productId/edit">
            <EditForm />
          </ProtectedRoute>
          <Route exact path="/products/:productId">
            <ProductDetail />
          </Route>
          <ProtectedRoute exact path="/cart">
            <CartPage />
          </ProtectedRoute>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
