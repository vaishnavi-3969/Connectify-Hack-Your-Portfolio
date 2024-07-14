import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";
import Reviews from "./pages/Reviews";
import Login from "./components/LoginInWithGithub.js";
import Projects from "./pages/Projects.js";
import ProjectForm from "./pages/ProjectForm.js";
import Mentors from "./pages/Mentors.js";
import ProjectDetails from "./pages/ProjectDetails.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import { useAuth } from "./contexts/authcontext/index.js";
import Events from "./pages/Events.js";
import News from "./pages/News.js";
import CoverLetterGenerator from "./components/CoverLetterGenerator.js";
import ResumeAnalyzer from "./pages/ResumeAnalyzer.js";

function App() {
  const { currentUser } = useAuth();

  const routes = [
    { path: "/", element: currentUser ? <Home /> : <Landing /> },
    { path: "/profile", element: currentUser ? <Profile /> : null },
    { path: "/feedback", element: <Feedback /> },
    { path: "/reviews", element: <Reviews /> },
    { path: "/login", element: <Login /> },
    { path: "/projects", element: <Projects /> },
    { path: "/project-register", element: <ProjectForm /> },
    { path: "/mentors", element: <Mentors /> },
    { path: "/project/:projectId", element: <ProjectDetails /> },
    { path: "/events", element: <Events /> },
    { path: "/tech-updated", element: <News /> },
    { path: "*", element: currentUser ? <Home /> : <Landing /> },
    {
      path: "/cover-letter",
      element: currentUser ? <CoverLetterGenerator /> : null,
    },
    { path: '/resume-analyzer', element: <ResumeAnalyzer /> }
  ];
  return (
    <div className="bg-mint-green min-h-screen flex flex-col">
      <BrowserRouter>
        {currentUser && <Navbar />}
        <div className="flex-grow">
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
                exact
              />
            ))}
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
