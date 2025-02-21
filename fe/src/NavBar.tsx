import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom"; // Import from React Router
import "./Navbar.css";
import { FaSignInAlt, FaGlobe } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Left Side - Logo */}
        <div className="nav-logo">
            Mariya Zolovska
        </div>

        {/* Center - Navigation Links */}
        <ul className="nav-links">
          <li>
            <ScrollLink to="about" smooth={true} duration={500}>
              About
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="education-experience" smooth={true} duration={500}>
              Education & Experience
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="projects" smooth={true} duration={500}>
              Projects
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="contact" smooth={true} duration={500}>
              Contact
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to="comments" smooth={true} duration={500}>
              Comments
            </ScrollLink>
          </li>
        </ul>

        {/* Right Side - Login & Translation */}
        <div className="nav-icons">
          {/* ✅ Fix: Use `Link` instead of `useNavigate()` */}
          <Link to="/login" className="nav-btn">
            <FaSignInAlt size={20} />
          </Link>

          {/* Translation Icon */}
          <button className="nav-btn">
            <FaGlobe size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
