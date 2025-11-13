import { useQuery } from "@tanstack/react-query";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import userService from "../services/users";
import User from "./User";

const Users = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
  });

  const users = data;

  const match = useMatch("/users/:id");
  const user =
    match && users ? users.find((user) => user.id === match.params.id) : null;

  if (isLoading) return "loading";
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {!user ? (
        <>
          <h2>Users</h2>
          {users.map((user) => (
            <p key={user.id}>
              <Link to={`/users/${user.id}`}>{user.username}</Link> with{" "}
              {user.blogs.length} blogs created
            </p>
          ))}
        </>
      ) : (
        ""
      )}
      <Routes>
        <Route path="/users/:id" element={<User user={user} />} />
      </Routes>
    </>
  );
};

export default Users;
