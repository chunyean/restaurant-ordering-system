const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  // const token = req.headers["authorization"].replace("Bearer ", "");

  const test =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0SUQiOjIwMDAyLCJ1c2VybmFtZSI6InBpa2FjaHUxIiwiaWF0IjoxNjk0MzIzNjAyLCJleHAiOjE2OTQ0MTAwMDIsImp0aSI6ImQ4NmUyZmE4LWY5NzEtNDQzNC05Zjk3LTJhZDU5NzE5NWExNCJ9.NuxdGvBvc9L6GTXE9PWstiByASPevbQExRyBm4ZoE-M";
  const token = test;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.custID = decoded.custID;
      req.username = decoded.username;
      req.staffID = decoded.id;

      next();
    } catch (error) {
      return res
        .status(401)
        .json({ status: error, msg: "unauthorised error(1)" });
    }
  } else {
    return res.status(403).send({ status: "error", msg: "forbidden error(1)" });
  }
};

module.exports = { auth };
