# Short URL

A small URL shortener built with Node.js, Express, and MongoDB. It creates short IDs for long URLs, redirects users to the original URL, and stores click history for basic analytics.

## Features

- Create short URLs with `nanoid`
- Redirect from `/:shortId` to the original URL
- Track visit timestamps
- View click analytics for each short URL
- Configure server port and MongoDB connection with environment variables

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Nano ID

## Project Structure

```text
short-url/
├── controllers/
├── models/
├── routes/
├── connect.js
├── index.js
├── package.json
└── README.md
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start MongoDB

Make sure MongoDB is running locally, or set a custom connection string with `MONGODB_URL`.

### 3. Run the server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

By default the app runs on `http://localhost:8001`.

## Environment Variables

You can run the app with these optional variables:

```bash
PORT=8001
MONGODB_URL=mongodb://localhost:27017/short-url
```

Example:

```bash
PORT=5000 MONGODB_URL=mongodb://localhost:27017/short-url npm run dev
```

## API Endpoints

### Create a short URL

`POST /url`

Request body:

```json
{
  "url": "https://example.com"
}
```

Response:

```json
{
  "id": "abc123xy",
  "shortUrl": "/abc123xy"
}
```

### Redirect to original URL

`GET /:shortId`

Example:

```bash
curl -L http://localhost:8001/abc123xy
```

### Get analytics

`GET /url/analytics/:shortId`

Response:

```json
{
  "totalClicks": 2,
  "analytics": [
    {
      "timestamp": 1712837260000
    },
    {
      "timestamp": 1712837290000
    }
  ]
}
```

## Improvements Included

- Fixed the analytics controller bug where the query result was never stored
- Added URL validation for `http` and `https` links
- Added `404` handling for missing short IDs
- Replaced hard-coded config with `PORT` and `MONGODB_URL`
- Split `start` and `dev` scripts for cleaner usage

## Future Ideas

- Add custom aliases for short URLs
- Prevent duplicate records for the same long URL
- Build a simple frontend form
- Add tests for routes and controllers
- Store richer analytics like IP, browser, or referrer
