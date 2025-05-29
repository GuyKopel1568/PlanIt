import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import { UserProvider } from './context/UserContext';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Main from './pages/Main';

function App() {
  return (
    <DarkModeProvider>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/main" element={<Main />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </DarkModeProvider>
  );
}

export default App;
