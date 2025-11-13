import { useState, useContext, useRef } from "react";
import NotificationContext from "../contexts/NotificationContext";
import { useMutation } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useQueryClient } from "@tanstack/react-query";

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
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          <label>
            title:
            <input name="title" type="text" placeholder="title" />
          </label>
        </div>
        <div>
          <label>
            author:
            <input name="author" type="text" placeholder="author" />
          </label>
        </div>
        <div>
          <label>
            url:
            <input name="url" type="text" placeholder="url" />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
