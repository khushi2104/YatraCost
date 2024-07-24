import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import FareEstimator from './components/FareEstimator';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import TravelTips from './components/TravelTips';

function App() {
  return (
    <>
    <Navbar/>
    <FareEstimator/>
    <AboutUs/>
    <TravelTips/>
    <ContactUs/>
    <Footer/>
    </>
  );
}

export default App;
