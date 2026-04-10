const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const urlRoute = require('./routes/url');
const Url = require('./models/url');

const app = express();
const PORT = process.env.PORT || 8001;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/short-url';
const publicPath = path.join(__dirname, "public");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));

app.get('/:shortId',async (req,res)=>{
     const shortID = req.params.shortId;
     const entry = await Url.findOneAndUpdate({
        shortId:shortID
     },{$push:{
        visitHistory: {
            timestamp: Date.now(),
        },
     }});

     if (!entry) {
        return res.status(404).json({ error: 'short url not found' });
     }

     return res.redirect(entry.redirectedURL);
});

app.use("/url",urlRoute);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));

connectToMongoDB(MONGODB_URL)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection failed', error.message);
    });
