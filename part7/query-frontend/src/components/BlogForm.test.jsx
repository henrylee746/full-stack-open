import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("registers blogform click", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm handleBlogSubmit={createBlog} />);

  const title = screen.getByPlaceholderText("title");
  const author = screen.getByPlaceholderText("author");
  const url = screen.getByPlaceholderText("url");

  await user.type(title, "title");
  await user.type(author, "author");
  await user.type(url, "url");

  const button = screen.getByText("create");
  await user.click(button);

  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "title",
    author: "author",
    url: "url",
  });
});
