const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  // const token = req.headers["authorization"].replace("Bearer ", "");

  const test =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0SUQiOjIwMDAyLCJ1c2VybmFtZSI6InBpa2FjaHUxIiwiaWF0IjoxNjk0NDEwMTExLCJleHAiOjE2OTQ0OTY1MTEsImp0aSI6IjdhOTBhYWE2LTQwMTQtNGExZC04MmY2LWU3Y2QzZGY5YmM1ZSJ9.WXlkPrqIf3w4GFeagZsECOUtC2rItbcTKTh5gXq-Tjk";
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
