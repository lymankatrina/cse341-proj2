exports.welcomeMessage = (req, res) => {
  const localApiDoc = 'http://localhost:3000/swagger/api-docs';
  const renderApiDoc = 'https://cse341proj2.onrender.com/swagger/api-docs/';

  if (req.hostname === 'localhost' && req.protocol === 'http') {
    res.json({ message: `Welcome, to see documentation visit ${localApiDoc}` });
  } else if (req.hostname === 'cse341proj2.onrender.com' && req.protocol === 'https') {
    res.json({ message: `Welcome, to see documentation visit ${renderApiDoc}` });
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
};
