import React from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import SingupSeller from './components/Seller/SingupSeller'
import SignupCust from './components/Customer/SignupCust'
import CustProfile from './components/Customer/CustProfile'
import LoginCustomer from './components/Customer/LoginCustomer'
import LoginSeller from './components/Seller/LoginSeller'
import UploadProduct from './components/Seller/UploadProduct'
import FirstPage from './components/WebsitePage/FirstPage'
import ByCategory from './components/WebsitePage/ByCategory'
import ProductPage from './components/WebsitePage/ProductPage'
import CartQuantity from './components/WebsitePage/CartQuantity'
import Counter from './components/Counter'
import Cart from './components/WebsitePage/Cart'
import OrderPage from './components/WebsitePage/OrderPage'
import OrderPlaced from './components/WebsitePage/OrderPlaced'
import FullCartOrder from './components/WebsitePage/FullCartOrder'
import Header from './components/WebsitePage/Header';
import ReviewsComponent from './components/WebsitePage/JustTesting2';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import SearchPage from './components/WebsitePage/SearchPage';
import Footer from './components/WebsitePage/Footer';
import LoginGeneral from './components/WebsitePage/LoginGeneral';
import JustTesting3 from './components/WebsitePage/JustTesting3';
// import { JustTesting } from './components/WebsitePage/JustTesting';


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})


const App = () => {

  return (
    <ApolloProvider client={client}>
    <div>

      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/logingeneral' />} />
        <Route path='/signupseller' element={<SingupSeller />} />
        <Route path='/signupcustomer' element={<SignupCust />} />
        <Route path='/logincustomer' element={<LoginCustomer />} />
        <Route path='/loginseller' element={<LoginSeller />} />
        <Route path='/customerprofile' element={<CustProfile />} />
        <Route path='/uploadproduct' element={<UploadProduct />} />
        <Route path='/frontpage' element={<FirstPage />}/>
        <Route path='/bycategory' element={<ByCategory />}/>
        <Route path='/getproductbyid/:productId' element={<ProductPage />} />
        <Route path='/cartquantity' element={<CartQuantity />} />
        <Route path='/counter' element={<Counter />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orderpage/:productId' element={<OrderPage />} />
        <Route path='/orderplaced' element={<OrderPlaced />} />
        <Route path='/fullcartorder' element={<FullCartOrder />} />
        <Route path='/header' />
        <Route path='/searchpage/:productname' element={<SearchPage/>} />
        <Route path='graphqlreviews' element={<ReviewsComponent />}/>
        <Route path='/logingeneral' element={<LoginGeneral />} />
        <Route path='/justtesting3' element={<JustTesting3 />} />
      </Routes>

      <div className="h-64">
      <Footer />                
            </div>

    </div>
    </ApolloProvider>
  );
}

export default App;