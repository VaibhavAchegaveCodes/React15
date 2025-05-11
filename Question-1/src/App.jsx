import React from 'react';
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom'
import './App.css'
import ProductListing from './components/ProductListing';
import OrderManagement from './components/OrderManagement';
import StatisticsDashboard from './components/StatisticsDashboard';
import AddProductForm from './components/AddProductForm';
function App() {
  return (
    <Router>
      <div className='dashboard'>
        <Sidebar/>
        <div className='main-content'>
          <Routes>
            <Route path='/products' element={<ProductListing/>}/>
            <Route path='/orders' element={<OrderManagement/>}/>
            <Route path='/add-product' element={<AddProductForm/>}/>
            <Route path='/stats' element={<StatisticsDashboard/>}/>
            <Route path='/' element={<ProductListing/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

function Sidebar(){
  return (
    <div className='sidebar'>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to='/products'>Products</Link></li>
          <li><Link to='/orders'>Orders</Link></li>
          <li><Link to='/stats'>Statistics</Link></li>
          <li><Link to ='/add-product'>Add Product</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default App
