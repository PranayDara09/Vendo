import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const vendorDemo = { email: 'vendor@demo.com', password: '12345687' };
  const customerDemo = { email: 'customer@demo.com', password: '12345687' };

  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState(customerDemo.email);
  const [password, setPassword] = useState(customerDemo.password);
  const [showPostModal, setShowPostModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'vendor') {
      setEmail(vendorDemo.email);
      setPassword(vendorDemo.password);
    } else {
      setEmail(customerDemo.email);
      setPassword(customerDemo.password);
    }
  }, [role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home', { state: { role } });
  };

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-logo">
          <img src="public/vendologo.png" alt="Logo" />
        </div>
        <h2 className="login-title">Sign in to Vendo</h2>
        <div className="login-role">
          <label>
            <input
              type="radio"
              value="vendor"
              checked={role === 'vendor'}
              onChange={() => setRole('vendor')}
            /> Vendor
          </label>
          <label>
            <input
              type="radio"
              value="customer"
              checked={role === 'customer'}
              onChange={() => setRole('customer')}
            /> Customer
          </label>
        </div>
        <div className="login-field">
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="login-field">
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="login-btn" type="submit">Login</button>
        <div className="login-demo">
          <span>Demo Vendor: vendor@demo.com / 12345687</span><br />
          <span>Demo Customer: customer@demo.com / 12345687</span>
        </div>
      </form>
    </div>
  );
}

export default Login;