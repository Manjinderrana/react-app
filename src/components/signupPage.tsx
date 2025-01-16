import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

const SignUpForm: React.FC = () => {
  const [form, setForm] = useState({ username: "", email: "", password: ""})

  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/v1/auth/signup', form, {
        headers: { 'Content-Type': 'application/json' },
      })
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: res?.data?.message,
        showConfirmButton: false, 
        timer: 2000, 
        toast: true, 
      });
      navigate('/');
    } catch (error: any) {
      console.error("Login error: ", error)
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
          name="username"
          id="username"
          type="username"
          placeholder="Username"
          onChange={handleInputChange}
          value={form.username}
          required
        />
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
        <button type="submit">SignUp</button>
        <p>Already have an account?<a href="/"> Login</a></p>
      </div>
    </form>
  )
}

export default SignUpForm
