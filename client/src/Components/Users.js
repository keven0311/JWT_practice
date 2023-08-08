import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setusers] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const res = await axios.get("/users", {
          signal: controller.signal,
        });
        console.log(res.data);
        isMounted && setusers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <article>
      <h2>User List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <h1>No users to display</h1>
      )}
    </article>
  );
}

export default Users;
