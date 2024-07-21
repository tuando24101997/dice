import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/index";
import DiceGame from "./Dice";
import Register from "./components/register";
import Blockchain from "./components/blockchain";
import Transaction from "./components/transaction";
import History from "./components/history";

function App() {
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<DiceGame />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blockchain" element={<Blockchain />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
