import { Video } from "@asu/unity-react-core";
import "@asu/unity-bootstrap-theme";

// Supports both YouTube embeds and direct video files.
// type: "youtube" | "video"
// url: YouTube URL or direct video file URL
const VideoSection = ({
  type = "youtube",
  url = "",
  title = "",
  caption = undefined,
}) => (
  <div className="container py-5">
    <Video type={type} url={url} title={title} caption={caption} />
  </div>
);

export default VideoSection;
