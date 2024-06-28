import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { firebase } = useContext(FirebaseContext);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    let valid = true;
    let errors = {};

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername) {
      errors.username = 'Username is required';
      valid = false;
    }

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

    if (!phone) {
      errors.phone = 'Phone number is required';
      valid = false;
    } else if (!validatePhone(phone)) {
      errors.phone = 'Phone number must be exactly 10 digits';
      valid = false;
    }

    if (!trimmedPassword) {
      errors.password = 'Password is required';
      valid = false;
    } else if (trimmedPassword.length > 50) {
      errors.password = 'Password cannot exceed 50 characters';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      firebase.auth().createUserWithEmailAndPassword(email.trim(), password.trim()).then((result) => {
        result.user.updateProfile({ displayName: username.trim() }).then(() => {
          firebase.firestore().collection('users').add({
            id: result.user.uid,
            username: username.trim(),
            phone: phone
          }).then(() => {
            history.push("/login");
          });
        });
      }).catch((error) => {
        alert(error.message);
      });
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            type="text"
            id="fname"
            name="name"
          />
          {errors.username && <span className="error">{errors.username}</span>}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            type="email"
            id="fname"
            name="email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            id="lname"
            name="phone"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            type="password"
            id="lname"
            name="password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
