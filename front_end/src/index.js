import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Route, Switch,  BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'

//plugin- datepicker css
import "react-datepicker/dist/react-datepicker.css";

//page layout
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';

//import pages
import Home from './App';
import Login from './components/pages/login';
import Register from './components/pages/register';
import MbrIndex from './components/pages/mbr-index';
import MbrInfo from './components/pages/mbr-info';
import MbrOrderList from './components/pages/mbr-order-list';
import Product from './components/pages/product';
import ShoppingCart from './components/pages/shopping-cart';
import NotFoundPage from './components/pages/not-found-page';

//route setting
const context = React.createContext();
export const BrdcrbConsumer = context.Consumer;

const  routes = {
  Login: [
      { to: '/', linkName: '首頁' },
      { to: '/', linkName: '登入會員' }
  ],
  Register: [
      { to: '/', linkName: '首頁' },
      { to: '/', linkName: '加入會員' }
  ],
  ShoppingCart: [
      { to: '/', linkName: '首頁' },
      { to: '/mbr-index', linkName: '會員專區' },
      { to: '/', linkName: '購物車' }
  ],
  Product: [
      { to: '/', linkName: '首頁' },
      { to: '/', linkName: '產品專區' },
  ],
  MbrIndex: [
      { to: '/', linkName: '首頁' },
      { to: '/', linkName: '會員專區' }
  ],
  MbrOrderList: [
      { to: '/', linkName: '首頁' },
      { to: '/', linkName: '會員專區' },
      { to: '/', linkName: '訂單管理' }
  ],
  MbrInfo: [
      { to: '/', linkName: '首頁' },
      { to: '/', linkName: '會員專區' },
      { to: '/', linkName: '帳戶管理' }
  ]
};

const RouterList = (
  <React.StrictMode>
    <CookiesProvider>
    <Router>
      <context.Provider value={routes}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/mbr-index" component={MbrIndex} />
          <Route path="/mbr-info" component={MbrInfo} />
          <Route path="/mbr-order-list" component={MbrOrderList} />
          <Route path="/product" component={Product} />
          <Route path="/shopping-cart" component={ShoppingCart} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </context.Provider>
    </Router>
    </CookiesProvider>
    </React.StrictMode>
  );


ReactDOM.render(RouterList,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
