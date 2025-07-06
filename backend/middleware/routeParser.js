import express from 'express';

const router = express.Router();

// Custom route handler that prevents URL parsing
router.get('*', (req, res, next) => {
  try {
    // Block any URL patterns
    if (req.url.includes('http://') || req.url.includes('https://') || 
        req.url.includes('://') || req.url.includes('git.new') || 
        req.url.includes('pathToRegexpError')) {
      console.log('Blocked URL:', req.url);
      return res.status(404).json({ message: 'Invalid route pattern' });
    }
    
    // Block any URL-like patterns
    if (req.url.match(/^(http|https):\/\/[\w.-]+(?:\/[\w.-]*)*\/\?$/)) {
      console.log('Blocked URL-like pattern:', req.url);
      return res.status(404).json({ message: 'Invalid route pattern' });
    }
    
    // Block any paths that look like URLs
    if (req.url.match(/^(?:\/)?[a-z]+:\/\/[^\/]+/i)) {
      console.log('Blocked URL-like path:', req.url);
      return res.status(404).json({ message: 'Invalid route pattern' });
    }
    
    // Log the URL for debugging
    console.log('Valid URL:', req.url);
    
    // If it's a valid route pattern, continue
    next();
  } catch (error) {
    console.error('Route parsing error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Handle POST requests as well
router.post('*', (req, res, next) => {
  try {
    // Check if the request body contains URL patterns
    if (req.body && (typeof req.body === 'string' || req.body instanceof String)) {
      if (req.body.includes('http://') || req.body.includes('https://') || 
          req.body.includes('://') || req.body.includes('git.new') ||
          req.body.includes('pathToRegexpError')) {
        console.log('Blocked URL in body:', req.body);
        return res.status(404).json({ message: 'Invalid route pattern' });
      }
    }
    
    // Log the request body for debugging
    if (req.body) {
      console.log('Request body:', req.body);
    }
    
    next();
  } catch (error) {
    console.error('Route parsing error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
