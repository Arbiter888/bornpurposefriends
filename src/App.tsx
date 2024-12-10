import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Workspace from "./components/workspace/Workspace";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/workspace/:characterId" element={<Workspace />} />
      </Routes>
    </Router>
  );
}

export default App;