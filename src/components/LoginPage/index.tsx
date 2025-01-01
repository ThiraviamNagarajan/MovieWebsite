import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const LoginInPage: React.FC = () => {

    const navigate=useNavigate()

  const [logindata, setLogindata] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const [storedData, setStoredData] = useState<any[]>([]);

  useEffect(() => {
    const storedFormData = localStorage.getItem('users');
    if (storedFormData) {
      setStoredData([JSON.parse(storedFormData)]);
    }
  }, []);

  const validateEmail = (email: string) => {
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogindata((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let validationErrors = {
      email: '',
      password: '',
    };

    if (!logindata.email || !validateEmail(logindata.email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }

    if (!logindata.password) {
      validationErrors.password = 'Password is required.';
    }

    if (validationErrors.email || validationErrors.password) {
      setErrors(validationErrors);
      return;
    }
console.log(storedData,"storedData");
console.log(logindata,"logindata");


    const matchedUser = storedData.find(
      (user) =>
        user.email === logindata.email && user.password === logindata.password
    );

    console.log(matchedUser,"matchedUser");
    

    if (matchedUser) {
      console.log('Login successful');
      alert('Login Successful');
        navigate('/LandingPage')
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email or password.',
        password: '',
      }));
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: 'var(--tertiary-color)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #d3d3d3',
          borderRadius: '10px',
          backgroundColor: 'var(--secondary-color)',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          gap: '25px',
          padding: '50px',
        }}
      >
        <div style={{ color: '#ffffff', fontSize: '20px' }}>Login</div>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={logindata.email}
            onChange={handleChange}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '14px',
              backgroundColor: 'white',
              outline: 'none',
            }}
          />
          {errors.email && (
            <div
              style={{
                color: 'red',
                fontSize: '10px',
                fontWeight: '500',
                marginTop: '5px',
              }}
            >
              {errors.email}
            </div>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={logindata.password}
            onChange={handleChange}
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '14px',
              backgroundColor: 'white',
              outline: 'none',
            }}
          />
          {errors.password && (
            <div
              style={{
                color: 'red',
                fontSize: '10px',
                fontWeight: '500',
                marginTop: '5px',
              }}
            >
              {errors.password}
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}>
        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            padding: '8px 15px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: 'var(--tertiary-color)',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Login
        </button>
<div>or</div>
<div  style={{
              color: 'white',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
            }}>Don't have an account ?</div>
<button
          type="submit"
          onClick={()=>{navigate('/sign-in-page')}}
          style={{
            padding: '8px 15px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: 'var(--tertiary-color)',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Sign in</button>
          
        </div>
      </div>
    </div>
  );
};

export default LoginInPage;
