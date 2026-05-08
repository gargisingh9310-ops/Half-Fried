import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // ✅ token extract (safe way)
    const token = req.headers.token;

    // ❌ no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Please login again",
      });
    }

    // ✅ verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ attach userId safely
    req.body.userId = decoded.id;

    next();

  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

export default authMiddleware;