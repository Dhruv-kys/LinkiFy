const { nanoid } = require("nanoid");
const Url = require('../models/url');

function isValidHttpUrl(value) {
    try {
        const parsedUrl = new URL(value);
        return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
        return false;
    }
}

async function handleGenerateNewShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: 'url is required' });
    if (!isValidHttpUrl(body.url)) {
        return res.status(400).json({ error: 'valid http/https url is required' });
    }

    const shortID = nanoid(8);

    await Url.create({
        shortId:shortID,
        redirectedURL:body.url,
        visitHistory:[],
    });
    return res.status(201).json({ id:shortID, shortUrl: `/${shortID}` });
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result = await Url.findOne({ shortId });

    if (!result) {
        return res.status(404).json({ error: 'short url not found' });
    }

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
};
