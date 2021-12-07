import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";

//private routes
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Profile from "./user/Profile";

//admin routes
import AdminRoute from "./auth/helper/AdminRoutes";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategory from "./admin/ManageCategory";
import AddProduct from "./admin/AddProduct";
import ManageProduct from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Order from "./admin/Orders";
import Cart from "./core/Cart";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/cart" exact component={Cart}></Route>
        <PrivateRoute path="/user" exact component={Profile}></PrivateRoute>
        <AdminRoute
          path="/admin/dashboard"
          exact
          component={AdminDashBoard}
        ></AdminRoute>
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        ></AdminRoute>
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategory}
        ></AdminRoute>
        <AdminRoute
          path="/admin/create/product"
          exact
          component={AddProduct}
        ></AdminRoute>
        <AdminRoute
          path="/admin/products"
          exact
          component={ManageProduct}
        ></AdminRoute>
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        ></AdminRoute>
        <AdminRoute
          path="/admin/category/update/:catagoryId"
          exact
          component={UpdateCategory}
        ></AdminRoute>
        <AdminRoute path="/admin/orders" exact component={Order}></AdminRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
