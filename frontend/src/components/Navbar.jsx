import React , {useState} from 'react'
import './Navbar.css'
import LanguageSwitcher from './LanguageSwitcher';
const Navbar = () => {
  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(false);

  const handleOpenLanguageSwitcher = () => {
    setShowLanguageSwitcher(true);
  };

  const handleCloseLanguageSwitcher = () => {
    setShowLanguageSwitcher(false);
  };
  return (
    <>
    <header>
        <a href="#" className="logo"><i class='bx bx-car'></i>YatraCost</a>
        <i id="menu-icon" className='bx bx-menu'></i>

        {/* <!-- Navbar List --> */}
        <ul className="nav-list">
            <li><a href="#home" className="home-act">Home</a></li>
            <li><a href="#about" className="aboutus">About Us</a></li>
            <li><a href="#contact" className="contactus">Contact us</a></li>
            <li><a href="#products" className="products">Help</a></li>

            <li><button className='btnn' onClick={handleOpenLanguageSwitcher}>Lang</button>
            {showLanguageSwitcher && <LanguageSwitcher onClose={handleCloseLanguageSwitcher} />}</li>
            
        </ul>


    </header>

    
    </>
  )
}

export default Navbar