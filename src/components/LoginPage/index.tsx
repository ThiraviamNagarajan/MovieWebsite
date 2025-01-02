import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const LoginInPage: React.FC = () => {
  const navigate = useNavigate();

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
      try {
        const parsedData = JSON.parse(storedFormData);
        setStoredData(Array.isArray(parsedData) ? parsedData : [parsedData]);
      } catch (error) {
        console.error('Error parsing stored data:', error);
        setStoredData([]);
      }
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

    const matchedUser = storedData.find(
      (user) =>
        user.email.toLowerCase() === logindata.email.toLowerCase() &&
        user.password === logindata.password
    );

    if (matchedUser) {
      console.log('Login successful');
      alert('Login Successful');
      setLogindata({email:'',password:''})

      navigate('/LandingPage');
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email or password.',
        password: '',
      }));
    }
  };

  return (
    <>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#f2f0e9',
        boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      }}
    >
      <div>
      <div style={{color:"black",textAlign:"center",marginBottom:'5px'}}>Welcome to MovieBuff</div>
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
        <div style={{ color: 'black', fontSize: '20px',fontWeight:'600' }}>Login</div>
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
              backgroundColor:"white",
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
        <div style={{display:"flex",flexDirection:"column",gap:"5px",width:"100%"}}>
        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            padding: '8px 15px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: 'var(--tertiary-color)',
            color: 'white',
            fontSize: '12px',
            fontWeight: '500',
            width: '100%',
          }}
        >
          Login
        </button>
        <div style={{color:"black",textAlign:"center",fontSize:"10px"}}>or</div>
        <div style={{color:"black",textAlign:"center",fontSize:"11px"}}>Don't have an account? Please signin</div>
        <button
          type="submit"
          onClick={()=>{navigate('/sign-in-page')}}
          style={{
            padding: '8px 15px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: 'var(--tertiary-color)',
            color: 'white',
            fontSize: '12px',
            fontWeight: '500',
            width: '100%',
          }}
        >
          Sign in
        </button>
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default LoginInPage;