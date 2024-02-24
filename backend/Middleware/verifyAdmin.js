const jwt = require("jsonwebtoken");
const adminModel = require("../Models/Admin/user");

module.exports.adminAuthMiddleware = async (req, res, next) => {
  try {
    let token;
    if (
     
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token.trim(), process.env.SECRET);
        req.admin = await adminModel.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        console.error(error);
        res.status(401).send("Not authorized, token failed");
      }
    }
    if (!token) {
      res.status(401).send("Not authorized, no token");
    }
  } catch (error) {
    console.error("Error verifying admin token:", error);
    res.status(401).json({ message: "Authentication failed." });
  }
};

module.exports.adminRoleMiddleware = (req, res, next) => {
  try {
    // Check if the authenticated admin has the "administration" role
    if (req.admin && req.admin.role === "administrator") {
      // If the admin has the "administration" role, allow them to proceed
      next();
    } else {
      // If the admin does not have the required role, send a 403 Forbidden response
      res.status(403).json({
        message: "Access denied. Admin does not have the required role.",
        status: false,
      });
    }
  } catch (error) {
    console.error("Error checking admin role:", error);
    res.status(500).json({ message: "Internal Server Error", status: false });
  }
};
