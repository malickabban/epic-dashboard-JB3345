"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './globals.css'
const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSignIn = () => {
    if (username === 'TestDoctor' && password === 'TestPassword') {
      // In a real application, you would set up authentication and navigate to the next screen.
      // For simplicity, let's navigate to a hypothetical dashboard page.
      router.push('/dashboard');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <div className="input-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="signin-button" onClick={handleSignIn}>
        Sign In
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};


export default Home
