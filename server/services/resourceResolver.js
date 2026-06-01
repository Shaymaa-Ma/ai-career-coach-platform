//used in roadmapRoutes to fetch youtube videos related to the roadmap topic
const searchYouTube = require("./youtubeService");
/*
Roadmap Resource Resolver Service

This utility processes and resolves learning
resources for roadmap steps by fetching
real educational content dynamically.

Main Features:
- Integrates with the YouTube search service
- Detects YouTube-based learning resources
- Fetches real related video recommendations
- Returns structured educational resource data
- Supports roadmap step resource enhancement
- Provides fallback handling for unsupported
  or missing resources
- Keeps resource format consistent across
  the application

Used In:
- Roadmap routes/controllers
- AI-generated learning roadmap steps
- Dynamic educational resource recommendations

The service helps transform AI-generated
resource suggestions into real searchable
learning content for users.

*/

// Resource resolver function
async function resolveResource(resource) {
  if (!resource) return null;

  if (resource.platform === "youtube" && resource.searchQuery) {
    const results = await searchYouTube(resource.searchQuery);

    return {
      title: resource.title,
      type: resource.type,
      platform: resource.platform,
      searchQuery: resource.searchQuery,
      results, // 4 real  options
    };
  }

  return {
    ...resource,
    results: [],
  };
}

module.exports = resolveResource;