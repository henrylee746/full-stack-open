const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "login" }).click();
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createNote = async (page, content) => {
  await page.getByRole("button", { name: "new note" }).click();
  await page.getByRole("textbox").fill(content);
  await page.getByRole("button", { name: "save" }).click();
  await page.getByText(content).waitFor();
};

const loginWithBlogApp = async (page, username, password) => {
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, content) => {
  await page.getByLabel("title:").fill(content.title);
  await page.getByLabel("author:").fill(content.author);
  await page.getByLabel("url:").fill(content.url);
  await page.getByRole("button", { name: "create" }).click();
  await page
    .getByText(`a new blog ${content.title} by ${content.author} added`)
    .waitFor();
};
export { loginWith, createNote, loginWithBlogApp, createBlog };
