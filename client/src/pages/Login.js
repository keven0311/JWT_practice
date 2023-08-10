import React, { useEffect, useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [userData, setUserdata] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/login", {
        username,
        password,
      });
      localStorage.setItem("token", data.token);
      console.log("FE login axios data : ", data);
      await getUserInfo(data.payload.id, data.token);
      setUsername("");
      setPassword("");
      setSuccess(true);
    } catch (err) {
      console.error("logging failed", err);
    }
  };

  const getUserInfo = async (id, token) => {
    const { data } = await axios.get(`/api/users/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    console.log(data);
    setUserdata(data);
  };

  const logout = () => {
    setUserdata(null);
    setSuccess(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {}, []);
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <h1>Welcome {userData.username}</h1>
          <p>
            {/* react router link to home page or profile page */}
            <a href="#">Go to Home</a>
          </p>
          <button onClick={logout}>Logout</button>
        </section>
      ) : (
        <div>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <p>Need an Account?</p>
          <span>
            {/* react router link for sign up */}
            <a href="#">Sign Up</a>
          </span>
        </div>
      )}
    </>
  );
}

export default Login;
