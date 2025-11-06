import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import styles from './signup.module.css'
import { signup } from "../../features/slices/authslice"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"


export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const disptach=useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    let userDetails={
            name,email,password
        }
     
     disptach(signup(userDetails))
      setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
  };

  return (
    <>
      <Header />
      <div className={styles.signupContainer}>
        <div className={styles.logo}>
          <img src={require("../../assests/medistack-logo.png")} alt="MediStack Logo" />
        </div>
        <h2 className={styles.welcome}>Create Account</h2>
        <p className={styles.subtext}>Join thousands of patients finding better healthcare</p>
        <div className={styles.buttonGroup}>
          <Link to="/login" className={styles.SigninButton}>
            <button>Sign In</button>
          </Link>
          <button
            className={`${styles.authButton} ${styles.active}`}
            onClick={() => {}}
            disabled
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={styles.input}
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
          <div className={styles.inputGroup}>
            <label>Confirm Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className={styles.input}
              />
              <span
                className={styles.showPassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                👁️
              </span>
            </div>
          </div>
          <button type="submit" className={styles.signUpButton}>
            Sign Up
          </button>
        </form>
        <div className={styles.orDivider}>By signing up, you agree to our Terms of Service and Privacy Policy

</div>
        <Link to="/"><button className={styles.guestButton}>Continue as Guest</button></Link>
      </div>
      <Footer />
    </>
  );
}