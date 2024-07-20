import './App.css';
import Home from './screens/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { CartProvider } from './components/ContextReducer';
import Cart from './screens/Cart';
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route  path='/login' element={<Login/>}/>
            <Route  path='/SignUP' element={<SignUp/>}/>
            <Route  path='/cart' element={<Cart/>}/>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;