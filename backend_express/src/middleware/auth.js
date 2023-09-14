const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.custID = decoded.custID;
      req.username = decoded.username;
      req.staffID = decoded.staffID;

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
