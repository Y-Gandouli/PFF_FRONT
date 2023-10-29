import React, { useState } from "react";
import './bar.css';

function Menubar (){
    
    const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <nav className="nav">
      <a href="../index.js" className="nav__brand">
        PFF App
      </a>
      <ul className={active}>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Clients Management
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Files Upload
          </a>
        </li>
        
    {/*   <li className="nav__item">
          <a href="#" className="nav__link">
            Portfolio
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Skills
          </a>
        </li> 
    */}
        <pre>                                                             </pre>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Contact
          </a>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Menubar;