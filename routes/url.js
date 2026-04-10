const express = require('express');
const { handleGetAnalytics,handleGenerateNewShortUrl } = require('../controllers/url');
const router = express.Router();

router.post("/",handleGenerateNewShortUrl);
router.get('/analytics/:shortId',handleGetAnalytics);
module.exports = router;