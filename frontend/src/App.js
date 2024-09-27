import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Nav from './components/Nav';
import PrivateComponent from './components/PrivateComponent';
import Signup from './components/Signup';
import FlowCarousel from './components/FlowCarousel';
import CreateEvent from './components/CreateEvent';
import MyEvents from './components/MyEvents';

import 'flowbite';
import './index.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            {/* HomePage After Login with FlowCarousel */}
            <Route
              path="/"
              element={
                <div>
                  <h1>HomePage After Login</h1>
                  <div className="carousel-container absolute right-0 top-1/2 transform -translate-y-1/2 h-1/2 w-1/2 overflow-hidden"> {/* Limit the carousel height */}
                    <FlowCarousel />
                  </div>
                </div>
              }
            />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/my-events/:id" element={<MyEvents />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
