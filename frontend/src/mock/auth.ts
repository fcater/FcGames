import Mock from "mockjs";

const USER = {
  id: 0,
  username: "admin",
  accountBalance: 0,
  isAdmin: true,
  token: "mockToken",
};

Mock.mock("http://localhost:8080/login", "post", USER);
Mock.mock("http://localhost:8080/register", "post", USER);

export default Mock;
