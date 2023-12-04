import { useState } from "react";
import loginBackgroundImage from "../assets/login-background.jpg";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset the form
    setEmail("");
    setPassword("");
  };

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
          Login
        </h1>
        <form>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="your@email.com"
          ></input>
          <input
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="password"
          ></input>
          <button
            className="bg-primary mt-4 w-full rounded-lg p-2 text-white"
            type="sumit"
          >
            Login
          </button>
        </form>
        <div className="mt-16">
          Dont have an account yet?{" "}
          <Link to={"/register"} className="text-primary font-bold underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
