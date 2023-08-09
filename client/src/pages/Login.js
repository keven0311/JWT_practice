import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    setUsername("");
    setPassword("");
    setSuccess(true);
  };
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <p>
            {/* react router link to home page or profile page */}
            <a href="#">Go to Home</a>
          </p>
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
