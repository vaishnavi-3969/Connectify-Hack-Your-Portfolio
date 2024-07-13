import "./App.css";
import LogIn from "./components/LoginInWithGithub";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
    </Routes>
  );
}

export default App;
