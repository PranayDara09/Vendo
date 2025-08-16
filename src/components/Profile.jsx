import { FiHome, FiSearch, FiUser } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || 'customer';

  return (
    <div className="feed-bg">
      <div className="feed-container">
        <div className="feed-header">
          <span className="feed-logo-title"><FiUser /> Profile</span>
        </div>
        <h2 className="feed-title">Your Profile</h2>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '32px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#e3f0ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            boxShadow: '0 2px 8px rgba(0,123,255,0.08)'
          }}>
            <FiUser size={48} color="#007bff" />
          </div>
          <div style={{ fontWeight: 600, fontSize: '1.2rem', marginBottom: '8px' }}>
            Demo User
          </div>
          <div style={{ color: '#888', fontSize: '1rem' }}>
            vendor@demo.com / customer@demo.com
          </div>
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
            className="navbar-btn"
            aria-label="Search"
            onClick={() => navigate('/search', { state: { role } })}
          >
            <FiSearch />
            <div className="navbar-label">Search</div>
          </button>
          <button
            className="navbar-btn navbar-btn-active"
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

export default Profile;