"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignIn: React.FC = () => {
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

      <style jsx>{`
        .signin-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
          text-align: center;
          color: #333;
        }

        .input-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          color: #333;
        }

        input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }

        .signin-button {
          background-color: #4caf50;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        .signin-button:hover {
          background-color: #45a049;
        }

        .error-message {
          color: red;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};


export default SignIn
