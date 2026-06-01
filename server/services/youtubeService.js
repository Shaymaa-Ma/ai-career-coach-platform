
//used in roadmapRoutes to fetch youtube videos related to the roadmap topic
const axios = require("axios");
/*
YouTube Resource Search Service

This utility fetches relevant educational YouTube
videos related to roadmap topics using the
YouTube Data API.

Main Features:
- Searches YouTube dynamically based on a topic/query
- Retrieves educational and roadmap-related videos
- Returns video title, URL, channel name,
  and thumbnail
- Limits results for cleaner UI integration
- Uses secure API key from environment variables
- Handles missing API keys safely
- Includes error handling and fallback responses

Used In:
- Roadmap routes/controllers
- AI learning roadmap resource recommendations
- Skill/topic-based educational content fetching

The service helps users quickly discover useful
learning resources directly connected to their
generated roadmap steps.

*/

async function searchYouTube(query) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      console.log("Missing YOUTUBE_API_KEY");
      return [];
    }

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          maxResults: 4,
          type: "video",
          key: apiKey,
        },
      }
    );

    return response.data.items.map((item) => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails?.medium?.url,
    }));
  } catch (err) {
    console.log("YouTube API Error:", err.message);
    return [];
  }
}

module.exports = searchYouTube;