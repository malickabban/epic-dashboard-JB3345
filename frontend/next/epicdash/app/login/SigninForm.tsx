"use client"
import { useFormState } from 'react-dom';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SigninForm.module.css';

const Signin = () => {
  const [state, formAction] = useFormState(authenticate, undefined);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  function authenticate(state: undefined): Promise<undefined> | undefined {
    throw new Error('Function not implemented.');
  }

  const handleSignIn = () => {
    if (username === 'TestDoctor' && password === 'TestPassword') {
      // In a real application, you would set up authentication and navigate to the next screen.
      // For simplicity, let's navigate to a hypothetical dashboard page.
      router.push('/dashboard');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <form action={formAction} className={styles.form}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        name="username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button type="button" onClick={handleSignIn}>
        Sign In
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default Signin;