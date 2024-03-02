// req.isAuthenticated is provided from the auth router
exports.checkAuthStatus = (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
};

// exports.getProfile = (req, res, next) => {
//   res.send( {
//     userProfile: JSON.stringify(req.oidc.user, null, 2),
//     title: 'Profile page'
//   });
// };
