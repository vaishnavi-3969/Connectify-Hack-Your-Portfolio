import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Feedback from './pages/Feedback';

function App() {
  const routes = [
    { path:"/", element:<Landing/> },
    { path:"/home", element:<Home/> },
    { path:"/profile", element:<Profile/> },
    { path: "/feedback", element: <Feedback /> },
  ]
  return (
    <div>
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} exact/>
        ))}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
