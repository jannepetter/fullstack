const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "test blog 1",
    author: "test author",
    url: "somewhere",
    likes: 0,
  },
  {
    title: "test blog 2",
    author: "another author",
    url: "theurlhere",
    likes: 0,
  },
];

const initialUsers = [
  {
    username: "testuser",
    password: "testpass",
    name: "test",
  },
  {
    username: "someuser",
    password: "somepass",
    name: "someuser",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "temp",
    author: "temp",
    url: "temp",
    likes: 0,
  });
  await blog.save();
  await blog.deleteOne();

  return blog.id;
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({}, "-password");
  return users.map((user) => user.toJSON());
};

const initDB = async () => {
  await User.deleteMany({});
  await User.insertMany(initialUsers);
  const blogUser = await User.findOne({ username: "testuser" }).exec();
  const blogs = [];
  for (const b of initialBlogs) {
    b.user = blogUser._id;
    blogs.push(b);
  }
  await Blog.deleteMany({});
  await Blog.insertMany(blogs);
  return initialUsers;
};

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
  initDB,
};
