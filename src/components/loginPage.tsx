import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const LoginForm: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/login', form, {
        headers: { 'Content-Type': 'application/json' },
      })
      
      localStorage.setItem("accessToken", response?.data?.data?.accessToken);
      localStorage.setItem("refreshToken", response?.data?.data?.refreshToken);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: response?.data?.message,
        showConfirmButton: false, 
        timer: 2000, 
        toast: true, 
      })
      
      navigate('/profile', { state: {data: response?.data?.data?.loggedInUser}})
      
    } catch (error: any) {
      console.error("Login error: ", error?.response?.data?.message)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: error?.response?.data?.message,
        showConfirmButton: false, 
        timer: 2000, 
        toast: true, 
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          onChange={handleInputChange}
          value={form.email}
          required
        />
        <input
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          onChange={handleInputChange}
          value={form.password}
          required
        />
        <button type="submit">Login</button>
      </div>
      <p>Dont have an account? <a href="/signup"> Register</a></p>
    </form>
  )
}

export default LoginForm
