const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const createUser = (req, res) => {
  const user = req.body.data;
  console.log(user);

  users.push({
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  });

  console.log("after: ", users);

  res.json({ message: "user_created" });
};

module.exports = { createUser };

