import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Demos from './pages/Demos';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demos" element={<Demos />} />
          <Route path="/case-study/:id" element={<CaseStudyDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
