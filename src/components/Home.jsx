import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import './home.css';

function Home(props) {
  const location = useLocation();
  const role = location.state?.role || 'customer';
  const vendorName = 'Demo Vendor';

  const [posts, setPosts] = useState([
    {
      id: 1,
      vendor: 'Vendor A',
      title: '15 August Sale',
      description: 'Upto 60% off on electronics and more!',
      votes: 5,
      image: '/VendorA.png',
      category: 'Electronics'
    },
    {
      id: 2,
      vendor: 'Vendor B',
      title: 'Latest Clothing Collection',
      description: 'Trendy outfits for the season! at 30% off',
      votes: 2,
      image: '/VendorB.png',
      category: 'Fashion'
    },
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [newCategory, setNewCategory] = useState('General');
  const [showPostModal, setShowPostModal] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  const handlePost = (e) => {
    e.preventDefault();
    if (newTitle.trim() && newDescription.trim()) {
      setPosts([
        {
          id: Date.now(),
          vendor: vendorName,
          title: newTitle,
          description: newDescription,
          votes: 0,
          image: newImage,
          category: newCategory
        },
        ...posts,
      ]);
      setNewTitle('');
      setNewDescription('');
      setNewImage(null);
      setNewCategory('General');
      setShowPostModal(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setNewImage(null);
    }
  };

  const handleVote = (id, delta) => {
    setPosts(posts =>
      posts.map(post =>
        post.id === id
          ? { ...post, votes: post.votes + delta }
          : post
      )
    );
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="feed-bg">
      <div className="feed-container">
        <div className="feed-header">
          <div className="feed-logo-enhanced">
            <img src="public/vendologo.png" alt="Logo" />
            <span className="feed-logo-title">Vendo</span>
          </div>
          <div className="feed-profile">
            <button
              className="profile-btn"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Logout"
            >
              <FiLogOut size={22} />
            </button>
            {profileOpen && (
              <div className="profile-dropdown">
                <button className="logout-btn" onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </div>
        </div>
        <h2 className="feed-title">Feed</h2>
        <div className="feed-list">
          {posts.map(post => (
            <div key={post.id} className="feed-post">
              <div className="feed-post-header">
                <strong>{post.vendor}</strong>
              </div>
              <h3 className="feed-post-title">{post.title}</h3>
              <p className="feed-post-content">{post.description}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '8px' }}
                />
              )}
              <div className="feed-post-category">{post.category}</div>
              <div className="feed-vote-bar">
                <button
                  className="feed-vote-btn up"
                  onClick={() => handleVote(post.id, 1)}
                  aria-label="Upvote"
                  type="button"
                >▲</button>
                <span className="feed-vote-count">{post.votes}</span>
                <button
                  className="feed-vote-btn down"
                  onClick={() => handleVote(post.id, -1)}
                  aria-label="Downvote"
                  type="button"
                >▼</button>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom Navbar */}
        <div className="bottom-navbar">
          <button
            className="navbar-btn navbar-btn-active"
            aria-label="Home"
            onClick={() => navigate('/home', { state: { role } })}
          >
            <FiHome />
            <div className="navbar-label">Home</div>
          </button>
          <button
            className="navbar-btn"
            aria-label="Search"
            onClick={() => navigate('/search')}
          >
            <FiSearch />
            <div className="navbar-label">Search</div>
          </button>
          <button
            className="navbar-btn"
            aria-label="Profile"
            onClick={() => navigate('/profile')}
          >
            <FiUser />
            <div className="navbar-label">Profile</div>
          </button>
        </div>
      </div>
      {role === 'vendor' && (
        <button
          className="create-post-btn"
          onClick={() => setShowPostModal(true)}
          aria-label="Create Post"
        >
          +
        </button>
      )}
      {showPostModal && (
        <div className="post-modal-bg" onClick={() => setShowPostModal(false)}>
          <div className="post-modal" onClick={e => e.stopPropagation()}>
            <form className="feed-post-form" onSubmit={handlePost}>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Title"
                required
                style={{ marginBottom: '8px' }}
              />
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                style={{ marginBottom: '8px', padding: '8px', borderRadius: '8px', border: '1px solid #e0e0e0' }}
                required
              >
                <option value="General">General</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Groceries">Groceries</option>
                <option value="Services">Services</option>
              </select>
              <textarea
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                placeholder="Description"
                rows={3}
                required
                style={{ marginBottom: '8px' }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: '8px' }}
              />
              {newImage && (
                <img
                  src={newImage}
                  alt="Preview"
                  style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '8px' }}
                />
              )}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowPostModal(false)}>Cancel</button>
                <button type="submit">Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;