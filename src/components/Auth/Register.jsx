/* eslint-disable no-undef */
import { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!name || !email || !phone || !password || !role) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      toast.error("Phone number must be 10 digits.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      // Use the environment variable
      const baseURL = import.meta.env.VITE_BASE_URL;

      const { data } = await axios.post(
        `${baseURL}/api/v1/user/register`,
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      // Clear form inputs after successful registration
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <section className="authPage">
      <div className="container">
        <div className="header">
          <img src="/JobZeelogo.png" alt="JobZee Logo" />
          <h3>Create a new account</h3>
        </div>
        <form onSubmit={handleRegister}>
          <div className="inputTag">
            <label htmlFor="role">Register As</label>
            <div>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>
          <div className="inputTag">
            <label htmlFor="name">Name</label>
            <div>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <FaPencilAlt />
            </div>
          </div>
          <div className="inputTag">
            <label htmlFor="email">Email Address</label>
            <div>
              <input
                id="email"
                type="email"
                placeholder="xyz@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <MdOutlineMailOutline />
            </div>
          </div>
          <div className="inputTag">
            <label htmlFor="phone">Phone Number</label>
            <div>
              <input
                id="phone"
                type="tel"
                placeholder="1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <FaPhoneFlip />
            </div>
          </div>
          <div className="inputTag">
            <label htmlFor="password">Password</label>
            <div>
              <input
                id="password"
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <RiLock2Fill />
            </div>
          </div>
          <button type="submit">Register</button>
          <Link to="/login">Login Now</Link>
        </form>
      </div>
      <div className="banner">
        <img src="/register.png" alt="Register Banner" />
      </div>
    </section>
  );
};

export default Register;
