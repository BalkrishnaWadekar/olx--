import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './screens/Home';
import OlxAdmin from './screens/admin/OlxAdmin';
import AddProducts from './screens/AddProducts';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import LoginOnly from './screens/LoginOnly';
import AdminLogin from './screens/admin/AdminLogin';
import AdminHome from './screens/admin/AdminHome';
import AllUsers from './screens/admin/AllUsers';
import ProductDetail from './screens/ProductDetail';
import PageNotFound from './screens/PageNotFound';
import OlxNav from './components/OlxNav';


// document.body.style.backgroundColor = "Indigo"
export default function App() {
  return <>
    <BrowserRouter>
      <OlxNav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<LoginOnly element={<OlxAdmin />} />} />
        <Route path='/admin/home' element={<LoginOnly element={<AdminHome />} />} />
        <Route path='/admin/users' element={<LoginOnly element={<AllUsers />} />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/addproducts' element={<AddProducts />} />
        <Route path='/product/detail' element={<ProductDetail />} />
        <Route path='*' element={<PageNotFound />} />
        <Route />
        <Route />
      </Routes>
    </BrowserRouter>
  </>
}
