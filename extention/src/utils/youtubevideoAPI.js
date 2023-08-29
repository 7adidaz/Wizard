import axios from "axios";

const getVideoInfo = (videoId) => {
  const apiKey = import.meta.env.VITE_SOME_KEY;

  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

  return axios
    .get(apiUrl)
    .then((response) => {
      const videoData = response.data.items[0];
      if (videoData) {
        return {
          title: videoData.snippet.title,
          description: videoData.snippet.description,
          thumbnail: videoData.snippet.thumbnails.default.url,
        };
      }
    })
    .catch((error) => {
      console.error("Error fetching video info:", error);
    });
};

export default getVideoInfo;
