import './App.css';
import HomeComponent from './Components/HomeComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>

      <>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
