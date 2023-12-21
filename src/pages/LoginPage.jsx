import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import ImageBackgroundPageContainer from "../components/ImageBackgroundContainer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserLogin, setUserLogin] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [message, setMessage] = useState("");

  const { setUserInfo } = useContext(UserContext);

  async function handleUserLogin(event) {
    event.preventDefault();
    setWaitingResponse(true);
    try {
      const response = await axios.post("/login", { email, password });

      if (response.data.error) {
        setMessage(response.data.error);
      } else {
        setUserLogin(true);
        setUserInfo(response.data);
        setMessage("");
      }
    } catch (error) {
      // console.log(error);
      setMessage(error.response.data.error);
    }
    setWaitingResponse(false);
  }

  // When user Login redirect to index page
  if (isUserLogin) {
    return <Navigate to="/" />;
  }

  return (
    <ImageBackgroundPageContainer>
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
          {message !== "" && <div className="mt-4 text-black">{message}</div>}
          <button
            className="mt-4 w-full rounded-lg bg-primary p-2 text-white"
            type="sumit"
          >
            {waitingResponse ? "Waiting..." : "Login"}
          </button>
        </form>

        <div className="mt-16">
          Dont have an account yet?{" "}
          <Link to={"/register"} className="font-bold text-primary underline">
            Create an Account
          </Link>
        </div>
      </div>
    </ImageBackgroundPageContainer>
  );
};

export default LoginPage;
