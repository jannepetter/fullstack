const {
  test,
  expect,
  beforeEach,
  describe,
  beforeAll,
  afterEach,
} = require("@playwright/test");
const { loginWith, logoutUser, createBlog } = require("./helper");

const testUser = {
  name: "Test User",
  username: "testuser",
  password: "secret",
};

const anotherUser = {
  name: "Another User",
  username: "anotheruser",
  password: "anothersecret",
};

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: testUser,
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("Log in to application")).toBeVisible();
    await expect(page.getByTestId("login-username")).toBeVisible();
    await expect(page.getByTestId("login-password")).toBeVisible();
    await expect(page.getByTestId("login-submit-btn")).toBeVisible();
  });
  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("login-username").fill("testuser");
      await page.getByTestId("login-password").fill("secret");
      await page.getByTestId("login-submit-btn").click();

      await expect(page.getByText("Blogs")).toBeVisible();
      await expect(page.getByText("Test User logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("login-username").fill("testuser");
      await page.getByTestId("login-password").fill("wrongsecret");
      await page.getByTestId("login-submit-btn").click();
      await expect(
        page.getByText("invalid username or password")
      ).toBeVisible();
    });
  });
});

describe("When logged in", () => {
  beforeAll(async ({ request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: testUser,
    });
    await request.post("http://localhost:3003/api/users", {
      data: anotherUser,
    });
  });
  beforeEach(async ({ page, request }) => {
    await page.goto("http://localhost:5173");
    await loginWith(page, testUser.username, testUser.password);
  });
  afterEach(async ({ page, request }) => {
    await logoutUser(page);
  });

  test("a new blog can be created", async ({ page }) => {
    await page.getByText("new blog").click();
    await page.getByTestId("blog-title").fill("automatically created blog");
    await page.getByTestId("blog-author").fill("test author");
    await page.getByTestId("blog-url").fill("someurl");
    await page.getByRole("button", { name: "create" }).click();
    await expect(
      page.getByText("automatically created blog test author")
    ).toBeVisible();
  });
  test("The blog can be liked", async ({ page }) => {
    await page.getByRole("button", { name: "view" }).click();
    await expect(page.getByText("someurl")).toBeVisible();
    await expect(page.getByText("likes 0")).toBeVisible();
    await page.getByRole("button", { name: "like" }).click();
    await expect(page.getByText("likes 1")).toBeVisible();
  });
  test("The remove blog button is not visible for another user", async ({
    page,
  }) => {
    await logoutUser(page);
    await loginWith(page, anotherUser.username, anotherUser.password);
    await expect(
      page.getByText("automatically created blog test author")
    ).toBeVisible();
    await page.getByRole("button", { name: "view" }).click();
    await expect(page.getByRole("button", { name: "remove" })).toBeHidden();
  });
  test("The blog can be removed by the creator", async ({ page }) => {
    await expect(
      page.getByText("automatically created blog test author")
    ).toBeVisible();
    await page.getByRole("button", { name: "view" }).click();
    page.on("dialog", (dialog) => dialog.accept());
    await page.getByRole("button", { name: "remove" }).click();
    await expect(
      page.getByText("automatically created blog test author")
    ).toBeHidden();
  });
});

describe("Blogs get ordered in the popularity order", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: testUser,
    });
    await page.goto("http://localhost:5173");
    await loginWith(page, testUser.username, testUser.password);

    await page.getByText("new blog").click();
    await createBlog(page, "blog1", "author1", "url1");
    await createBlog(page, "blog2", "author2", "url2");
    await createBlog(page, "blog3", "author3", "url3");
  });

  test("Blog 3 most liked, blog 2 least", async ({ page }) => {
    const blog1 = await page.getByText("blog1");
    await blog1.getByRole("button", { name: "view" }).click();
    await blog1.getByRole("button", { name: "like" }).click();

    const blog3 = await page.getByText("blog3");
    await blog3.getByRole("button", { name: "view" }).click();
    await blog3.getByRole("button", { name: "like" }).click();
    await blog3.getByRole("button", { name: "like" }).click();

    await page.reload();

    const blogs = await page.locator(".blog-item");

    const firstBlog = blogs.nth(0);
    await expect(firstBlog.getByText("blog3")).toBeVisible();

    const secondBlog = blogs.nth(1);
    await expect(secondBlog.getByText("blog1")).toBeVisible();

    const thirdBlog = blogs.nth(2);
    await expect(thirdBlog.getByText("blog2")).toBeVisible();
  });
});
