const express = require('express');
const request = require('request');

const app = express.Router();
const BASE_URL_API_REQUEST = 'https://api.domainsdb.info/search';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/:query', (req, res) => {
  const query = req.params.query;
  request(
    { url: `${BASE_URL_API_REQUEST}?query=${query}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

export default app;
