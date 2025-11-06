import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import styles from './login.module.css'
import { login } from '../../features/slices/authslice'
import { useDispatch } from "react-redux"
import { Link } from 'react-router';
import { useState } from 'react';

export default function Login() {  
     const dispatch = useDispatch();
     const [loginMethod, setLoginMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginMethodChange = (method) => {
    setLoginMethod(method);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
     let user={
        email,
      password
     }
dispatch(login(user))
     
     setEmail('')
     setPassword('')
  };

  return (
    <>
    <Header />
    <div className={styles.loginContainer}>
      <div className={styles.logo}>
        <img src={require("../../assests/medistack-logo.png")} alt="MediStack Logo" />
      </div>
      <h2 className={styles.welcome}>Welcome Back</h2>
      <p className={styles.subtext}>Sign in to access your healthcare dashboard</p>
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.authButton} ${styles.active}`}
          onClick={() => {}}
          disabled
        >
          Sign In
        </button>
      <Link to="/signup" className={styles.SignupButton}>  <button onClick={() => {}}>
          Sign Up
        </button></Link>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
     
        <div className={styles.inputGroup}>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={styles.input}
            disabled={loginMethod === 'phone'}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className={styles.input}
          />
          <span
            className={styles.showPassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            👁️
          </span>
          </div>
        </div>
        <a href="#" className={styles.forgotPassword}>
          Forgot password?
        </a>
        <button type="submit" className={styles.signInButton}>
          Sign In
        </button>
        <div className={styles.orDivider}>OR</div>
      </form>
     <Link to="/"><button className={styles.guestButton}>Continue as Guest</button> </Link>
    </div>
    <Footer />
    </>
  );
  }