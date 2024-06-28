import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(trimmedEmail)) {
      errors.email = 'Invalid email address';
      valid = false;
    } else if (trimmedEmail.length > 50) {
      errors.email = 'Email cannot exceed 50 characters';
      valid = false;
    }

    if (!trimmedPassword) {
      errors.password = 'Password is required';
      valid = false;
    } else if (trimmedPassword.length > 15) {
      errors.password = 'Password cannot exceed 15 characters';
      valid = false;
    }

    setEmail(trimmedEmail);
    setPassword(trimmedPassword);
    setErrors(errors);
    return valid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        history.push('/');
      }).catch((error) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Invalid email or password',
        }));
      });
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            maxLength="50"
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            maxLength="15"
          />
          <br />
          <br />
          <button>Login</button>
          {errors.password && <span className="error">{errors.password}</span>}
          <br />
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
