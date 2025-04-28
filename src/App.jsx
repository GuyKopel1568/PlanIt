import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import './globalStyles.css';
import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './ui/Navbar';

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
