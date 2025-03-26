const express = require('express');
const path = require('path');
const app = express();

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle client-side routing
app.get('*', (req, res) => {
  console.log('Serving index.html for path:', req.path);
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Frontend server is running on port ${port}`);
  console.log(`Static files directory: ${path.join(__dirname, 'build')}`);
}); 