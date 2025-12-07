const { test, describe, expect, beforeEach } = require("@playwright/test");
const { loginWithBlogApp, createBlog } = require("./helper");

describe("blogs app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Superuser",
        username: "test",
        password: "testpassword",
      },
    });
    await page.goto("/");
  });
  test("front page can be opened and displays form", async ({ page }) => {
    const locator = page.getByText("Log in to application");
    await expect(locator).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });
  describe("login", () => {
    test("fails with wrong creds", async ({ page }) => {
      await loginWithBlogApp(page, "test", "wrong");
      await expect(page.getByText("wrong credentials")).toBeVisible();
      await expect(page.getByText("blogs")).toBeHidden();
      await expect(page.getByText("test logged in")).toBeHidden();
    });

    test("user can log in", async ({ page }) => {
      await loginWithBlogApp(page, "test", "testpassword");
      await expect(page.getByText("blogs")).toBeVisible();
      await expect(page.getByText("test logged in")).toBeVisible();
    });

    describe("When logged in", () => {
      beforeEach(async ({ page }) => {
        await loginWithBlogApp(page, "test", "testpassword");
      });
      test("a new note can be created", async ({ page }) => {
        const content = {
          title: "a title",
          author: "an author",
          url: "a /url",
        };
        await page.getByRole("button", { name: "create new blog" }).click();
        await createBlog(page, content);
        await expect(
          page.getByText(`${content.title} ${content.author}`)
        ).toBeVisible();
        await expect(
          page.getByRole("button", { name: "expand" })
        ).toBeVisible();
      });
      describe("when a note exists", () => {
        beforeEach(async ({ page }) => {
          const content = {
            title: "a title",
            author: "an author",
            url: "a /url",
          };
          await page.getByRole("button", { name: "create new blog" }).click();
          await createBlog(page, content);
          await page.getByRole("button", { name: "expand" }).click();
        });
        test("blog can be liked", async ({ page }) => {
          await page.getByRole("button", { name: "like" }).click();
          const infoSpan = page.locator(".info");
          await expect(infoSpan).toContainText("likes 1");
        });
        test("blog can be deleted", async ({ page }) => {
          await page.getByRole("button", { name: "remove" }).click();
          await expect(page.locator(".blog")).toHaveCount(0);
        });
        test("only user who created blog can see delete", async ({
          page,
          request,
        }) => {
          await page.getByRole("button", { name: "logout" }).click();
          await request.post("/api/users", {
            data: {
              name: "Superuser2",
              username: "test1",
              password: "testpassword1",
            },
          });
          await loginWithBlogApp(page, "test1", "testpassword1");
          await page.getByRole("button", { name: "expand" }).click();
          await expect(
            page.getByRole("button", { name: "remove" })
          ).toHaveCount(0);
        });
      });
    });
  });
});
