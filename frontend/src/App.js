import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Nav from './components/Nav';
import PrivateComponent from './components/PrivateComponent';
import Signup from './components/Signup';
import FlowCarousel from './components/FlowCarousel';
import CreateEvent from './components/CreateEvent';
import MyEvents from './components/MyEvents';
import Chatbot from './components/Chatbot'; // Import the chatbot

import 'flowbite';
import './index.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            {/* HomePage After Login with FlowCarousel and Chatbot */}
            <Route
  path="/"
  element={
    <div>
      <h1 className="text-center text-2xl my-4"></h1>
      {/* Flexbox container for aligning carousel and chatbot */}
      <div className="flex items-center justify-between">
        {/* Carousel container */}
        <div className="w-1/2 h-85 overflow-hidden"> 
          <FlowCarousel />
        </div>
        {/* Chatbot container */}
        <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">Event Planning Assistant</h1>
      <Chatbot />
    </div>
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
