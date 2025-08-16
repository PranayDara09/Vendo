import { FiHome, FiSearch, FiUser } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import './home.css';

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || 'customer';

  return (
    <div className="feed-bg">
      <div className="feed-container">
        <div className="feed-header">
          <span className="feed-logo-title"><FiSearch /> Search</span>
        </div>
        <h2 className="feed-title">Find Products & Vendors</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Search products, vendors..."
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            fontSize: '1rem',
            marginBottom: '18px'
          }}
        />
        <div style={{ textAlign: 'center', color: '#888', marginTop: '24px' }}>
          <FiSearch size={48} />
          <div>No results yet.</div>
        </div>
        {/* Bottom Navbar */}
        <div className="bottom-navbar">
          <button
            className="navbar-btn"
            aria-label="Home"
            onClick={() => navigate('/home', { state: { role } })}
          >
            <FiHome />
            <div className="navbar-label">Home</div>
          </button>
          <button
            className="navbar-btn navbar-btn-active"
            aria-label="Search"
            onClick={() => navigate('/search', { state: { role } })}
          >
            <FiSearch />
            <div className="navbar-label">Search</div>
          </button>
          <button
            className="navbar-btn"
            aria-label="Profile"
            onClick={() => navigate('/profile', { state: { role } })}
          >
            <FiUser />
            <div className="navbar-label">Profile</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;