export default function getYouTubeVideoId(url) {
  const regex =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?.*?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11}).*$/;
  const match = url.match(regex);
  return match ? match[1] : url;
}
