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
import UploadMedia from './components/UploadMedia';
import MediaHub from './components/MediaHub';
import 'flowbite';
import './index.css';
import BudgetTracking from './components/BudgetTracking';
import About from './components/About';
import Review from './components/Review';
import { Footer } from 'flowbite-react';
import EditEvent from './components/EditEvent';
import TaskList from './components/TaskList';
import bgimage from './assets/bgimage.jpeg';
import TaskCalendar from './components/TaskCalender';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        
        <Routes>
          <Route element={<PrivateComponent />}>
            {/* HomePage After Login */}
            <Route
              path="/"
              element={
                <div
                  className="Pflow"
                  style={{
                    backgroundImage: `url(${bgimage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    
                    position: 'relative', // Added position relative for absolute elements
                  }}
                >
                  <div className="Flow">
                    <h1 className="reviews">Reviews</h1>
                    <Review/>
                  </div>
                  <div className="Flow" style={{ paddingTop: '900px' }}> {/* Adjust padding to create space */}
                    <FlowCarousel />
                  </div>

                  <div className="Flow">
                    <h1 className="Text">Event Planning Assistant</h1>
                    <Chatbot />
                  </div>

                  <div className="Flow">
                    <About />
                  </div>

                  <div className="foot">
                    <Footer />
                  </div>
                </div>
              }
            />

            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/my-events/:id" element={<MyEvents />} />
            <Route path="/budget-tracking/:id" element={<BudgetTracking />} />
            <Route path="/update/:id" element={<EditEvent />} />
            <Route path="/tasks/:id" element={<TaskList />} />
            <Route path="/upload-media/:eventId" element={<UploadMedia />} />
            <Route path="/media-hub" element={<MediaHub />} />
            <Route path="/task-calendar/:id" element={<TaskCalendar />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
