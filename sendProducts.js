const sendProducts = (req, res) => {
  res.json({
    product: [
      {
        id: 1,
        title: "node",
        description: "node.js is aweson",
      },
      {
        id: 2,
        title: "express",
        description: "express is a server-side framework for node.js",
      },
    ],
  });
};

module.exports = { sendProducts };
