exports.welcomeMessage = (req, res) => {
  const localLogin = 'http://localhost:3000/login';
  const renderLogin = 'https://cse341proj2.onrender.com/login';

  if (req.hostname === 'localhost' && req.protocol === 'http') {
    res.json({ message: `Welcome, to see documentation visit ${localLogin}` });
  } else if (req.hostname === 'cse341proj2.onrender.com' && req.protocol === 'https') {
    res.json({ message: `Welcome, to see documentation visit ${renderLogin}` });
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
};
