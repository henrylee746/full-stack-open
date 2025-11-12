import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import Blog from "./Blog";
import blogService from "../services/blogs";
import { useQuery } from "@tanstack/react-query";

const Blogs = () => {
  const { user } = useContext(UserContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });
  const blogs = data;

  if (isLoading) return "loading";
  if (error) return "an err has occured";

  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </>
  );
};

export default Blogs;
