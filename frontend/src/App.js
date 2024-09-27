import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Nav from './components/Nav'
import PrivateComponent from './components/PrivateComponent';
import Signup from './components/Signup';

import 'flowbite';
import './index.css';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Nav />
        <Routes>
          
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<h1>HomePage After Login</h1>}/>
          </Route>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
