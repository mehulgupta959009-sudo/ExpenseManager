// Middleware to check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn || !req.session.userId) {
    return res.status(401).json({
      error: "Unauthorized - Please login first",
      success: false,
    });
  }
  next();
};
