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
import Mentors from "./pages/Mentors.js"
import ProjectDetails from "./pages/ProjectDetails.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

function App() {
  const routes = [
    { path: "/", element: <Landing /> },
    { path: "/home", element: <Home /> },
    { path: "/profile", element: <Profile /> },
    { path: "/feedback", element: <Feedback /> },
    { path: "/reviews", element: <Reviews /> },
    { path: "/login", element: <Login /> },
    { path: "/projects", element: <Projects /> },
    { path: "/project-register", element: <ProjectForm /> },
    { path: "/mentors", element: <Mentors /> },
    { path: "/project/:projectId", element: <ProjectDetails /> },
  ];
  return (
    <div className="bg-mint-green">
      <BrowserRouter>
      <Navbar/>
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
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
