import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import blogService from "../services/blogs";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const Blog = ({ blog }) => {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  return (
    <>
      <div className="blog">
        <h3>
          {blog.title} authored by {blog.author}
        </h3>
        <a href="/blogs">{blog.url}</a>
        <button onClick={() => updateBlogMutation.mutate(blog.id, blog)}>
          like
        </button>{" "}
        <p> added by {blog.author}</p>
        {blog.user.username === user.username ? (
          <button onClick={() => deleteBlogMutation.mutate(blog.id)}>
            remove
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Blog;
