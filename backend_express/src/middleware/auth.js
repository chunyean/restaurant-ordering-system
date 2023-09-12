const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  // const test =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNFSSAxMTUiLCJ1c2VybmFtZSI6ImRlc21vbmQiLCJjdXN0SUQiOjk5OTk5LCJpYXQiOjE2OTQ1MDA3MzEsImV4cCI6MTY5NDU4NzEzMSwianRpIjoiOWI0MjcyODgtNTgwYy00NjFhLWJjOGQtMDBiMWM3MWJmZmE1In0.K78mZ1DJGbLe9JqtzGo3JCOWcuNT1AKzA_HGzxKzMkw";
  // const token = test;

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
