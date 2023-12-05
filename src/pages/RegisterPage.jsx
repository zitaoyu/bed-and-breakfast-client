import { useState } from "react";
import loginBackgroundImage from "../assets/login-background.jpg";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);

  async function handleRegisterUser(event) {
    event.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in!");
      setRegistered(true);
    } catch {
      alert("Registration failed. Please try again later.");
    }
  }

  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="shadow-around bg-white-blur m-auto flex w-1/2 min-w-[400px] max-w-[500px] flex-col rounded-lg p-10">
      {/* Background Image */}
      <img
        className="absolute left-0 top-0 -z-10 h-screen w-screen"
        src={loginBackgroundImage}
      />
      {/* Login Form */}
      <div className="m-auto my-8 max-w-[400px]">
        <h1 className="mb-8 text-center text-4xl font-bold text-black">
          Register
        </h1>
        <form onSubmit={handleRegisterUser}>
          <input
            type="text"
            placeholder="your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <button
            className="bg-primary mt-4 w-full rounded-lg p-2 text-white"
            type="sumit"
          >
            Create Account
          </button>
        </form>
        <div className="mt-16">
          Already a member?{" "}
          <Link to={"/login"} className="text-primary font-bold underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
