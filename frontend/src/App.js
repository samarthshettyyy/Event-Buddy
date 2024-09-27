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
<<<<<<< HEAD
import TaskList from './components/TaskList';
=======
import BudgetTracking from './components/BudgetTracking';
>>>>>>> c0f1d8ea48d2202192b57e5283226d478834ef95

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
    <div class="Pflow">
 
  <div class="Flow">
    <FlowCarousel />
  </div>

 
  <div class="Flow">
    <h1 class="Text">Event Planning Assistant</h1>
    <Chatbot />
  </div>
</div>
  }
/>

            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/my-events/:id" element={<MyEvents />} />
<<<<<<< HEAD
            <Route path="/task-assignment" element={<TaskList />} />
            
=======
            <Route path="/budget-tracking/:id" element={<BudgetTracking />} />
>>>>>>> c0f1d8ea48d2202192b57e5283226d478834ef95
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
