import Blog from "./Blog";
import blogService from "../services/blogs";
import { useQuery } from "@tanstack/react-query";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

const Blogs = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });
  const blogs = data;

  const match = useMatch("/blogs/:id");
  const blog =
    match && blogs ? blogs.find((blog) => blog.id === match.params.id) : null;
  if (isLoading) return "loading";
  if (error) return "an err has occured";

  return (
    <>
      {!blog ? (
        <>
          <Togglable buttonLabel="create new blog">
            <BlogForm />
          </Togglable>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <List
              sx={{
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <ListItem
                    key={blog.id}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
                      <ListItemText
                        primary={"Title: " + blog.title + ", by " + blog.author}
                        sx={{ textAlign: "center" }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </Box>
        </>
      ) : (
        ""
      )}
      <Routes>
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
      </Routes>
    </>
  );
};

export default Blogs;
