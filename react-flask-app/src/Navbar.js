import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <nav className="navbar">
        <h1>The State Map</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/list" style={{ 
            color: 'white', 
            backgroundColor: '#f1356d',
            borderRadius: '8px' 
          }}>Map</Link>
        </div>
      </nav>
    );
  }
   
  export default Navbar;