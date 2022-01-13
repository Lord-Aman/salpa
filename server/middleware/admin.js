module.exports = function (req, res, next) {
  // 401 - Unauthorized
  // 403 - Forbitten, Authorized but don't have access permissions
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");
  next();
};
