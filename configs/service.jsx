const { default: axios } = require("axios");

const BASE_YOUTUBE_URL = "https://www.googleapis.com/youtube/v3";

const getVideos = async (query) => {
  const params = {
    part: "snippet",
    q: query,
    maxResults: 1,
    type: "video",
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  };

  const resp = await axios.get(BASE_YOUTUBE_URL + "/search", { params });
  return resp.data.items;
};

export default {
  getVideos,
};
