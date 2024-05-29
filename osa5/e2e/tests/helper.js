const loginWith = async (page, username, password) => {
  await page.getByTestId("login-username").fill(username);
  await page.getByTestId("login-password").fill(password);
  await page.getByTestId("login-submit-btn").click();
};

const logoutUser = async (page) => {
  await page.getByTestId("logout-button").click();
};

const createBlog = async (page, title, author, url) => {
  //   const newBlogBtn = await page.getByText("new blog");
  //   const isVisible = await newBlogBtn.isVisible();
  //   if (isVisible) {
  //     await newBlogBtn.click();
  //   }
  await page.getByTestId("blog-title").fill(title);
  await page.getByTestId("blog-author").fill(author);
  await page.getByTestId("blog-url").fill(url);
  await page.getByRole("button", { name: "create" }).click();
  await page.locator(".blog-item").getByText(title).waitFor();
};

export { loginWith, logoutUser, createBlog };
