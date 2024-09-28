import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/Nav";
import PrivateComponent from "./components/PrivateComponent";
import Signup from "./components/Signup";
import FlowCarousel from "./components/FlowCarousel";
import CreateEvent from "./components/CreateEvent";
import MyEvents from "./components/MyEvents";
import Chatbot from "./components/Chatbot"; // Import the chatbot
import UploadMedia from "./components/UploadMedia";
import MediaHub from "./components/MediaHub";
import "flowbite";
import "./index.css";
import BudgetTracking from "./components/BudgetTracking";
import About from "./components/About";

import bgimage from "./assets/bgimage.jpeg";
import Footer from "./components/Footer";
import EditEvent from "./components/EditEvent";
import TaskList from "./components/TaskList";
import { Card } from "flowbite-react";
import Imag1 from "./assets/imag1.jpeg"; // Import Image component for the Card



 // Import Image component for the Card

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
                    position: "relative",
                    minHeight: "100vh",
                    overflow: "hidden",
                  }}
                >
                  {/* Blurred Background Image */}
                  <div
                    style={{
                      backgroundImage: `url(${bgimage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "blur(8px)",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: "-1",
                    }}
                  ></div>

                  {/* Carousel Section - On top of blurred background */}
                  <div className="Flow" style={{ padding: "20px 0" }}>
                    <FlowCarousel />
                  </div>

                  {/* Cards Section */}
                  <div className="Flow" style={{ padding: "40px", marginTop: "70px" }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "20px", // Uniform gap between cards
                        justifyItems: "center", // Center cards within their grid cells
                      }}
                    >
                      {/* First Card */}
                      {/* First Card */}
<Card className="card-animation max-w-sm rounded-lg shadow-lg bg-white">
  <img
    className="rounded-t-lg"
    width={500}
    height={500}
    src={Imag1}
    alt="image 1"
  />
  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-4">
    Noteworthy technology acquisitions 2021
  </h5>
  <p className="font-normal text-gray-700 dark:text-gray-400 p-4">
    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
  </p>
</Card>

{/* Second Card */}
<Card className="card-animation max-w-sm rounded-lg shadow-lg bg-white">
  <img
    className="rounded-t-lg"
    width={500}
    height={500}
    src={Imag1}
    alt="image 2"
  />
  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-4">
    Emerging trends in AI
  </h5>
  <p className="font-normal text-gray-700 dark:text-gray-400 p-4">
    Discover the latest advancements in artificial intelligence and how they are transforming industries.
  </p>
</Card>

{/* Third Card */}
<Card className="card-animation max-w-sm rounded-lg shadow-lg bg-white">
  <img
    className="rounded-t-lg"
    width={500}
    height={500}
    src={Imag1}
    alt="image 3"
  />
  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-4">
    Cybersecurity challenges 2021
  </h5>
  <p className="font-normal text-gray-700 dark:text-gray-400 p-4">
    Learn about the biggest cybersecurity threats and how organizations are addressing them in 2021.
  </p>
</Card>

                    </div>
                  </div>

                  {/* Event Planning Section */}
                  <div className="Flow" style={{  marginTop: "40px", marginLeft: "-70%" }}>
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
            {/* Other routes remain unchanged */}
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/my-events/:id" element={<MyEvents />} />
            <Route path="/budget-tracking/:id" element={<BudgetTracking />} />
            <Route path="/update/:id" element={<EditEvent />} />
            <Route path="/tasks/:id" element={<TaskList />} />
            <Route path="/media-hub" element={<MediaHub />}/>
            <Route path="/upload-media/:id" element={<UploadMedia />}/>
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

