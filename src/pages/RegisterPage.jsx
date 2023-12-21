import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import ImageBackgroundPageContainer from "../components/ImageBackgroundContainer";
import { UserContext } from "../contexts/UserContext";

const RegisterPage = () => {
  const { showAboutPage } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegisterUser(event) {
    event.preventDefault();
    setWaitingResponse(true);
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in!");
      setRegistered(true);
    } catch (error) {
      // console.log(error);
      setMessage(error.response.data.error);
    }
    setWaitingResponse(false);
  }

  if (!showAboutPage) {
    return <Navigate to="/about" />;
  }

  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <ImageBackgroundPageContainer>
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
          {message !== "" && <div className="mt-4 text-black">{message}</div>}
          <button
            className="mt-4 w-full rounded-lg bg-primary p-2 text-white"
            type="sumit"
          >
            {waitingResponse ? "Waiting..." : "Create Account"}
          </button>
        </form>
        <div className="mt-16">
          Already a member?{" "}
          <Link to={"/login"} className="font-bold text-primary underline">
            Login
          </Link>
        </div>
      </div>
    </ImageBackgroundPageContainer>
  );
};

export default RegisterPage;
