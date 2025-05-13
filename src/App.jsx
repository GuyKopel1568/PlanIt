import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Layout>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
