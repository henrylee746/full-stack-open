import { useState, useContext, useRef } from "react";
import NotificationContext from "../contexts/NotificationContext";
import { useMutation } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useQueryClient } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const BlogForm = () => {
  const queryClient = useQueryClient();
  const timeoutId = useRef(null);
  const { notificationDispatch } = useContext(NotificationContext);

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      //Triggers new GET req every mutation
      //The alternative is to manually update the query state
      /*
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(blog));
      */
    },
  });

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const [title, author, url] = [
      e.target.title.value,
      e.target.author.value,
      e.target.url.value,
    ];
    newBlogMutation.mutate({
      title,
      author,
      url,
      likes: 0,
    });
    if (timeoutId.current) clearTimeout(timeoutId.current);
    notificationDispatch({
      type: "SET",
      payload: `a new blog ${title} by ${author} added`,
    });
    timeoutId.current = setTimeout(() => {
      notificationDispatch({
        type: "HIDE",
      });
    }, 3000);
  };

  return (
    <div className="m-4">
      <form onSubmit={handleBlogSubmit} className="flex flex-col gap-2">
        <div>
          <TextField name="username" type="text" placeholder="username" />
        </div>
        <div>
          <TextField name="author" type="text" placeholder="Jane Doe.." />
        </div>
        <div>
          <TextField name="url" type="text" placeholder="/url/something" />
        </div>
        <Button sx={{ mt: 2, color: "secondary", display: "block" }}>
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
