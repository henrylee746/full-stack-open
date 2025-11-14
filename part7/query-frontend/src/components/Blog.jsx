import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import blogService from "../services/blogs";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Blog = ({ blog }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );
    },
  });

  const updateCommentsMutation = useMutation({
    mutationFn: blogService.updateComments,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/blogs");
    },
  });

  const handleComment = (e) => {
    e.preventDefault();
    updateCommentsMutation.mutate({
      id: blog.id,
      comment: e.target.comment.value,
    });
  };

  return (
    <>
      {blog ? (
        <div className="blog">
          <h3>
            {blog.title} authored by {blog.author}
          </h3>
          {blog.likes} like(s) <a href="/blogs">{blog.url}</a>
          <button onClick={() => updateBlogMutation.mutate(blog.id)}>
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
          <h3>comments</h3>
          <div>
            <form onSubmit={handleComment}>
              <input type="text" name="comment" />
              <button type="submit">add comment</button>
            </form>
          </div>
          <ul>
            {blog.comments.map((comment) => (
              <li key={comment}>{comment}</li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <p>Blog was deleted. Please pick a different one</p>
        </>
      )}
    </>
  );
};

export default Blog;
