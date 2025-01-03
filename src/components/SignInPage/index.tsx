import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [users, setUsers] = useState<Array<typeof formData>>([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    try {
      const parsedUsers = savedUsers ? JSON.parse(savedUsers) : [];
      if (Array.isArray(parsedUsers)) {
        setUsers(parsedUsers);
      }
    } catch (error) {
      console.error('Failed to parse users from localStorage:', error);
      setUsers([]);
    }
  }, []);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
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

    const validationErrors = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.name.trim()) {
      validationErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required.';
    } else if (!validateEmail(formData.email)) {
      validationErrors.email = 'Please enter a valid email address.';
    } else if (users.some((user) => user.email === formData.email)) {
      validationErrors.email = 'This email is already registered.';
    }

    if (!formData.phone.trim()) {
      validationErrors.phone = 'Phone number is required.';
    } else if (!validatePhone(formData.phone)) {
      validationErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.password) {
      validationErrors.password = 'Password is required.';
    } else if (!validatePassword(formData.password)) {
      validationErrors.password =
        'Password must be at least 6 characters long with one uppercase letter and one special character.';
    }

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.values(validationErrors).some((error) => error)) {
      setErrors(validationErrors);
      return;
    }

    const newUser = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
    };

    const updatedUsers:any = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    navigate('/');
  };

  console.log(users, 'users');

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        backgroundColor: '#f2f0e9',
      }}
    >
      <div
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px solid #d3d3d3',
          borderRadius: '10px',
          backgroundColor: 'var(--secondary-color)',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          gap: '20px',
          padding: '50px 65px 50px 50px',
        }}
      >
        <div style={{ color: 'black', fontSize: '20px' }}>Sign Up</div>
        
        <div style={{ width: '100%', position: 'relative' }}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}
        </div>

        <div style={{ width: '100%', position: 'relative' }}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>

        <div style={{ width: '100%', position: 'relative' }}>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
        </div>

        <div style={{ width: '100%', position: 'relative' }}>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.password && <div style={errorStyle}>{errors.password}</div>}
        </div>

        <div style={{ width: '100%', position: 'relative' }}>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.confirmPassword && (
            <div style={errorStyle}>{errors.confirmPassword}</div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: '10px',
            marginTop:"10px"
          }}
        >
          <button type="submit" style={buttonStyle}
          onClick={handleSubmit}>
            Sign Up
          </button>
          <div style={{ color: 'black' }}> or </div>
          <div
            style={{
              color: 'black',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Already Registered?
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={buttonStyle}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '8px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '12px',
  backgroundColor: 'white',
  outline: 'none',
  width: '100%',
};

const errorStyle:any = {
  color: 'red',
  fontSize: '10px',
  fontWeight: '500',
  position: 'absolute',
  left: '0',
  marginTop: '5px',
};

const buttonStyle = {
  padding: '10px 15px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: 'var(--tertiary-color)',
  color: 'white',
  fontSize: '12px',
  fontWeight: 'bold',
  width: '100%',
};

export default SignUpPage;