import { useContext, useState } from "react";
import loginBackgroundImage from "../assets/login-background.jpg";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserLogin, setUserLogin] = useState(false);

  const { setUserInfo } = useContext(UserContext);

  async function handleUserLogin(event) {
    event.preventDefault();
    try {
      const response = await axios.post("/login", { email, password });
      setUserLogin(true);
      setUserInfo(response.data);
    } catch (err) {
      alert("Login failed!");
    }
  }

  // When user Login redirect to index page
  if (isUserLogin) {
    return <Navigate to="/" />;
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
          Login
        </h1>
        <form onSubmit={handleUserLogin}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="your@email.com"
          ></input>
          <input
            type="password"
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
