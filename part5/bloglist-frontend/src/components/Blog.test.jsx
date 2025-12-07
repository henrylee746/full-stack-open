import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders title & author, but not url/likes by default", () => {
  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 1,
  };

  render(<Blog blog={blog} />);

  const elementQueriedByTitle = screen.getByText("title", { exact: false });
  expect(elementQueriedByTitle).toBeDefined();

  const elementQueriedByAuthor = screen.getByText("author", { exact: false });
  expect(elementQueriedByAuthor).toBeDefined();

  const elementQueriedByURL = screen.queryByText("url");
  expect(elementQueriedByURL).toBeNull();

  const elementQueriedByLikes = screen.queryByText("likes");
  expect(elementQueriedByLikes).toBeNull();
});

test("renders url & likes when expanded", async () => {
  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 1,
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} handleToggle={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("expand");

  await user.click(button);

  const elementQueriedByURL = screen.getByText("url", { exact: false });
  expect(elementQueriedByURL).toBeDefined();

  const elementQueriedByLikes = screen.getByText("likes 1", { exact: false });
  expect(elementQueriedByLikes).toBeDefined();
});

test("expects event handler to register 2 clicks", async () => {
  const blog = {
    title: "title",
    author: "author",
    url: "url",
    likes: 1,
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} handleLikes={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("expand");

  await user.click(button);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
