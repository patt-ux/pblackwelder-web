import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Skills from '../components/Skills';
// import Portfolio from '../components/Portfolio';
// import Blog from '../components/Blog';
import Contact from '../components/Contact';

function Home() {
    return (
      <React.Fragment> 
        <Hero />
        <About />
        <Services />
        <Skills />
        {/* <Portfolio />
        <Blog /> */}
        <Contact />
      </React.Fragment>
    );
};

export default Home;