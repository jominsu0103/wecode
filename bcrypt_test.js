const bcrypt = require("bcrypt");

const password = "password";
const saltRounds = 12;

const makeHash = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds);
};

// const main = async () => {
//   const hashedPassword = await makeHash(password, saltRounds);
//   console.log(hashedPassword);
// };

const checkHash = async (password, hashedPassword) => {
  return await bcrypt.hash(password, hashedPassword);
};

const main = async () => {
  const hashedPassword = await makeHash("password", 12);
  const result = await checkHash("password", hashedPassword);
  console.log(result);
};

main();
//=> b'$2b$12$76taFAFPE9ydE0ZsuWkIZexWVjLBbTTHWc509/OLI5nM9d5r3fkRG'
