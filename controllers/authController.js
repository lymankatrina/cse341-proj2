// req.isAuthenticated is provided from the auth router
exports.checkAuthStatus = (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
};
