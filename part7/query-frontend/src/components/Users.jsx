import { useQuery } from "@tanstack/react-query";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import userService from "../services/users";
import User from "./User";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

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
          <h2 className="italic">Users:</h2>
          <List
            sx={{
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            {users.map((user) => (
              <ListItem
                key={user.id}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ListItemButton component={Link} to={`/users/${user.id}`}>
                  <ListItemText
                    primary={
                      user.username +
                      " with " +
                      user.blogs.length +
                      " blogs created "
                    }
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        ""
      )}
      <Routes>
        <Route path=":id" element={<User user={user} />} />
      </Routes>
    </>
  );
};

export default Users;
